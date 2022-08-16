class AimingArt extends Art {
    constructor(red, green, blue) {
        super(red, green, blue);
        this.randX = Gallery.getInst().canvasWidth / 2;
        this.randY = Gallery.getInst().canvasHeight / 2;
    }

    setup(p) {
        super.setup(p);
        p.noStroke();
        p.fill(0, 255, 100);
        if (p.mouseIsPressed && this.distance(p) <= 30) {
            this.randX = p.random(0, Gallery.getInst().canvasWidth);
            this.randY = p.random(0, Gallery.getInst().canvasHeight);
        }
    }
    
    draw(p) {
        super.draw(p);

        p.ellipse(this.randX, this.randY, 60, 60);
        if (p.mouseIsPressed && this.distance(p) <= 40) {
            p.fill(0, 255, 255);
            p.rect(0, 0, Gallery.getInst().canvasWidth, Gallery.getInst().canvasHeight);
            this.randX = p.random(0, Gallery.getInst().canvasWidth);
            this.randY = p.random(0, Gallery.getInst().canvasHeight);
            p.fill(255, 150, 100);
            p.ellipse(this.randX, this.randY, 80, 80);
            p.fill(0, 255, 100);
            p.ellipse(this.randX, this.randY, 50, 50);
        }
    }

    distance(p) {
        return Math.sqrt((this.randX-p.mouseX)*(this.randX-p.mouseX) + (this.randY-p.mouseY)*(this.randY-p.mouseY));
    }
}