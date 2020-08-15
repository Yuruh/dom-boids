import {Root, Type} from "protobufjs";
import Boid from "./Boid";
import {boundingClientToObstacles} from "./domParsing";

const protobuf = require("protobufjs");
const randomColor = require('randomcolor'); // import the script
const colors = [];

let globalRoot: Root | undefined;
let Input: Type;
let Output: Type;

const simLengthSec = 5;
let chooseStartPosition: boolean = true;

let boids: Boid[] = [];
let obstacles: ILine[] = [];
let timeoutIds = [];

function initMap(boidStartX, boidStartY): IInput {
    const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;

    const sliderBoids: HTMLInputElement = document.getElementById("input-nb-boids") as any;
    const sliderFps: HTMLInputElement = document.getElementById("fps") as any;
    for (let i = 0; i < sliderBoids.valueAsNumber; i++) {
        boids.push(new Boid(boidStartX, boidStartY));
        colors.push(randomColor())
    }
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const elements: HTMLCollectionOf<Element> = document.getElementsByClassName("avoid");

    for (let i = 0; i < elements.length; i++) {
        const domObstacles: ILine[] = boundingClientToObstacles(elements.item(i).getBoundingClientRect());

        obstacles = obstacles.concat(domObstacles);
    }

    return {
        map: {
            dimensions: {
                x: window.innerWidth,
                y: window.innerHeight
            },
            obstacles
        },
        imagesPerSecond: sliderFps.valueAsNumber,
        simulationDurationSec: simLengthSec,
        flock: {
            boids
        }
    }
}

function clearAllTimeouts() {
    for (const i of timeoutIds) {
        clearTimeout(i);
    }
    timeoutIds = [];
}

function reset() {
    clearAllTimeouts();
    boids = [];
    chooseStartPosition = true;

    document.body.style.cursor = "pointer";


    const instructions: HTMLElement = document.getElementById("instructions") as any;

    instructions.style.visibility = "visible"
}

window.onload = function() {
    const slider: HTMLInputElement = document.getElementById("input-nb-boids") as any;
    const sliderFps: HTMLInputElement = document.getElementById("fps") as any;

    function setSliderValue() {
        const label: HTMLLabelElement = document.getElementById("nb-boids-label") as HTMLLabelElement;
        label.innerText = slider.value + " boids"
    }

    function setSliderFPSValue() {
        const labelFps: HTMLLabelElement = document.getElementById("fps-label") as HTMLLabelElement;
        labelFps.innerText = sliderFps.value + " FPS"
    }

    setSliderValue();
    setSliderFPSValue();

    window.onclick = function(event: MouseEvent) {
        if (chooseStartPosition) {
            document.body.style.cursor = "auto";

            const instructions: HTMLElement = document.getElementById("instructions") as any;

            instructions.style.visibility = "hidden"
            clearAllTimeouts();
            boids = [];

            const payload = initMap(event.clientX, event.clientY);

            chooseStartPosition = false;
            start(payload);

        }
    }

    slider.oninput = function(e) {
        setSliderValue();
    }


    sliderFps.oninput = function(e) {
        setSliderFPSValue();
    }

    slider.onmouseup = sliderFps.onmouseup = function(e) {
        e.stopImmediatePropagation()
        reset();
    }
    slider.onclick = sliderFps.onclick = function (e) {
        e.stopImmediatePropagation();
    }


//    const payload = initMap()
 //   start(payload);
}

function start(payload: IInput) {
    protobuf.load("map.proto", async function (err, root) {
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

//const listINputBuffer: Uint8Array[] = [];

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

//todo https://developer.mozilla.org/fr/docs/Tutoriel_canvas/Pixel_manipulation_with_canvas
function animateBoids(input: IInput, result: IOutput) {
    const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    if (!canvas) {
        throw "canvas not found"
    }


    const ctx = canvas.getContext("2d");

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
                boids[i].draw(ctx, colors[i], simulation.elapsedTimeSecond * 1000);
                i++;
            }
        }, simulation.elapsedTimeSecond * 1000));
    }
}
