var protobuf = require("protobufjs");
const axios = require('axios');

class Boid {
    position = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
    }
    direction = {
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1
    }
}

protobuf.load("map.proto", async function(err, root) {
    if (err)
        throw err;

    const Input = root.lookupType("Protobuf.Input")
    const Output = root.lookupType("Protobuf.Output")

    const boids = []
    for (let i = 0; i < 50; i++) {
        boids.push(new Boid());
    }

    const payload = {
        map: {
           dimensions: {
               x: window.innerWidth,
               y: window.innerHeight
           }
        },
        refreshRate: 1,
        secondsOfSimulation: 1,
        flock: {
            boids
        }
    }

    const msg = Input.create(payload);
    const buffer = Input.encode(msg).finish()

    try {
        const res = await axios.post("http://localhost:8080", buffer, {
            responseType: 'arraybuffer',
        });
        const receivedBuffer = Buffer.from(res.data, "base64");

        const data = Output.decode(receivedBuffer);

        animateBoids(Output.toObject(data));

    } catch (e) {
        console.log(e)
    }
})

// gotta type it
function animateBoids(result) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const triangleSize = 60;
    const triangleWidthRad = 0.2

    for (const simulation of result.simulations) {
        setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
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
                ctx.fillStyle = "#0095DD"
                ctx.fill();
                ctx.closePath();
            }
        }, simulation.elapsedTimeSecond * 1000)
    }
}
