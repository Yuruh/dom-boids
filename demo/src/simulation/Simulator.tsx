import {IInput, ILine, IOutput, ISimulation} from "./ProtoInterfaces"
import Parameters from "./Parameters";
import Boid, {drawLine} from "./Boid";
import {Root, Type} from "protobufjs";
import {boundingClientToObstacles} from "./domParsing";
import React from "react";
import Loader from "../Loader";
import {Modal} from "../Modal";
const protobuf = require("protobufjs");

interface IProps {
    params: Parameters,
}

interface IState {
    loading: boolean
}

export default class Simulator extends React.Component<IProps, IState>{
    // typescript doesn't realize that they are assigned in the constructor
    // @ts-ignore
    private canvas: HTMLCanvasElement;
    // @ts-ignore
    private ctx: CanvasRenderingContext2D;

    private root: Root = new Root();
    private Input: Type = new Type("");
    private Output: Type = new Type("");

    private boids: Boid[] = []
    private obstacles: ILine[] = []

    private simulations: ISimulation[] = [];
    private currentTimeMs: number = 0;
    private simIdx: number = 0;
    private baseSimLength: number = 0;

    private fetchingMoreSim: boolean = false;

    private intervalId: NodeJS.Timeout = setTimeout(() => {}, 0);

    // To interrupt fetch calls
    private abortController: AbortController = new AbortController();

    constructor(props: IProps) {
        super(props)
        this.resetSimulations();
        this.resetBoids();

        this.state = {
            loading: false
        }

        this.setupCanvas();
        this.loadProtobuf().then(() => {
            console.log("Protobuf loaded")
        });
    }

    componentDidMount() {
        /*
            FIXME: this does not support hot resizing, a react hook that retrieves media queries should be used
            And the value is hardcoded
         */
        if (document.body.offsetWidth > 1230) {
            const elements: HTMLCollectionOf<Element> = document.getElementsByClassName("section");

            for (let i = 0; i < elements.length; i++) {
                const item = elements.item(i)
                if (item !== null) {
                    const domObstacles: ILine[] = boundingClientToObstacles(item.getBoundingClientRect());

                    this.obstacles = this.obstacles.concat(domObstacles);
                }
            }
        }
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        if (this.props.params.numberOfBoids !== prevProps.params.numberOfBoids) {
            this.resetBoids();
        }
    }

    private async loadProtobuf() {
        try {
            this.root = await protobuf.load("map.proto"); //Maybe it could be loaded from an url if needed
            this.Input = this.root.lookupType("Protobuf.Input")
            this.Output = this.root.lookupType("Protobuf.Output")
        } catch (e) {
            console.log("Could not load proto")
            throw e;
        }
    }

    private setupCanvas() {
        let canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;

        if (!canvas) {
            canvas = document.createElement("canvas");
            document.body.appendChild(canvas);
        }
        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.left = "0";

        canvas.id = "canvas"

        canvas.width  = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
        canvas.style.pointerEvents = "none";
        this.canvas = canvas;
        const ctx = this.canvas.getContext("2d")
        if (!ctx) {
            throw new Error("Could not create canvas");
        }
        this.ctx = ctx;
    }

