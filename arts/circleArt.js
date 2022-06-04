class CircleArt extends Art {
    constructor(red, green, blue, settings) {
        super(red, green, blue);

        this.ellipseList = [];

        if (settings === undefined) {
            this.maxSize = 100;
            this.blueTimer = new Timer(30);
            this.redTimer = new Timer(50);
        } else {
            this.maxSize = (settings.maxSize === undefined) ? 100 : settings.maxSize;
            this.blueTimer = new Timer((settings.blueTime === undefined) ? 30 : settings.blueTime);
            this.redTimer = new Timer((settings.redTime === undefined) ? 50 : settings.redTime);
        }
    }

    getEllipses() { return this.ellipseList; }

    setup(p) {
        super.setup(p);
        p.noStroke();
    }

    draw(p) {
        super.draw(p);
        if (this.blueTimer.timeover(this.getDeltaTime())) {
            this.getEllipses().push({
                x: Math.floor(Math.random() * Gallery.getInst().canvasWidth),
                y: Math.floor(Math.random() * Gallery.getInst().canvasHeight),
                w: 0,
                h: 0,
                red: 0,
                green: 0,
                blue: Math.floor(Math.random() * 256)
            });
        }

        if (p.mouseIsPressed) {
            if (this.redTimer.timeover(this.getDeltaTime())) {
                this.getEllipses().push({
                    x: p.mouseX,
                    y: p.mouseY,
                    w: 0,
                    h: 0,
                    red: Math.floor(Math.random() * 256),
                    green: 0,
                    blue: 0
                });
            }
        }

        let maxSize = Gallery.getInst().canvasWidth / 8;
        for (let i = 0; i < this.getEllipses().length; i++) {
            let e = this.getEllipses()[i];

            p.fill(e.red, e.green, e.blue);
            p.ellipse(e.x, e.y, e.w, e.h);
            e.w++;
            e.h++;
            if (e.w > maxSize) {
                this.getEllipses().splice(i, 1);
                i--;
                continue;
            }
        }
    }
}