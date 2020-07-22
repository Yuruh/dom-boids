import {Root, Type} from "protobufjs";
import Boid from "./Boid";
import {boundingClientToObstacles, buildCanvas, imageDataToObstacles} from "./domParsing";

const protobuf = require("protobufjs");
const axios = require('axios');
const randomColor = require('randomcolor'); // import the script
const colors = [];

let globalRoot: Root | undefined;
let Input: Type;
let Output: Type;

const boids = [];
for (let i = 0; i < 300; i++) {
    boids.push(new Boid());
    colors.push(randomColor())
}
let obstacles: ILine[] = []

/*for (let i = 0; i < 2; i++) {
    obstacles.push({
        a: {
            x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
        },
        b: {
            x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
        }
    })
}*/

window.onload = function() {
    const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const elements: HTMLCollectionOf<Element> = document.getElementsByClassName("avoid");

    for (let i = 0; i < elements.length; i++) {
        const domObstacles: ILine[] = boundingClientToObstacles(elements.item(i).getBoundingClientRect());

        obstacles = obstacles.concat(domObstacles);
    }

    const payload: IInput = {
        map: {
            dimensions: {
                x: window.innerWidth,
                y: window.innerHeight
            },
            obstacles
        },
        imagesPerSecond: 30,
        simulationDurationSec: 20,
        flock: {
            boids
        }
    }
    start(payload);
}

function start(payload: IInput) {
    protobuf.load("map.proto", async function (err, root) {
        globalRoot = root;
        Input = globalRoot.lookupType("Protobuf.Input")
        Output = globalRoot.lookupType("Protobuf.Output")

        getNextSimulations(payload, {
            flock: payload.flock,
            elapsedTimeSecond: 0,
        }).then((result: IOutput) => {
            console.log("initial");
            setTimeout(() => {
                animateBoids(payload, result)
            }, 0);
        });
    });
}

async function getNextSimulations(initialInput: IInput, lastSimulation: ISimulation): Promise<IOutput> {
    //TODO load protobuf differently
//    console.log("last simulation", lastSimulation);


//    initialInput.flock = lastSimulation.flock

    const test: IInput = JSON.parse(JSON.stringify(initialInput));

    test.flock = JSON.parse(JSON.stringify(lastSimulation.flock));

    const msg = Input.create(test);
    console.log("input", msg);
    const inputBuffer: Uint8Array = Input.encode(msg).finish()


    // A DELETE
/*    try {
        await axios.post(`http://localhost:8080?timestamp=${new Date().getTime()}`, JSON.stringify(test));
    } catch (e) {
        console.log(e)
    }*/
    ///    --------------------------



    try {
        const response = await axios.post(`http://localhost:8080?timestamp=${new Date().getTime()}`, inputBuffer, {
            responseType: 'arraybuffer',
        });
        const receivedBuffer = Buffer.from(response.data, "base64");

        const data = Output.decode(receivedBuffer);

        return Output.toObject(data) as any;
    } catch (e) {
        console.log(e)
        throw e;
    }

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

    const triangleSize = 40;
    const triangleWidthRad = 0.2

    if (result.simulations.length > 0) {
        const lastSimulation: ISimulation = result.simulations[result.simulations.length - 1];

        getNextSimulations(input, lastSimulation).then((nextResult: IOutput) => {
            setTimeout(() => {
                animateBoids(input, nextResult)
            }, lastSimulation.elapsedTimeSecond * 1000);
        });
    }

    for (const simulation of result.simulations) {
        setTimeout(() => {
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
                ctx.beginPath();
                ctx.moveTo(boid.position.x, boid.position.y);
                const angleRad = Math.atan2(boid.direction.y * -1, boid.direction.x * -1);
                ctx.lineTo(boid.position.x + triangleSize * Math.cos(angleRad + triangleWidthRad),
                    boid.position.y + triangleSize * Math.sin(angleRad + triangleWidthRad))
                ctx.lineTo(boid.position.x + triangleSize * Math.cos(angleRad - triangleWidthRad),
                    boid.position.y + triangleSize * Math.sin(angleRad - triangleWidthRad))
              //  ctx.lineTo(boid.position.x + boid.direction.x * triangleSize, boid.position.y + boid.direction.y * triangleSize)
                //ctx.lineTo(boid.position.x - boid.direction.x * triangleSize, boid.position.y - boid.direction.y * triangleSize)
               // ctx.arc(boid.position.x, boid.position.y, 10, 0, Math.PI*2, false);
                ctx.fillStyle = colors[i++]
                ctx.fill();
                ctx.closePath();
            }

            }, simulation.elapsedTimeSecond * 1000)
    }
}
