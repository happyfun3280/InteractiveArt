class CircleArt extends Art {
    constructor(red, green, blue, settings) {
        super(red, green, blue);

        this.circleList = [];

        this.timer = new Timer(30);
        this.MAX_SIZE = 100;
    }

    setup(p) {
        this.p.noStroke();
    }

    update() {
        super.update();

        let p = this.p;

        if (this.timer.timeover(this.getDeltaTime())) {
            this.circleList.push({
                x: p.random(0, this.canvasWidth),
                y: p.random(0, this.canvasHeight),
                size: 0,
                r: 0,
                g: 0,
                b: p.random(0, 256)
            });
        }

        for (let i = 0; i < this.circleList.length; i++) {
            let circle = this.circleList[i];

            p.fill(circle.r, circle.g, circle.b);
            p.ellipse(circle.x, circle.y, circle.size);
            circle.size++;
            if (circle.size > this.MAX_SIZE) {
                this.circleList.splice(i, 1);
                i--;
                continue;
            }
        }
    }

    
    initTouch(touch) {
        touch.timer = new Timer(100);
        switch (touch.id%3) {
        case 0:
            touch.g = 0;
            touch.b = 0;
            break;
        case 1:
            touch.g = 100;
            touch.b = 0;
            break;
        case 2:
            touch.g = 0;
            touch.b = 100;
            break;
        default:
            touch.g = 0;
            touch.b = 0;
            break;
        }
    }

    updateTouch(touch) {
        if (touch.timer.timeover(this.getDeltaTime())) {
            this.circleList.push({
                x: touch.x,
                y: touch.y,
                size: 0,
                r: this.p.random(0, 256),
                g: touch.g,
                b: touch.b
            });
        }
    }
}