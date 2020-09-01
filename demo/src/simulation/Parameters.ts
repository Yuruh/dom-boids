import {IParameters} from "./ProtoInterfaces";

export default class Parameters implements IParameters {
    alignmentScale: number = 1;
    avoidanceScale: number = 1;
    cohesionScale: number = 1;
    separationScale: number = 1;
    maxLocalFlockmates: number = 20;
    obstacleDistance: number = 100; // Should depend on window size, so set on controls did mount
    separationDistance: number = 50; // Same
    visionDistance: number = 90; // Same

    /*
        The number of boids in the simulation.
        Not sent to the server but used by Simulator to build the flock
     */
    numberOfBoids: number = 200;

    // FIXME lowering this value impacts speed, this should not happen
    FPS: number = 50;
}
