class ButtonArt extends Art {
    constructor(red, green, blue) {
        super(red, green, blue);

        this.btnList = [];
    }

    form() {
        this.pushSetting(this.p.createDiv("Button Width : "), 30);
        this.btnWidthSlider = this.p.createSlider(50, 300, 200);
        this.pushSetting(this.btnWidthSlider, 40);
        this.btnWidthSlider.input(() => this.initBtn());

        this.pushSetting(this.p.createDiv("Button Height : "), 30);
        this.btnHeightSlider = this.p.createSlider(50, 300, 100);
        this.pushSetting(this.btnHeightSlider, 40);
        this.btnHeightSlider.input(() => this.initBtn());

        this.pushSetting(this.p.createDiv("Gap : "), 30);
        this.gapSlider = this.p.createSlider(30, 200, 40);
        this.pushSetting(this.gapSlider, 40);
        this.gapSlider.input(() => this.initBtn());

        this.pushSetting(this.p.createDiv("Length : "), 30);
        this.lengthSlider = this.p.createSlider(20, 200, 100);
        this.pushSetting(this.lengthSlider, 40);
        this.lengthSlider.input(() => this.initBtn());

        this.pushSetting(this.p.createDiv("Speed : "), 30);
        this.speedSlider = this.p.createSlider(100, 3000, 1000);
        this.pushSetting(this.speedSlider, 40);
        
        this.pushSetting(this.p.createDiv("Red Color : "), 30);
        this.redSlider = this.p.createSlider(0, 255, 255);
        this.pushSetting(this.redSlider, 40);
        this.pushSetting(this.p.createDiv("Green Color : "), 30);
        this.greenSlider = this.p.createSlider(0, 255, 100);
        this.pushSetting(this.greenSlider, 40);
        this.pushSetting(this.p.createDiv("Blue Color : "), 30);
        this.blueSlider = this.p.createSlider(0, 255, 100);
        this.pushSetting(this.blueSlider, 40);
    }

    setup() {
        this.initBtn();
    }

    update() {
        super.update();

        let p = this.p;

        p.background(this.bgc.r, this.bgc.g, this.bgc.b);

        for (let btn of this.btnList) {
            if (!btn.pushed) continue;

            btn.t += this.getDeltaTime();

            switch (btn.scene) {
            case 0:
                if (btn.t > btn.tLimit) {
                    btn.t = 0;
                    btn.tLimit = this.speedSlider.value();
                    btn.scene++;
                }
                break;
            case 1:
                if (btn.t > btn.tLimit) {
                    btn.t = 0;
                    btn.tLimit = this.speedSlider.value();
                    btn.scene++;
                } else {
                    btn.y = btn.originY + this.lengthSlider.value() * btn.t / btn.tLimit;
                }
                break;
            case 2:
                if (btn.t > btn.tLimit) {
                    btn.t = 0;
                    btn.tLimit = this.speedSlider.value();
                    btn.scene++;
                } else {
                    btn.y = btn.originY + this.lengthSlider.value();
                }
                break;
            case 3:
                if (btn.t > btn.tLimit) {
                    btn.t = 0;
                    btn.tLimit = 1000;
                    btn.scene++;
                } else {
                    btn.y = btn.originY + this.lengthSlider.value() * (1 - btn.t / btn.tLimit);
                }
                break;
            }

            if (btn.scene === 4) {
                btn.pushed = false;
                btn.t = 0;
                btn.tLimit = 0;
                btn.scene = 0;

                btn.x = btn.originX;
                btn.y = btn.originY;
            }
        }

        for (let i = 0; i < this.btnList.length; i++) {
            let btn = this.btnList[i];
            
            p.noStroke();

            p.fill(this.redSlider.value()*(1-i/this.btnList.length), this.greenSlider.value()*(i/this.btnList.length), this.blueSlider.value()*(i/this.btnList.length));
            p.beginShape();
            p.vertex(btn.x - this.btnWidthSlider.value()/2, btn.y);
            p.vertex(btn.x, btn.y - this.btnHeightSlider.value()/2);
            p.vertex(btn.x + this.btnWidthSlider.value()/2, btn.y);
            p.vertex(btn.x, btn.y + this.btnHeightSlider.value()/2);
            p.endShape(p.CLOSE);
            
            p.fill(this.redSlider.value()*(1-i/this.btnList.length)*2/3, this.greenSlider.value()*(i/this.btnList.length)*2/3, this.blueSlider.value()*(i/this.btnList.length)*2/3);
            p.beginShape();
            p.vertex(btn.x - this.btnWidthSlider.value()/2, btn.y);
            p.vertex(btn.originX - this.btnWidthSlider.value()/2, btn.originY + this.lengthSlider.value());
            p.vertex(btn.originX, btn.originY + this.btnHeightSlider.value()/2 + this.lengthSlider.value());
            p.vertex(btn.x, btn.y + this.btnHeightSlider.value()/2);
            p.endShape(p.CLOSE);
            
            p.fill(this.redSlider.value()*(1-i/this.btnList.length)*1/3, this.greenSlider.value()*(i/this.btnList.length)*1/3, this.blueSlider.value()*(i/this.btnList.length)*1/3);
            p.beginShape();
            p.vertex(btn.x + this.btnWidthSlider.value()/2, btn.y);
            p.vertex(btn.originX + this.btnWidthSlider.value()/2, btn.originY + this.lengthSlider.value());
            p.vertex(btn.originX, btn.originY + this.btnHeightSlider.value()/2 + this.lengthSlider.value());
            p.vertex(btn.x, btn.y + this.btnHeightSlider.value()/2);
            p.endShape(p.CLOSE);

            //p.stroke(200, 50, 50);
            //p.noFill();
            //p.circle(btn.x, btn.y, (this.btnWidthSlider.value() < this.btnHeightSlider.value()) ? this.btnWidthSlider.value()*2 : this.btnHeightSlider.value()*2);
        }
    }

    initTouch(touch) {
    }

    updateTouch(touch) {
        for (let btn of this.btnList) {
            if (btn.pushed) continue;
            let distance = Math.sqrt(Math.pow(btn.x - touch.x, 2) + Math.pow(btn.y - touch.y, 2));
            if (distance < ((this.btnWidthSlider.value() < this.btnHeightSlider.value()) ? this.btnWidthSlider.value() : this.btnHeightSlider.value())) {
                btn.pushed = true;
            }
        }
    }

    initBtn() {
        this.btnList = [];

        let curX = -(this.btnWidthSlider.value()/2+this.gapSlider.value()/2);
        let curY = -this.btnHeightSlider.value()/2;
        let line = 0;

        while (true) {
            this.btnList.push({
                x: curX,
                y: curY,
                originX: curX,
                originY: curY,
                
                pushed: false,
                scene: 0,
                t: 0,
                tLimit: 0,
            });

            curX += this.btnWidthSlider.value() + this.gapSlider.value();

            if (curX - this.btnWidthSlider.value()/2 > this.canvasWidth) {
                line++;
                if (line % 2 == 0) {
                    curX = -(this.btnWidthSlider.value()/2+this.gapSlider.value()/2);
                } else {
                    curX = 0;
                }
                curY += this.btnHeightSlider.value()/2 + this.gapSlider.value()/4;
                if (curY - this.btnHeightSlider.value()/2 > this.canvasHeight) {
                    break;
                }
            }
        }

    }
}