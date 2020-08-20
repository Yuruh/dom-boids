export interface IInput {
    map: IMap;
    flock: IFlock;
    simulationDurationSec: number;
    imagesPerSecond: number;
}

export interface IOutput {
    simulations: ISimulation[]
}

export interface ISimulation {
    flock: IFlock;
    elapsedTimeSecond: number;
}

export interface IMap {
    dimensions: IPos2D;
    obstacles: ILine[]
}

export interface ILine {
    a: IPos2D;
    b: IPos2D;
}

export interface IPos2D {
    x: number;
    y: number;
}

export interface IBoid {
    position: IPos2D;
    direction: IPos2D;
}

export interface IFlock {
    boids: IBoid[]
}
