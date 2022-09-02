class SpiralArt extends Art {
    constructor() {
        super();
        this.backColor = { r: 30, g: 30, b: 30 }
    }

    form() {
    }

    setup() {
        this.p.background(this.backColor.r, this.backColor.g, this.backColor.b);
    }

    update() {
        super.update();

    }

    initTouch(touch) {
        touch.a = 0 ;
        touch.r = 150;
        touch.rr = this.p.random(0, 255);
        touch.rg = this.p.random(0, 255);
        touch.rb = this.p.random(0, 255);
        touch.s = Math.floor(this.p.random(1, 5));
        touch.rs = Math.floor(this.p.random(12, 24));
        
        switch (touch.s) {
            case 1:
                touch.a = 0;
                touch.r = this.p.random(100, 300);
                break;
            case 2:
                touch.a = 0;
                touch.r = this.p.random(100, 300);
                break;
            case 3:
                touch.a = 360;
                touch.r = 10;
                break;
            case 4:
                touch.a = 360;
                touch.r = 10;
                break;
        }
    }

    updateTouch(touch) {
        if (touch.s == 1) {
            this.p.strokeWeight(touch.rs);
            this.p.stroke(touch.rr, touch.rg, touch.rb);
            let x = touch.r * Math.cos(touch.a);
            let y = touch.r * Math.sin(touch.a);
            this.p.point(touch.x + x, touch.y + y);
            touch.a += 0.08;
            touch.r -= 0.4;
        }
        else if (touch.s == 2) {
            this.p.strokeWeight(touch.rs);
            this.p.stroke(touch.rr, touch.rg, touch.rb);
            let x = touch.r * Math.cos(-touch.a);
            let y = touch.r * Math.sin(-touch.a);
            this.p.point(touch.x + x, touch.y + y);
            touch.a += 0.08;
            touch.r -= 0.4;
        }
        else if (touch.s == 3) {
            this.p.stroke(touch.rr, touch.rg, touch.rb);
            this.p.strokeWeight(touch.rs);
            let x = touch.r * Math.cos(touch.a);
            let y = touch.r * Math.sin(touch.a);
            this.p.point(touch.x + x, touch.y + y);
            touch.a -= 0.08;
            touch.r += 0.4;
        }
        else if (touch.s == 4) {
            this.p.strokeWeight(touch.rs);
            this.p.stroke(touch.rr, touch.rg, touch.rb);
            let x = touch.r * Math.cos(-touch.a);
            let y = touch.r * Math.sin(-touch.a);
            this.p.point(touch.x + x, touch.y + y);
            touch.a -= 0.08;
            touch.r += 0.4;
        }
    }
}