//baseColor must be size 4 (rgba)

export async function buildCanvas() {
// May be a dead end
/*    try {
        const canvas = await html2canvas(document.body);
        canvas.id = "canvas";
        canvas.style.position = "absolute";
        document.body.appendChild(canvas)
    } catch (e) {
        console.log("in build canvas", e);
    }*/
}

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

export function imageDataToObstacles(baseColor: number[]): ILine[] {
    const obstacles: ILine[] = [];

    const toto: HTMLElement = document.getElementById("toto");

    console.log(toto);
    console.log(toto.getBoundingClientRect());
/*    const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) {
        throw "canvas not found"
    }
    const ctx = canvas.getContext("2d");

    const imageData = ctx.getImageData(0, 0, window.innerWidth,  window.innerWidth);

    const data = imageData.data;
    for (let i = 0; i < 60; i++) {
        console.log(data[i])
    }*/
    return obstacles;
}
