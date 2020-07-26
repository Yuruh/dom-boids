export default class Boid {
    position = {
        x: Math.random() * window.innerWidth, // we can also make them start at a specific point
        y: Math.random() * window.innerHeight
    }
    direction = {
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1
    }
}
