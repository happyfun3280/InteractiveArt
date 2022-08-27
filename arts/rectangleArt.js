class RectangleArt extends Art {
    constructor(red, green, blue, settings) {
        super(red, green, blue);
        this.RANDOM_COLOR_SIZE = 25;
    }

    setup() {
        this.p.noStroke();
    }

    update() {
        super.update();
    }

    initTouch(touchObj) {
    }

    updateTouch(touchObj) {
        let p = this.p;

        let x = touchObj.x;
        let y = touchObj.y;

        let color_R = y / this.canvasHeight*255;
        let color_B = x / this.canvasWidth*255;
        
        p.fill(p.random(color_R-this.RANDOM_COLOR_SIZE, color_R+this.RANDOM_COLOR_SIZE), 150, p.random(color_B-this.RANDOM_COLOR_SIZE, color_B+this.RANDOM_COLOR_SIZE));
        p.rect(p.random(x-80, x+80), p.random(y-80, y+80), p.random(20,80));
    }
}