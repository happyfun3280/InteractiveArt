class GrubberStretchingArt extends Art {
    constructor() {
        super();
        this.backColor = { r: 255, g: 255, b: 255 }
    }

    setup() {
        this.presQuadrant = 1;
        this.lastQuadrant = 1;
        this.color = 0;

        this.presentX = 80;
        this.presentY = 80;

        this.p.noStroke();
    }

    update() {
        this.p.background(this.backColor.r, this.backColor.g, this.backColor.b);
        super.update();

        if (this.presQuadrant != this.lastQuadrant) {
            this.lastQuadrant = this.presQuadrant;
            this.color++;
        }

        if (this.p.mouseIsPressed) {
            if (this.color % 3 == 0) {
                this.p.fill(0, 50 + this.colorControl(), 50 + this.colorControl());
            } else if (this.color % 3 == 1) {
                this.p.fill(50 + this.colorControl(), 0, 50 + this.colorControl());
            } else {
                this.p.fill(50 + this.colorControl(), 50 + this.colorControl(), 0);
            }
        } else {
            if (this.color % 3 == 0) {
                this.p.fill(0, 50 + this.colorControl2(), 50 + this.colorControl2());
            } else if (this.color % 3 == 1) {
                this.p.fill(50 + this.colorControl2(), 0, 50 + this.colorControl2());
            } else {
                this.p.fill(50 + this.colorControl2(), 50 + this.colorControl2(), 0);
            }
        }

        if (this.p.mouseIsPressed) {
            this.p.ellipse(this.canvasWidth / 2, this.canvasHeight / 2, 2 * (this.p.mouseX - this.canvasWidth / 2), 2 * (this.p.mouseY - this.canvasHeight / 2));
            this.presentX = 2 * (Math.abs(this.p.mouseX - this.canvasWidth / 2));
            this.presentY = 2 * (Math.abs(this.p.mouseY - this.canvasHeight / 2));
            if (this.p.mouseX < this.canvasWidth / 2 && this.p.mouseY < this.canvasHeight / 2) {
                this.presQuadrant = 2;
            } else if (this.p.mouseX >= this.canvasWidth / 2 && this.p.mouseY < this.canvasHeight / 2) {
                this.presQuadrant = 4;
            } else if (this.p.mouseX < this.canvasWidth / 2 && this.p.mouseY >= this.canvasHeight / 2) {
                this.presQuadrant = 3;
            } else {
                this.presQuadrant = 1;
            }

        } else {
            this.p.ellipse(this.canvasWidth / 2, this.canvasHeight / 2, this.presentX, this.presentY);
        }

        if (this.presentX >= 100) {
            this.presentX -= this.presentX / 9;
        } else {
            this.presentX = 80;
        }
        if (this.presentY >= 100) {
            this.presentY -= this.presentY / 9;;

        } else {
            this.presentY = 80;
        }
    }

    initTouch(touch) {
    }

    updateTouch(touch) {
    }

    colorControl() {
        return 200 * (Math.abs(this.p.mouseY - this.canvasHeight / 2) + Math.abs(this.p.mouseX - this.canvasWidth / 2)) / (this.canvasWidth / 2 + this.canvasHeight);
    }
    colorControl2() {
        return 200 * (this.presentX + this.presentY) / (this.canvasWidth / 2 + this.canvasHeight / 2);
    }
}