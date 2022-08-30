class TopSpinningArt extends Art {
    constructor() {
        super();
        this.backColor = { r: 255, g: 255, b: 255 }
    }

    setup() {
        this.brush;

        this.p.background(20);
        this.p.colorMode(this.p.HSB, 1.0);
        this.p.imageMode(this.p.CENTER);
        this.brush = this.p.createGraphics(this.canvasWidth / 5, this.canvasHeight / 5);
        this.brush.colorMode(this.p.HSB, 1.0);
        this.makeBrush();
        this.p.rect(0, 0, this.canvasWidth, this.canvasHeight, 50);
        this.p.noiseDetail(3, 0.5)
    }

    update() {
        super.update();
    }

    initTouch(touch) {
        touch.count = 0;
    }

    updateTouch(touch) {
        for (var i = 0; i < 10; i++) {
            var x = touch.x + this.p.map(this.p.noise(touch.count * 0.0025, 1.5), 0, 1, -1, 1) * 100;
            var y = touch.y + this.p.map(this.p.noise(touch.count * 0.0025, 2.5), 0, 1, -1, 1) * 100;
            var a = this.p.noise(touch.count * 0.001, 3.5) * this.p.TWO_PI * 10;
            var s = this.p.noise(touch.count * 0.025, 4.5);
            var hue = this.p.map(this.p.noise(touch.count * 0.01, 5.5), 0.33, 0.66, 0, 1);
            this.p.tint(hue, 0.25, 1, this.p.noise(touch.count * 0.001, 7.5) * 0.5);
            this.p.push();
            this.p.translate(x, y);
            this.p.rotate(a);
            this.p.scale(s, s)
            this.p.image(this.brush, 0, 0);
            this.p.pop();
            this.p.push();
            this.p.translate(this.canvasWidth - x, y);
            this.p.rotate(-a);
            this.p.scale(-s, s)
            this.p.image(this.brush, 0, 0);
            this.p.pop();
            touch.count++;
        }
    }

    makeBrush() {
        this.brush.clear();
        this.brush.noFill();
        this.p.noiseSeed(this.p.random(-100000, 100000));
        for (var i = 0; i < 10; i++) {
            this.brush.strokeWeight(this.p.random() * 2);
            this.brush.stroke(this.p.random(), 0.5, 1, this.p.random() * 0.5);
            this.brush.ellipse(this.p.random(0, this.brush.width), this.p.random(0, this.brush.height), this.p.random(10, this.brush.width));
        }
        this.p.noStroke();
        this.p.fill(0, 0, 0.1, 1);
        this.p.clear();
        this.p.rect(0, 0, this.canvasWidth, this.canvasHeight, 50);
    }
}