    private async getNextSimulations(initialInput: IInput, lastSimulation: ISimulation): Promise<IOutput> {
        initialInput.flock = lastSimulation.flock

        const msg = this.Input.create(initialInput);
        const Output = this.Output

        let inputBuffer: Uint8Array = this.Input.encode(msg).finish()

        const signal = this.abortController.signal
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_URL || "http://localhost:8080", {
                method: 'post',
                body: inputBuffer,
                signal: signal,
            }).then(function(response) {
                return response.arrayBuffer();
            }).catch((e) => {
                console.log("Fetch aborted", e);
            })
                .then(function(data: ArrayBuffer | void) {
                    if (!data) {
                        return;
                    }
                    const receivedBuffer = new Uint8Array(data);

                    //FIXME makes the animation lag when its tough to decode
                    const ret: IOutput = Output.toObject(Output.decode(receivedBuffer)) as IOutput;

                    resolve(ret);
                }).catch(reject);
        })
    }

    private clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private drawSimulation(simulation: ISimulation) {
        this.clearCanvas();
/*        if (simulation.obstaclesNormalVectors && simulation.obstaclesPosition) {
            for (let j = 0; j < simulation.obstaclesNormalVectors?.length; j++) {
                simulation.obstaclesPosition[j].x = simulation.obstaclesPosition[j].x || 0;
                simulation.obstaclesPosition[j].y = simulation.obstaclesPosition[j].y || 0;
                simulation.obstaclesNormalVectors[j].x = simulation.obstaclesNormalVectors[j].x || 0;
                simulation.obstaclesNormalVectors[j].y = simulation.obstaclesNormalVectors[j].y || 0;
                drawArrow(this.ctx, simulation.obstaclesPosition[j].x, simulation.obstaclesPosition[j].y,
                    simulation.obstaclesPosition[j].x + simulation.obstaclesNormalVectors[j].x * 300,
                    simulation.obstaclesPosition[j].y + simulation.obstaclesNormalVectors[j].y * 300, "#FFAAFF");
            }
        }*/
        let i = 0;
        for (const boid of simulation.flock.boids) {
            // To handle out of sync boids number update
            if (i < this.boids.length) {
                this.boids[i].position = boid.position
                this.boids[i].direction = boid.direction;
                this.boids[i].avoidance = boid.avoidance || {x: 0, y: 0};
                this.boids[i].separation = boid.separation || {x: 0, y: 0};
                this.boids[i].cohesion = boid.cohesion || {x: 0, y: 0};
                this.boids[i].alignment = boid.alignment || {x: 0, y: 0};
                this.boids[i].draw(this.ctx, "#ffffff", simulation.elapsedTimeSecond * 1000, this.boids.length);
            } else {
                console.log("Number of boids doesn't match simulation")
            }
            i++;
        }
        if (simulation.flock.quadTree) {
            for (const line of simulation.flock.quadTree) {
                drawLine(this.ctx, line.a, line.b, "#222222");
            }
        }
    }

    public restartFromCurrentFrame() {
        this.abortController.abort();
        this.fetchingMoreSim = true;

        this.abortController = new AbortController();

        this.pause();
        const lastSim: ISimulation = this.simulations[this.simIdx];
        if (!lastSim) {
            return;
        }
        this.resetSimulations();

        // We add boids to lastSim because we use it as the basis for next frames
        // Boids nb are adjusted in componentDidUpdate()
        for (let i = lastSim.flock.boids.length; i < this.props.params.numberOfBoids; i++) {
            const boid: Boid = new Boid(100, 100)
            lastSim.flock.boids.push(boid)
        }
        if (this.props.params.numberOfBoids < lastSim.flock.boids.length) {
            lastSim.flock.boids = lastSim.flock.boids.slice(0, this.props.params.numberOfBoids);
        }

        const payload: IInput = this.buildInput();
        this.getNextSimulations(payload, {
            flock: lastSim.flock,
            elapsedTimeSecond: 0,
        }).then((result: IOutput) => {
            this.simulations = this.simulations.concat(result.simulations);
            this.baseSimLength = this.simulations.length;
            this.fetchingMoreSim = false;
        });
        this.resume();
    }

    private resetSimulations() {
        this.simulations = [];
        this.currentTimeMs = 0;
        this.simIdx = 0;
    }

    public start() {
        this.setupCanvas();
        const payload: IInput = this.buildInput();
        clearInterval(this.intervalId);

        this.getNextSimulations(payload, {
            flock: payload.flock,
            elapsedTimeSecond: 0,
        }).then((result: IOutput) => {

            this.simulations = this.simulations.concat(result.simulations);
            this.baseSimLength = this.simulations.length;

        });

        this.resume();
    }

    private getInterval(): number {
        return 1 / this.props.params.FPS * 1000;
    }

    public prevFrame() {
        const interval = this.getInterval();
        this.simIdx -= 2;
        this.currentTimeMs -= interval * 2;
        this.update(this.baseSimLength);
    }

    public nextFrame() {
        const interval = this.getInterval();
        this.update(this.baseSimLength);
        this.currentTimeMs += interval
    }

    private buildInput(): IInput {
        return {
            map: {
                dimensions: {
                    x: document.body.clientWidth,
                    y: document.body.clientHeight
                },
                obstacles: this.obstacles
            },
            imagesPerSecond: 60,
            simulationDurationSec: 5,
            flock: {
                boids: this.boids,
                quadTree: []
            },
            parameters: this.props.params
        }
    }

    private update(baseSimNb: number) {
        // We store the last stimulation index for optimisation purpose
        for (let i = this.simIdx + 1; i < this.simulations.length; i++) {
            if (this.simulations[i].elapsedTimeSecond < this.currentTimeMs) {
                this.drawSimulation(this.simulations[i]);
                this.simIdx = i;

                // If the number of remaining sim is less than one batch, we request more
                if (this.simulations.length - i < baseSimNb && !this.fetchingMoreSim) {
                    this.fetchingMoreSim = true;
                    this.getNextSimulations(this.buildInput(), {
                        flock: this.simulations[this.simulations.length - 1].flock,
                        obstaclesNormalVectors: [],
                        elapsedTimeSecond: this.simulations[this.simulations.length - 1].elapsedTimeSecond,
                    }).then((result: IOutput) => {
                        // FIXME periodically part of this array (when size > baseSImLength * 3 i'd say)
                        // Must have fixed elapsed time before
                        this.simulations = this.simulations.concat(result.simulations);
                        // We clear the beginning of the array when we have enough sim
                        if (this.simulations.length > this.baseSimLength * 3) {
                            this.simIdx -= this.baseSimLength;
                            this.simulations = this.simulations.slice(this.baseSimLength);
                        }
                        this.fetchingMoreSim = false;
                    }).catch((e) => {
                        console.log(e);
                        console.log("Could not fetch more simulations")
                    });
                }
                this.setState({loading: false})
                return;
            }
        }
        this.setState({loading: true});
    }

    public resume() {
        const interval = this.getInterval();

        // We start by pausing in case it's already running
        this.pause();
        this.intervalId = setInterval(() => {
            this.update(this.baseSimLength);
            this.currentTimeMs += interval;
            //FIXME When browser cannot handle all frames, this slows down the animation
            //CurrentTImeMS should have as value the actual elapsedTime
        }, interval);
    }

    // Clear current boids, and recreate using params nb of boids
    private resetBoids() {
        this.boids = [];
        for (let i = 0; i < this.props.params.numberOfBoids; i++) {
            this.boids.push(new Boid(100, 100));
        }
    }

    public stop() {
        this.pause();
        this.resetSimulations();
        this.clearCanvas();
        this.resetBoids();
    }

    public pause() {
        clearInterval(this.intervalId);
    }

    render() {
        if (!this.state.loading) {
            return (
                <span/>
            )
        } else {
            return <Modal>
                <Loader/>
            </Modal>
        }
    }
}
