import React, {useEffect} from 'react';
import './App.scss';
import {SliderSection} from "./SliderSection";
import Boid from "./simulation/Boid";
import {boundingClientToObstacles} from "./simulation/domParsing";
import {IInput, ILine, ISimulation, IOutput} from './simulation/ProtoInterfaces';
import {Type, Root} from "protobufjs";
import Simulator from "./simulation/Simulator";

const protobuf = require("protobufjs");

let boids: Boid[] = [];
let obstacles: ILine[] = [];

let globalRoot: Root | undefined;
let Input: Type;
let Output: Type;
let timeoutIds = [];

function go() {
    const canvas: HTMLCanvasElement = document.createElement("canvas");

    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";

    canvas.id = "canvas"

    canvas.width  = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    canvas.style.pointerEvents = "none";

    document.body.appendChild(canvas)
    for (let i = 0; i < 50; i++) {
        boids.push(new Boid(10,  10));
    }

    const elements: HTMLCollectionOf<Element> = document.getElementsByClassName("section");

    for (let i = 0; i < elements.length; i++) {
        const item = elements.item(i)
        if (item !== null) {
            const domObstacles: ILine[] = boundingClientToObstacles(item.getBoundingClientRect());

            obstacles = obstacles.concat(domObstacles);
        }
    }

    const input: IInput = {
        map: {
            dimensions: {
                x: window.innerWidth,
                y: window.innerHeight
            },
            obstacles
        },
        imagesPerSecond: 60,
        simulationDurationSec: 5,
        flock: {
            boids
        }
    }

    start(input);
}

async function getNextSimulations(initialInput: IInput, lastSimulation: ISimulation): Promise<IOutput> {
    initialInput.flock = lastSimulation.flock

    const msg = Input.create(initialInput);

    let inputBuffer: Uint8Array = Input.encode(msg).finish()

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

function animateBoids(input: IInput, result: IOutput) {
    const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;

    if (!canvas) {
        throw "canvas not found"
    }

    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (!ctx) {
        throw "No canvas context";
    }

    if (result.simulations.length > 0) {
        const lastSimulation: ISimulation = result.simulations[result.simulations.length - 1];

        // This doesn't take into account how long the getNextSimulations takes to operate
        const t0 = Date.now();
        getNextSimulations(input, lastSimulation).then((nextResult: IOutput) => {
            const t1 = Date.now();
            const elapsedTimeMs = t1 - t0;
            let triggerNext = lastSimulation.elapsedTimeSecond * 1000 - elapsedTimeMs;
            if (triggerNext < 0) {
                console.log("Computation took longer than animation");
                triggerNext = 0;
            }
            timeoutIds.push(setTimeout(() => {
                animateBoids(input, nextResult)
            }, triggerNext));
            //          console.log("next simulation time:", lastSimulation.elapsedTimeSecond);
//            console.log("next simulation content:", nextResult);
        });
    }

    for (const simulation of result.simulations) {
        timeoutIds.push(setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle =  "#ffffff"
            for (const obstacle of input.map.obstacles) {
                ctx.beginPath();
                ctx.moveTo(obstacle.a.x, obstacle.a.y)
                ctx.lineTo(obstacle.b.x, obstacle.b.y);
                ctx.stroke();
                ctx.closePath();
            }
            let i = 0;
            for (const boid of simulation.flock.boids) {
                boids[i].position = boid.position
                boids[i].direction = boid.direction;
                boids[i].draw(ctx, "", simulation.elapsedTimeSecond * 1000);
                i++;
            }
        }, simulation.elapsedTimeSecond * 1000));
    }
}

function start(payload: IInput) {
    protobuf.load("map.proto", async function (err: Error, root: Root) {
        if (err !== null) {
            throw err
        }
        globalRoot = root;
        Input = globalRoot.lookupType("Protobuf.Input")
        Output = globalRoot.lookupType("Protobuf.Output")


        console.log("Starting first simulation")
        getNextSimulations(payload, {
            flock: payload.flock,
            elapsedTimeSecond: 0,
        }).then((result: IOutput) => {
            timeoutIds.push(setTimeout(() => {
                animateBoids(payload, result)
            }, 0))
        });
    });
}

function SimulatorButton() {
    let simulator = new Simulator();

    useEffect(() => {
        simulator = new Simulator();
    })

    return <h4><button onClick={() => {
        simulator.start();
    }}>Start the simulation</button></h4>
}

function App() {

    return (
        <div className="App">
            <h1>DOM BOIDS</h1>
            <h4>Teeming the web with life</h4>
            <h6>By <a href={"https://github.com/yuruh"} target={"_blank"} rel="noopener noreferrer">Antoine Lempereur</a></h6>
            <p>Based on Craig Reynolds BOIDS model, stuff that should be said so ppl understand what's going on</p>
            <SimulatorButton/>
            <hr/>
            <h2>Configuring the simulation</h2>
            <SliderSection title={"Alignment"} explanation={"Boids should always steer towards the average heading of local flockmates"} value={1} onSliderValueChange={() => {}}/>
            <div className={"align-right"}>
                <SliderSection title={"Alignment"} explanation={"Boids should always steer towards the average heading of local flockmates"} value={1} onSliderValueChange={() => {}}/>
            </div>
            <SliderSection title={"Alignment"} explanation={"Boids should always steer towards the average heading of local flockmates"} value={1} onSliderValueChange={() => {}}/>
            <div className={"align-right"}>
                <SliderSection title={"Alignment"} explanation={"Boids should always steer towards the average heading of local flockmates"} value={1} onSliderValueChange={() => {}}/>
            </div>
            <hr/>
            <h2>About the project</h2>
            <div className={"section"}>About<p>Making a complex behaviour emerge from simple rules. Transforming a web page in the boids environment</p></div>
            <div className={"section"}>Technical Specificities</div>
            <div className={"section"}>Development</div>
        </div>
    );
}

export default App;
