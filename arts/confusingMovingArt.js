class ConfusingMovingArt extends Art {
    constructor() {
        super();
        this.backColor = { r: 255, g: 255, b: 255 };
    }

    setup() {
        this.p.noStroke();
        this.change = 100;
    }

    update() {
        super.update();
        let p = this.p;
        if (p.mouseX <= this.canvasWidth / 2 && p.mouseY <= this.canvasHeight / 2) {
            p.background(250, 100, 100)
        } else if (p.mouseX <= this.canvasWidth / 2 && p.mouseY > this.canvasHeight / 2) {
            p.background(100, 100, 250)
        } else if (p.mouseX > this.canvasWidth / 2 && p.mouseY <= this.canvasHeight / 2) {
            p.background(100, 250, 100);
        } else {
            p.background(250, 250, 100)
        }

        for (let i = 0; i * this.change <= this.canvasWidth; i++) {

            p.fill(100, 250, 100)
            p.ellipse(this.canvasWidth - p.mouseX, 50 + i * this.change, 100, 100);
            p.fill(100, 100, 250)
            p.ellipse(p.mouseX, this.canvasHeight - 50 - i * this.change, 100, 100);
        }
        for (let i = 0; i * this.change <= 2*this.canvasHeight; i++) {

            p.fill(250, 100, 100)
            p.ellipse(50 + i * this.change, p.mouseY, 100, 100);
            p.fill(250, 250, 100)
            p.ellipse(this.canvasWidth - 50 - i * this.change, this.canvasHeight - p.mouseY, 100, 100);
        }
    }
}