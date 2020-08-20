const triangleSize = 30;
const triangleWidthRad = 0.2;
const animUpdateRateMs = 75;
const imageSize = 50;
const nbOfImage = 6;

export default class Boid {
    position = {
        x: window.innerWidth / 2,//Math.random() * window.innerWidth, // we can also make them start at a specific point
        y: window.innerHeight / 2,//Math.random() * window.innerHeight
    }
    direction = {
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1
    }
    images: HTMLImageElement[] = []
    imagesRight: HTMLImageElement[] = []

    // so all boids don't have the same animation
    animStartAt: number;

    constructor(posStartX = window.innerWidth / 2, posStartY = window.innerHeight / 2) {
        this.position.x = posStartX;
        this.position.y = posStartY;

        for (let i = 0; i < nbOfImage; i++) {
            this.images.push(new Image());
            this.images[i].src = "spritesheets/fish/swim_to_left/" + (i + 1) + ".png"

            this.imagesRight.push(new Image());
            this.imagesRight[i].src = "spritesheets/fish/Swim_to_right/" + (i + 1) + ".png"
        }

        this.animStartAt = Math.floor(Math.random() * nbOfImage);

        /*        const rand = Math.floor(Math.random() * 4) + 1;

                this.images[0].src = "spritesheets/Bird_" + rand + "/frame-1.png"
                this.images[1].src = "spritesheets/Bird_" + rand + "/frame-2.png"
                this.images[2].src = "spritesheets/Bird_" + rand + "/frame-3.png"
                this.images[3].src = "spritesheets/Bird_" + rand + "/frame-4.png"*/
    }

    draw(ctx: CanvasRenderingContext2D, color: string, elapsedTimeMs: number) {
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

        // draws triangle
        /*        ctx.beginPath();
                ctx.moveTo(this.position.x, this.position.y);
                ctx.lineTo(this.position.x + triangleSize * Math.cos(angleRad + triangleWidthRad),
                    this.position.y + triangleSize * Math.sin(angleRad + triangleWidthRad))
                ctx.lineTo(this.position.x + triangleSize * Math.cos(angleRad - triangleWidthRad),
                    this.position.y + triangleSize * Math.sin(angleRad - triangleWidthRad))
                ctx.fillStyle = color;
                ctx.fill();
                ctx.closePath();
        */
    }
}
