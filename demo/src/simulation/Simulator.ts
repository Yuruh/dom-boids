import {IBoid, IInput, ILine, IOutput, ISimulation} from "./ProtoInterfaces"
import Boid from "./Boid";
import {Root, Type} from "protobufjs";
import {boundingClientToObstacles} from "./domParsing";
const protobuf = require("protobufjs");

function createCanvas() {
    const canvas: HTMLCanvasElement = document.createElement("canvas");

    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";

    canvas.id = "canvas"

    canvas.width  = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    canvas.style.pointerEvents = "none";

    document.body.appendChild(canvas);
    return canvas;
}

export default class Simulator {

    // typescript doesn't realize that they are assigned in the constructor
    // @ts-ignore
    private canvas: HTMLCanvasElement;
    // @ts-ignore
    private ctx: CanvasRenderingContext2D;

    private root: Root = new Root();
    private Input: Type = new Type("");
    private Output: Type = new Type("");

    private boids: Boid[] = []
    private readonly obstacles: ILine[] = []

    private timeoutIds: NodeJS.Timeout[] = [];

    private async loadProtobuf() {
        try {
            this.root = await protobuf.load("map.proto");
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
            throw "Could not create canvas"
        }
        this.ctx = ctx;
    }

    private async getNextSimulations(initialInput: IInput, lastSimulation: ISimulation): Promise<IOutput> {
        initialInput.flock = lastSimulation.flock

        const msg = this.Input.create(initialInput);
        const Output = this.Output

        let inputBuffer: Uint8Array = this.Input.encode(msg).finish()

        return new Promise((resolve, reject) => {
//        fetch('https://boids.yuruh.fr', {
            fetch('http://localhost:8080', {
                method: 'post',
                body: inputBuffer
            }).then(function(response) {
                return response.arrayBuffer();
            }).then(function(data) {
                const receivedBuffer = new Uint8Array(data);

                const ret: IOutput = Output.toObject(Output.decode(receivedBuffer)) as IOutput;

                resolve(ret);
            }).catch(reject);
        })
    }

    constructor() {
        for (let i = 0; i < 100; i++) {
            this.boids.push(new Boid(10,  10));
        }

        const elements: HTMLCollectionOf<Element> = document.getElementsByClassName("section");

        for (let i = 0; i < elements.length; i++) {
            const item = elements.item(i)
            if (item !== null) {
                const domObstacles: ILine[] = boundingClientToObstacles(item.getBoundingClientRect());

                this.obstacles = this.obstacles.concat(domObstacles);
            }
        }
        this.setupCanvas();
        this.loadProtobuf().then(() => {
            console.log("Protobuf loaded")
        });
    }

    private animateBoids(input: IInput, result: IOutput) {
        if (result.simulations.length > 0) {
            const lastSimulation: ISimulation = result.simulations[result.simulations.length - 1];

            // This doesn't take into account how long the getNextSimulations takes to operate
            const t0 = Date.now();
            this.getNextSimulations(input, lastSimulation).then((nextResult: IOutput) => {
                const t1 = Date.now();
                const elapsedTimeMs = t1 - t0;
                let triggerNext = lastSimulation.elapsedTimeSecond * 1000 - elapsedTimeMs;
                if (triggerNext < 0) {
                    console.log("Computation took longer than animation");
                    triggerNext = 0;
                }
                this.timeoutIds.push(setTimeout(() => {
                    this.animateBoids(input, nextResult)
                }, triggerNext));
                //          console.log("next simulation time:", lastSimulation.elapsedTimeSecond);
//            console.log("next simulation content:", nextResult);
            });
        }

/*        this.ctx.strokeStyle =  "#AAAAAA"

        this.ctx.lineTo(500, 500)
        this.ctx.stroke();*/
        for (const simulation of result.simulations) {
            this.timeoutIds.push(setTimeout(() => {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.strokeStyle =  "#ffffff"
                for (const obstacle of input.map.obstacles) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(obstacle.a.x, obstacle.a.y)
                    this.ctx.lineTo(obstacle.b.x, obstacle.b.y);
                    this.ctx.stroke();
                    this.ctx.closePath();
                }
                let i = 0;
                for (const boid of simulation.flock.boids) {
                    this.boids[i].position = boid.position
                    this.boids[i].direction = boid.direction;
                    this.boids[i].draw(this.ctx, "", simulation.elapsedTimeSecond * 1000);
                    i++;
                }
            }, simulation.elapsedTimeSecond * 1000));
        }
    }


    public start() {
        this.setupCanvas();
        const payload: IInput = {
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
                boids: this.boids
            }
        }

        this.getNextSimulations(payload, {
            flock: payload.flock,
            elapsedTimeSecond: 0,
        }).then((result: IOutput) => {
            this.timeoutIds.push(setTimeout(() => {
                this.animateBoids(payload, result)
            }, 0))
        });
    }

    public stop() {

    }

    public pause() {

    }
}
