interface IInput {
    map: IMap;
    flock: IFlock;
    simulationDurationSec: number;
    imagesPerSecond: number;
}

interface IOutput {
    simulations: ISimulation[]
}

interface ISimulation {
    flock: IFlock;
    elapsedTimeSecond: number;
}

interface IMap {
    dimensions: IPos2D;
    obstacles: ILine[]
}

interface ILine {
    a: IPos2D;
    b: IPos2D;
}

interface IPos2D {
    x: number;
    y: number;
}

interface IBoid {
    position: IPos2D;
    direction: IPos2D;
}

interface IFlock {
    boids: IBoid[]
}
