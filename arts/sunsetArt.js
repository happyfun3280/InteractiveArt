class SunsetArt extends Art {
    constructor() {
        super();
        this.backColor = { r: 0, g: 0, b: 0 }
    }

    form() {
    }

    setup() {
        this.cloudSize = 60;
        this.p.noStroke();
    }

    update() {
        super.update();
        
        this.drawSunset();
        this.drawSub();
        this.drawCloud(this.p.mouseX,this.p.mouseY)
        this.p.fill(50,50,50);
        this.p.rect(0,this.canvasHeight*4/5,this.canvasWidth,this.canvasHeight);
    }

    drawCloud(x, y) {
        let p = this.p;
        p.fill(50 + (200 - 200 * y / this.canvasHeight), 50 + (200 - 200 * y / this.canvasHeight), 50 + (200 - 200 * y / this.canvasHeight));
        p.ellipse(x, y, this.cloudSize, this.cloudSize);
        p.ellipse(x + 25, y - 25, this.cloudSize, this.cloudSize);
        p.ellipse(x + 50, y, this.cloudSize, this.cloudSize);
        p.ellipse(x - 25, y - 25, this.cloudSize, this.cloudSize);
        p.ellipse(x - 50, y, this.cloudSize, this.cloudSize);
    }

    drawSub() {
        var color = 755 - this.p.mouseY / this.canvasHeight * 755;
        var R, G, B;
        if (color >= 255) {
            R = 255;
            color -= 255;
        } else {
            R = color;
            color = 0;
        }
        if (color >= 255) {
            G = 255;
            color -= 255;
        } else {
            G = color;
            color = 0;
        }
        B = color;
        this.p.fill(R, G, B);
        this.p.ellipse(this.canvasWidth / 2, this.p.mouseY, 180, 180)
    }

    drawSunset() {
        for (let i=0; i*20 <= this.canvasHeight; i++) {
            this.p.fill(4*i+(255-255*this.p.mouseY/this.canvasHeight),20,8*i-(100*this.p.mouseY/this.canvasHeight));
            this.p.rect(0,20*i,this.canvasWidth,20*(i+1));
        }
    }
}