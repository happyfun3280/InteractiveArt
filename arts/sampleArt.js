class SampleArt extends Art {
    constructor() {
        super();
        this.backColor = { r: 0, g: 0, b: 0 }
    }

    setup() {
        this.movers = [];
        this.movers.push({
            mass: 1,
            position: this.p.createVector(30, 40),
            velocity: this.p.createVector(0, 0),
            acceleration: this.p.createVector(0, 0),
            t: 0
        });
        this.r = 0;
        this.g = 0;
        this.b = 0;

        this.timeLimit = 10000;
        this.numberLimit = 100;
    }

    update() {
        this.p.background(this.backColor.r, this.backColor.g, this.backColor.b);
        super.update();

        for (let i = 0; i < this.movers.length; i++) {
            let wind = this.p.createVector(0.5, 0);
            let gravity = this.p.createVector(0, 3 * this.movers[i].mass);
            let c = 0.03;
            let friction = this.movers[i].velocity.copy();
            friction.mult(-1);
            friction.normalize();
            friction.mult(c);

            this.movers[i].acceleration.add(p5.Vector.div(friction, this.movers[i].mass));
            this.movers[i].acceleration.add(p5.Vector.div(wind, this.movers[i].mass));
            this.movers[i].acceleration.add(p5.Vector.div(gravity, this.movers[i].mass));


            this.movers[i].velocity.add(this.movers[i].acceleration);
            this.movers[i].position.add(this.movers[i].velocity);
            this.movers[i].acceleration.mult(0);

            this.p.noStroke();
            this.p.fill(this.r, this.g, this.b);
            this.p.ellipse(this.movers[i].position.x, this.movers[i].position.y, this.movers[i].mass * 10, this.movers[i].mass * 10);

            if (this.movers[i].position.x > this.canvasWidth) {
                this.movers[i].position.x = this.canvasWidth;
                this.movers[i].velocity.x *= -1;
            } else if (this.movers[i].position.x < 0) {
                this.movers[i].velocity.x *= -1;
                this.movers[i].position.x = 0;
            }
            if (this.movers[i].position.y > this.canvasHeight) {
                this.movers[i].velocity.y *= -1;
                this.movers[i].position.y = this.canvasHeight;
            }

            this.movers[i].t += this.getDeltaTime();
            if (this.movers[i].t > this.timeLimit) {
                this.movers.splice(i, 1);
                i--;
                continue;
            }
        }
    }

    initTouch(touch) {
    }

    updateTouch(touch) {

        if (this.movers.length < this.numberLimit) {
            this.movers.push({
                mass: this.p.random(2, 7),
                position: this.p.createVector(touch.x, touch.y),
                velocity: this.p.createVector(0, 0),
                acceleration: this.p.createVector(0, 0),
                t: 0
            });
        }

        this.r = this.p.random(0, 255);
        this.g = this.p.random(0, 255);
        this.b = this.p.random(0, 255);
    }
}