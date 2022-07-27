class CosmosArt extends Art {
    constructor(red, green, blue) {
        super(red, green, blue);

        this.ASTEROID_MAX = 40;
        this.ASTEROID_VELOCITY_RANGE = 5;
        this.PLANET_MAX_SIZE = 200;
        this.asteroidList = [];

        this.planetList = [];
        this.planetSize = 0;
        this.currPlanet = { x:0, y:0, s:0, r:0, g:0, b:0 };
    }

    setup(p) {
        super.setup(p);

        for (let i = 0; i < this.ASTEROID_MAX; i++) {
            this.asteroidList.push({
                x: p.random(0, Gallery.getInst().canvasWidth),
                y: p.random(0, Gallery.getInst().canvasHeight),
                vx: p.random(-this.ASTEROID_VELOCITY_RANGE, this.ASTEROID_VELOCITY_RANGE),
                vy: p.random(-this.ASTEROID_VELOCITY_RANGE, this.ASTEROID_VELOCITY_RANGE)
            })
        }

        p.noStroke();
    }

    draw(p) {
        super.draw(p);
        
        p.background(0);
        for (let i = 0; i < this.ASTEROID_MAX; i++) {
            this.asteroidList[i].x += this.asteroidList[i].vx;
            this.asteroidList[i].y += this.asteroidList[i].vy;
        }

        this.checkWallCollision(p);
        this.checkPlanetCollision(p);
        this.updateAsteroids();

        if (this.pressed) {
            this.currPlanet = {
                x: p.mouseX,
                y: p.mouseY,
                s: 0,
                r: p.random(50, 200),
                g: 0,
                b: p.random(50, 200)
            }
        }

        if (this.held) {
            this.currPlanet.s += 1;
            if (this.currPlanet.s > this.PLANET_MAX_SIZE) this.currPlanet.s = this.PLANET_MAX_SIZE;
        }

        if (this.released) {
            this.planetList.push(this.currPlanet);
        }

        p.fill(255);
        for (let i = 0; i < this.ASTEROID_MAX; i++) {
            p.circle(this.asteroidList[i].x, this.asteroidList[i].y, 3, 3);
            //stroke(200, 0, 0);
            //line(asteroidList[i].x, asteroidList[i].y, asteroidList[i].x + asteroidList[i].vx * 3, asteroidList[i].y + asteroidList[i].vy * 3);
        }

        p.fill(this.currPlanet.r, this.currPlanet.g, this.currPlanet.b);
        p.noStroke();
        p.circle(this.currPlanet.x, this.currPlanet.y, this.currPlanet.s, this.currPlanet.s);
        for (let i = 0; i < this.planetList.length; i++) {    
            p.fill(this.planetList[i].r, this.planetList[i].g, this.planetList[i].b);
            p.circle(this.planetList[i].x, this.planetList[i].y, this.planetList[i].s, this.planetList[i].s);
        }
    }

    checkWallCollision(p) {
        for (let i = 0; i < this.ASTEROID_MAX; i++) {
            if (this.asteroidList[i].x < 0 || this.asteroidList[i].x > Gallery.getInst().canvasWidth || this.asteroidList[i].y < 0 || this.asteroidList[i].y > Gallery.getInst().canvasHeight) {
                this.asteroidList[i] = {
                    x: p.random(0, Gallery.getInst().canvasWidth),
                    y: p.random(0, Gallery.getInst().canvasHeight),
                    vx: p.random(-this.ASTEROID_VELOCITY_RANGE, this.ASTEROID_VELOCITY_RANGE),
                    vy: p.random(-this.ASTEROID_VELOCITY_RANGE, this.ASTEROID_VELOCITY_RANGE)
                }
            }
        }
    }

    checkPlanetCollision(p) {
        for (let i = 0; i < this.ASTEROID_MAX; i++) {
            for (let j = 0; j < this.planetList.length; j++) {
                let distance = Math.sqrt(Math.pow((this.planetList[j].x - this.asteroidList[i].x), 2) + Math.pow((this.planetList[j].y - this.asteroidList[i].y), 2));
                if (distance < this.planetList[j].s / 2) {
                    this.asteroidList[i] = {
                        x: p.random(0, Gallery.getInst().canvasWidth),
                        y: p.random(0, Gallery.getInst().canvasHeight),
                        vx: p.random(-this.ASTEROID_VELOCITY_RANGE, this.ASTEROID_VELOCITY_RANGE),
                        vy: p.random(-this.ASTEROID_VELOCITY_RANGE, this.ASTEROID_VELOCITY_RANGE)
                    }
                }
            }
        }
    }

    updateAsteroids() {
        for (let i = 0; i < this.ASTEROID_MAX; i++) {
            for (let j = 0; j < this.planetList.length; j++) {
                let distance = Math.sqrt(Math.pow((this.planetList[j].x - this.asteroidList[i].x), 2) + Math.pow((this.planetList[j].y - this.asteroidList[i].y), 2));
                this.asteroidList[i].vx += (this.planetList[j].x - this.asteroidList[i].x) / distance / 1000 * this.planetList[j].s;
                this.asteroidList[i].vy += (this.planetList[j].y - this.asteroidList[i].y) / distance / 1000 * this.planetList[j].s;
            }
        }
    }
}