class UmbrellaArt extends Art {
    constructor() {
        super();
        this.backColor = { r: 188, g: 200, b: 209 };
    }

    form() {
        this.pushSetting(this.p.createDiv("Raindrop Number : "), 30);
        this.raindropNumberSlider = this.p.createSlider(1, 200, 100);
        this.pushSetting(this.raindropNumberSlider, 40);

        this.pushSetting(this.p.createDiv("Color : "), 30);
        this.colorSlider = this.p.createSlider(0, 255, 100);
        this.pushSetting(this.colorSlider, 40);

        this.pushSetting(this.p.createDiv("Bold : "), 30);
        this.boldSlider = this.p.createSlider(1, 10, 3);
        this.pushSetting(this.boldSlider, 40);
       
        this.pushSetting(this.p.createDiv("Length : "), 30);
        this.lengthSlider = this.p.createSlider(5, 20, 10);
        this.pushSetting(this.lengthSlider, 40);

        this.pushSetting(this.p.createDiv("Speed : "), 30);
        this.speedSlider = this.p.createSlider(5, 20, 5);
        this.pushSetting(this.speedSlider, 40);
    }

    setup() {
        this.width = this.canvasWidth / 5;
        this.height = this.width/3;
        this.stickLength = this.width / 3;

        this.wind = 1;
        this.changeWind = 1;
        this.windTimer = new Timer(100);

        this.raindrops = [];
        this.initRaindrops();

        this.groundHeight = 50;

        this.wettings = [];

        this.buildings = [];
        this.initBuildings();
    }

    update() {
        this.p.background(this.backColor.r, this.backColor.g, this.backColor.b);
        this.renderBuildings();
        super.update();


        this.createRaindrops();
        this.updateRaindrops();
        this.colideRaindrops();
        this.renderRaindrops();

        this.p.noStroke();
        this.p.fill(100, 70, 40);
        this.p.rect(0, this.canvasHeight - this.groundHeight, this.canvasWidth, this.canvasHeight);

        this.updateWettings();
        this.renderWettings();

        if (this.wind < this.changeWind) {
            this.wind += 0.1;
        } else {
            this.wind -= 0.1;
        }

        if (this.windTimer.timeover(this.getDeltaTime())) {
            this.windTimer = new Timer(this.p.random(0, 5000));
            this.changeWind = this.p.random(-5, 5);
        }

    }

    initTouch(touch) {
    }

    updateTouch(touch) {
        this.renderUmbrella(touch.x, touch.y);
        // this.renderColideRange(touch.x, touch.y);

        for (let i = 0; i < this.raindrops.length; i++) {
            let raindrop = this.raindrops[i];

            if (raindrop.y > touch.y - this.stickLength) continue;
            
            let distance = Math.sqrt(Math.pow(raindrop.x - touch.x, 2) + Math.pow(raindrop.y - (touch.y - this.stickLength + this.stickLength/2), 2));
            if (distance < this.width/2) {
                this.raindrops.splice(i, 1);
                i--;
                continue;
            }
        }
    }

    initRaindrops() {
        for (let i = this.raindrops.length-1; i < this.raindropNumberSlider.value(); i++) {
            this.raindrops.push({
                x: this.p.random(0, this.canvasWidth),
                y: this.p.random(0, this.canvasHeight),
                vx: 0,
                vy: this.p.random(this.speedSlider.value(), 10 + this.speedSlider.value())
            });
        }
    }

    createRaindrops() {
        for (let i = this.raindrops.length-1; i < this.raindropNumberSlider.value(); i++) {
            this.raindrops.push({
                x: this.p.random(-Math.abs(this.changeWind*100), this.canvasWidth+Math.abs(this.changeWind*100)),
                y: 0,
                vx: 0,
                vy: this.p.random(this.speedSlider.value(), 10 + this.speedSlider.value())
            });
        }
    }

