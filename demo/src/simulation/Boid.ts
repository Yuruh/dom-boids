import {IPos2D} from "./ProtoInterfaces";

const randomColor = require('randomcolor'); // import the script

const triangleSize = 20;
const triangleWidthRad = 0.13;
const animUpdateRateMs = 50;
const imageSize = 40;
const nbOfImage = 6;

// Beyond this number we draw triangle instead of image,
const nbOfAvatarThreshold = 500;

export function drawArrow(ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number, color: string) {
    const headLen = 10; // length of head in pixels
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.lineTo(toX - headLen * Math.cos(angle - Math.PI / 6), toY - headLen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLen * Math.cos(angle + Math.PI / 6), toY - headLen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
}

export function drawLine(ctx: CanvasRenderingContext2D, a: IPos2D, b: IPos2D, color: string) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(a.x || 0, a.y || 0);
    ctx.lineTo(b.x || 0, b.y || 0);
    ctx.stroke();
}

export default class Boid {
    position = {
        x: window.innerWidth / 2,//Math.random() * window.innerWidth, // we can also make them start at a specific point
        y: window.innerHeight / 2,//Math.random() * window.innerHeight
    }
    direction = {
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1
    }
    avoidance = {
        x: 0,
        y: 0,
    }
    cohesion: IPos2D = {
        x: 0,
        y: 0,
    }
    separation = {
        x: 0,
        y: 0,
    }
    alignment = {
        x: 0,
        y: 0,
    }
    
    images: HTMLImageElement[] = []
    imagesRight: HTMLImageElement[] = []

    // so all boids don't have the same animation
    animStartAt: number;

    color: string;

    constructor(posStartX = window.innerWidth / 2, posStartY = window.innerHeight / 2) {
        this.position.x = posStartX;
        this.position.y = posStartY;
        this.color = randomColor();

        for (let i = 0; i < nbOfImage; i++) {
            this.images.push(new Image());
            this.images[i].src = "spritesheets/fish/swim_to_left/" + (i + 1) + ".png"

            this.imagesRight.push(new Image());
            this.imagesRight[i].src = "spritesheets/fish/Swim_to_right/" + (i + 1) + ".png"
        }

        this.animStartAt = Math.floor(Math.random() * nbOfImage);
    }

    private drawAvatar(ctx: CanvasRenderingContext2D, elapsedTimeMs: number) {
        let idx = Math.floor(elapsedTimeMs / animUpdateRateMs % this.images.length);

        idx += this.animStartAt;
        idx = idx % this.images.length;
        let image: HTMLImageElement = this.images[idx];
        if (this.direction.x > 0) {
            image = this.imagesRight[idx];
        }

        const ratio = image.height / image.width;
        const imageHeight = imageSize * ratio;

        const angleRad = Math.atan2(this.direction.y * -1, this.direction.x * -1);

        const destX = this.position.x - imageSize / 2;
        const destY = this.position.y - imageHeight / 2;

        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(angleRad);
        if (this.direction.x > 0) {
            ctx.rotate(Math.PI); // Because the images are sideways
        }
        ctx.translate(-this.position.x, -this.position.y);
        ctx.drawImage(image, 0, 0, image.width, image.height,
            destX, destY, imageSize, imageHeight);
        ctx.restore();

    }
    
    private drawArrowPosVec(ctx: CanvasRenderingContext2D, pos: IPos2D, dir: IPos2D, color: string) {
        if (dir.x === 0 && dir.y === 0) {
            return;
        }
        drawArrow(ctx, pos.x, pos.y,
            pos.x + dir.x * 500,
            pos.y + dir.y * 500, color);
    }

    draw(ctx: CanvasRenderingContext2D, color: string, elapsedTimeMs: number, nbOfBoids: number) {

        if (nbOfBoids < nbOfAvatarThreshold) {
            this.drawAvatar(ctx, elapsedTimeMs)
        } else {
            // I can't use this.color, because due to quadtree improvement, order of boids change every frame
            // To fix i'd to store the boid's color and send through protobuf
            this.drawTriangle(ctx, color);
        }

/*        this.drawArrowPosVec(ctx, this.position, this.avoidance, "#FF0000")
        this.drawArrowPosVec(ctx, this.position, this.cohesion, "#FF00FF")
        this.drawArrowPosVec(ctx, this.position, this.alignment, "#FFFF00")
        this.drawArrowPosVec(ctx, this.position, this.separation, "#0000FF")*/


        /*drawArrow(ctx, this.position.x, this.position.y,
            this.position.x + this.direction.x * 100,
            this.position.y + this.direction.y * 100, "#00FFFF");*/

    }

    private drawTriangle(ctx: CanvasRenderingContext2D, color: string) {
        const angleRad = Math.atan2(this.direction.y * -1, this.direction.x * -1);

        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(this.position.x + triangleSize * Math.cos(angleRad + triangleWidthRad),
            this.position.y + triangleSize * Math.sin(angleRad + triangleWidthRad))
        ctx.lineTo(this.position.x + triangleSize * Math.cos(angleRad - triangleWidthRad),
            this.position.y + triangleSize * Math.sin(angleRad - triangleWidthRad))
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
}
