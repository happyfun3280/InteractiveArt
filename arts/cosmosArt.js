class CosmosArt extends Art {
    constructor() {
        super();
        this.backColor = { r: 0, g: 0, b: 0 };
    }

    form() {
        this.pushSetting(this.p.createDiv("Size : "), 30);
        this.sizeSlider = this.p.createSlider(1, 100, 5);
        this.pushSetting(this.sizeSlider, 40);
        
        this.pushSetting(this.p.createDiv("Color : "), 30);
        this.colorSlider = this.p.createSlider(0, 255, 255);
        this.pushSetting(this.colorSlider, 40);

        this.pushSetting(this.p.createDiv("Force : "), 30);
        this.forceSlider = this.p.createSlider(1, 20, 5);
        this.pushSetting(this.forceSlider, 40);

        this.pushSetting(this.p.createDiv("Number : "), 30);
        this.numberSlider = this.p.createSlider(1, 500, 200);
        this.pushSetting(this.numberSlider, 40);
        this.numberSlider.input(() => {
            this.asteroids = [];
        });
    }

    setup() {
        this.asteroids = [];
    }

    update() {
        super.update();
        this.p.background(0);
        
        this.createAsteroids();
        this.updateAsteroids();
        this.renderAsteroids();
        this.colideAsteroids();
    }

    initTouch() {
        
    }

    updateTouch(touch) {
        for (let i = 0; i < this.asteroids.length; i++) {
            let asteroid = this.asteroids[i];
            let distance = Math.sqrt(Math.pow(touch.x-asteroid.x, 2) + Math.pow(touch.y-asteroid.y, 2));
            asteroid.vx += ((touch.x-asteroid.x) / (distance*20)) * this.forceSlider.value();
            asteroid.vy += ((touch.y-asteroid.y) / (distance*20)) * this.forceSlider.value();
        }
    }

    createAsteroids() {
        for (let i = this.asteroids.length-1; i < this.numberSlider.value(); i++) {
            this.asteroids.push({
                x: this.p.random(0, this.canvasWidth),
                y: this.p.random(0, this.canvasHeight),
                vx: this.p.random(-5, 5),
                vy: this.p.random(-5, 5)
            });
        }
    }

    updateAsteroids() {
        for (let i = 0; i < this.asteroids.length; i++) {
            let asteroid = this.asteroids[i];

            asteroid.x += asteroid.vx;
            asteroid.y += asteroid.vy;
        }
    }

    renderAsteroids() {
        this.p.noStroke();
        this.p.fill(this.colorSlider.value());
        for (let i = 0; i < this.asteroids.length; i++) {
            let asteroid = this.asteroids[i];
            this.p.circle(asteroid.x, asteroid.y, this.sizeSlider.value());
        }
    }

    colideAsteroids() {
        for (let i = 0; i < this.asteroids.length; i++) {
            let asteroid = this.asteroids[i];
            if (asteroid.x < 0 || asteroid.x > this.canvasWidth || asteroid.y < 0 || asteroid.y > this.canvasHeight) {
                this.asteroids.splice(i, 1);
                i--;
                continue;
            }
        }
    }
}