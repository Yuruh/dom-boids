export default class Boid {
    position = {
        x: window.innerWidth / 2,//Math.random() * window.innerWidth, // we can also make them start at a specific point
        y: window.innerHeight / 2,//Math.random() * window.innerHeight
    }
    direction = {
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1
    }
}