    updateRaindrops() {
        for (let i = 0; i < this.raindrops.length; i++) {
            let raindrop = this.raindrops[i];

            raindrop.x += raindrop.vx + this.wind;
            raindrop.y += raindrop.vy;
        }
    }

    renderRaindrops() {
        this.p.noFill();
        this.p.stroke(0, 0, this.colorSlider.value());
        this.p.strokeCap(this.p.ROUND);
        this.p.strokeWeight(this.boldSlider.value());
        for (let i = 0; i < this.raindrops.length; i++) {
            let raindrop = this.raindrops[i];

            this.p.line(raindrop.x, raindrop.y-this.lengthSlider.value(), raindrop.x, raindrop.y);
        }
    }

    colideRaindrops() {
        for (let i = 0; i < this.raindrops.length; i++) {
            let raindrop = this.raindrops[i];

            if (raindrop.y > this.canvasHeight - this.groundHeight) {
                this.wettings.push({
                    x: raindrop.x,
                    t: 0,
                    tLimit: 1000
                });
                this.raindrops.splice(i, 1);
                i--;
                continue;
            }
        }
    }

    renderColideRange(x, y) {
        this.p.noFill();
        this.p.strokeWeight(1);
        this.p.stroke(200, 0, 0);
        this.p.circle(x, y - this.stickLength + this.stickLength/2, this.width);
        this.p.line(x-this.width/2, y-this.stickLength, x+this.width/2, y-this.stickLength);
    }

    updateWettings() {
        for (let i = 0; i < this.wettings.length; i++) {
            let wetting = this.wettings[i];

            wetting.t += this.getDeltaTime();

            if (wetting.t > wetting.tLimit) {
                this.wettings.splice(i, 1);
                i--;
                continue;
            }
        }
    }

    renderWettings() {
        for (let i = 0; i < this.wettings.length; i++) {
            let wetting = this.wettings[i];
            this.p.fill(70, 60, 30, 255 * (1-wetting.t/wetting.tLimit));
            this.p.arc(wetting.x, this.canvasHeight - this.groundHeight, 50, 50, 0, this.p.PI, this.p.PIE);
        }
    }

    renderUmbrella(px, py) {
        let p = this.p;
        p.noFill();
        p.stroke(0);
        p.strokeWeight(7);

        let x = px;
        let y = py-this.stickLength;

        p.line(x, y - this.height, x - this.width/2, y);
        p.line(x, y - this.height, x + this.width/2, y);

        for (let i = 0; i < 3; i++) {
            p.bezier(
                x - this.width/2 + i*this.width/3, y,
                x - this.width/2 + this.width/3/2 + i*this.width/3, y-this.height/5,
                x - this.width/2 + this.width/3/2 + i*this.width/3, y-this.height/5,
                x - this.width/2 + this.width/3 + i*this.width/3, y
            );

            p.line(x, y - this.height, x - this.width/2 + this.width/3 + i*this.width/3, y);
        }

        p.line(x, y, x, y + this.stickLength);
        p.bezier(
            x, y + this.stickLength,
            x, y + this.stickLength + 20,
            x + 20, y + this.stickLength + 20,
            x + 20, y + this.stickLength
        );
    }

    initBuildings() {

        for (let i = 0; i < 3; i++) {
            let curX = 0;

            while (true) {
                let width = this.p.random(20, 150);
                let height = this.p.random(300-i*100, 400-i*100);

                this.buildings.push({
                    x: curX,
                    w: width,
                    h: height,
                    r: 160 - i*30,
                    g: 160 - i*30,
                    b: 170 - i*30
                });
    
                curX += width;
    
                if (curX > this.canvasWidth) break;
            }
        }
    }

    renderBuildings() {
        this.p.noStroke();
        for (let i = 0; i < this.buildings.length; i++) {
            let building = this.buildings[i];
            this.p.fill(building.r, building.g, building.b);
            this.p.rect(building.x, this.canvasHeight - this.groundHeight - building.h, building.w, building.h);
        }
    }
}