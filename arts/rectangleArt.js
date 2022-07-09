class RectangleArt extends Art {
    constructor(red, green, blue, settings) {
        super(red, green, blue);
        this.color_R = 0;
        this.color_G = 0;
        this.color_B = 0;
        this.randomColorSize = 25;
    }

    setup(p) {
        p.noStroke();
    }

    draw(p) {
        const RANDOM_COLOR_SIZE = 25;
        this.color_R = p.mouseY/Gallery.getInst().canvasHeight*255;
        this.color_B = p.mouseX/Gallery.getInst().canvasWidth*255;
        p.fill(p.random(this.color_R-RANDOM_COLOR_SIZE, this.color_R+RANDOM_COLOR_SIZE), 150, p.random(this.color_B-RANDOM_COLOR_SIZE, this.color_B+RANDOM_COLOR_SIZE));
        if(p.mouseIsPressed) {
            p.rect(p.random(p.mouseX-80, p.mouseX+80), p.random(p.mouseY-80, p.mouseY+80), p.random(20,80));
        }
    }
}