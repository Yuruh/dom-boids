import { ILine } from "./ProtoInterfaces";

export function boundingClientToObstacles(rekt: DOMRect): ILine[] {
    const botLeft = {x: rekt.x, y: rekt.y + rekt.height};
    const botRight = {x: rekt.x + rekt.width, y: rekt.y + rekt.height};
    const topLeft = {x: rekt.x, y: rekt.y};
    const topRight = {x: rekt.x + rekt.width, y: rekt.y};

    return [{
        a: topLeft,// from top left to top right
        b: topRight
    }, {
        a: topRight,// from top right to bottom right
        b: botRight
    }, {
        a: botRight,// from bottom right to bottom left
        b: botLeft
    }, {
        a: botLeft,// from bottom left to top left
        b: topLeft
    },]
}
