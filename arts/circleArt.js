class CircleArt extends Art {
    constructor(red, green, blue) {
        super(red, green, blue);

        this.ellipseList = [];
        this.MAXSIZE = 100;

        this.createTimer = new Timer(30);
        this.clickTimer = new Timer(50);
    }

    getEllipses() { return this.ellipseList; }

    setup(p) {
        super.setup(p);
        p.noStroke();
    }

    draw(p) {
        super.draw(p);
        if (this.createTimer.timeover(this.getDeltaTime())) {
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
            if (this.clickTimer.timeover(this.getDeltaTime())) {
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

        for (let i = 0; i < this.getEllipses().length; i++) {
            let e = this.getEllipses()[i];

            p.fill(e.red, e.green, e.blue);
            p.ellipse(e.x, e.y, e.w, e.h);
            e.w++;
            e.h++;
            if (e.w > this.MAXSIZE) {
                this.getEllipses().splice(i, 1);
                i--;
                continue;
            }
        }
    }
}