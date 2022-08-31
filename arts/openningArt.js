class OpenningArt extends Art {
    constructor() {
        super();
        this.backColor = { r: 255, g: 255, b: 255 }
    }

    form() {
    }

    setup() {
        this.intervalX = this.canvasWidth / 4;
        this.intervalY = this.canvasHeight / 3;

        this.red = 100;
        this.green = 100;
        this.blue = 100;

        this.red_ = 100;
        this.green_ = 100;
        this.blue_ = 100;

        this.door = {
            y: this.canvasHeight,
            vy: 0,
            ay: 10
        };

        this.mouseY = 0;
        this.mouseInterval = 0;
        this.clicked = false;

        this.timer = new Timer(10);
    }

    update() {
        super.update();
        let p = this.p;
        
        if (p.mouseIsPressed) {
            if (this.clicked) {
                this.mouseInterval = this.mouseY - p.mouseY;
            } else {
                this.clicked = true;
                this.mouseY = p.mouseY;
               this.timer = new Timer(500);
            }
        } else {
            this.clicked = false;
            if (this.mouseInterval !== 0) {
                this.door.y -= this.mouseInterval;
                this.mouseInterval = 0;
            }

            this.door.vy += this.door.ay;
            this.door.y += this.door.vy;

            if (this.door.y >= this.canvasHeight) {
                this.door.y = this.canvasHeight;
                this.door.vy = -this.door.vy*0.7;
                if (this.timer.timeover(this.getDeltaTime())) {
                    this.intervalX = p.random(this.canvasWidth*0.1, this.canvasWidth*0.4);
                    this.intervalY = p.random(this.canvasHeight*0.1, this.canvasHeight*0.4);
                    this.red = p.random(100, 230);
                    this.green = p.random(100, 230);
                    this.blue = p.random(100, 230);

                    this.red_ = p.random(0, 255);
                    this.green_ = p.random(0, 255);
                    this.blue_ = p.random(0, 255);
                }
            } else {
            }
        }

        this.render();
    }

    initTouch(touch) {
    }

    updateTouch(touch) {
    }

    render() {
        let p = this.p;

        let red = this.red;
        let green = this.green;
        let blue = this.blue;
        let interval = 100;

        p.background(p.color(red-interval+25, green-interval+25, blue-interval+25));
        
        p.strokeWeight(1);
        // top
        for (let i = 0; i < this.intervalY; i++) {
            let ratio = i / this.intervalY;
            let x = this.intervalX * ratio;
            let y = i;

            p.stroke(p.lerpColor(p.color(red, green, blue), p.color(red-interval+20, green-interval+20, blue-interval+20), ratio));
            p.line(x, y, this.canvasWidth - x, y);
        }
        
        // bottom
        for (let i = 0; i < this.intervalY; i++) {
            let ratio = i / (this.intervalY);
            let x = this.intervalX * ratio;
            let y = i;
            
            p.stroke(p.lerpColor(p.color(red, green, blue), p.color(this.red_, this.green_, this.blue_), ratio));
            p.line(x, this.canvasHeight - y, this.canvasWidth - x, this.canvasHeight - y);
        }

        // left
        for (let i = 0; i < this.intervalX; i++) {
            let ratio = i / this.intervalX;
            let y = this.intervalY * ratio;
            let x = i;
            
            p.stroke(p.lerpColor(p.color(red, green, blue), p.color(red-interval+15, green-interval+15, blue-interval+15), ratio));
            p.line(x, y, x, this.canvasHeight - y);
        }

        // right
        for (let i = 0; i < this.intervalX; i++) {
            let ratio = i / this.intervalX;
            let y = this.intervalY * ratio;
            let x = i;
            
            p.stroke(p.lerpColor(p.color(red, green, blue), p.color(red-interval+10, green-interval+10, blue-interval+10), ratio));
            p.line(this.canvasWidth - x, y, this.canvasWidth - x, this.canvasHeight - y);
        }

        
        this.rect = [
            { x: this.intervalX, y: this.intervalY },
            { x: this.canvasWidth - this.intervalX, y: this.intervalY },
            { x: this.canvasWidth - this.intervalX, y: this.canvasHeight - this.intervalY },
            { x: this.intervalX, y: this.canvasHeight - this.intervalY }
        ];


        p.noStroke();
        p.fill(200, 200, 200);
        p.rect(0, 0, this.canvasWidth, this.door.y - this.mouseInterval);

        p.stroke(100, 100, 100);
        p.strokeWeight(5);
        for (let i = 0; i < 10; i++) {
            p.line(0, this.door.y - this.mouseInterval - this.canvasHeight * (i/10), this.canvasWidth, this.door.y - this.mouseInterval - this.canvasHeight * (i/10));
        }
    }
}