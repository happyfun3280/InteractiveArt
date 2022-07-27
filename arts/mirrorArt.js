class MirrorArt extends Art {
    constructor(red, green, blue) {
        super(red, green, blue);

        this.color = 0;
        this.dir = 0;
        this.MIN = 100;
        this.MAX = 255;
        
        this.SIZE_MIN = 10;
        this.SIZE_MAX = 50;
        this.size = this.SIZE_MIN;
        

    }

    setup(p) {
        super.setup(p);
        p.noStroke();
        this.color = p.random(this.MIN, this.MAX);
    }

    draw(p) {
        super.draw(p);
        if (this.held) {
            if (this.dir === 0) this.color++;
            else this.color--;

            if (this.color >= this.MAX) this.dir = 1;
            if (this.color <= this.MIN) this.dir = 0;

            const SCRX = Gallery.getInst().canvasWidth;
            const SCRY = Gallery.getInst().canvasHeight;

            p.fill(this.color, 0, this.color);
            p.circle(p.mouseX, p.mouseY, this.size, this.size);
            p.fill(this.color, this.color, 0);
            p.circle(SCRX - p.mouseX, SCRY - p.mouseY, this.size, this.size);
            p.fill(0, this.color, this.color);
            p.circle(SCRX - p.mouseX, p.mouseY, this.size, this.size);
            p.fill(0, 0, this.color);
            p.circle(p.mouseX, SCRY - p.mouseY, this.size, this.size);
            this.size += 0.5;
            if (this.size > this.SIZE_MAX) this.size = this.SIZE_MAX;
        }

        if (this.released) {
            this.size = this.SIZE_MIN;
        }
    }
}