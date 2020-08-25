export interface IInput {
    map: IMap;
    flock: IFlock;
    simulationDurationSec: number;
    imagesPerSecond: number;
    parameters?: IParameters
}

export interface IParameters {
    separationScale: number; // How prominent is separation factor. From 0 to 2, default to 1
    cohesionScale: number; // How prominent is cohesion factor. From 0 to 2, default to 1
    alignmentScale: number; // How prominent is alignment factor. From 0 to 2, default to 1
    avoidanceScale: number; // How prominent is avoidance factor. From 0 to 2, default to 1

    visionDistance: number; // How far agents perceive local flock mates. Min 0
    obstacleDistance: number; // How far agents perceive obstacles. Min 0
    separationDistance: number; // Distance from which an agent tries to avoid an other one

    maxLocalFlockmates: number; // Max nb of peers a boid can use to make a decision
}


export interface IOutput {
    simulations: ISimulation[]
}

export interface ISimulation {
    flock: IFlock;
    obstaclesNormalVectors?: IPos2D[];
    obstaclesPosition?: IPos2D[];
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

    avoidance?: IPos2D;
    cohesion?: IPos2D;
    alignment?: IPos2D;
    separation?: IPos2D;
}

export interface IFlock {
    boids: IBoid[]
}
