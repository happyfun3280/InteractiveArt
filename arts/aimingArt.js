class AimingArt extends Art {
    constructor() {
        super();
        this.backColor = { r: 255, g: 255, b: 255 };
    }

    setup() {
        this.randX = this.canvasWidth / 2;
        this.randY = this.canvasHeight / 2;

        this.p.noStroke();
        this.p.fill(0, 255, 100);
    }
    
    update() {
        super.update();
        this.p.ellipse(this.randX, this.randY, 60, 60);
    }

    initTouch() {

    }

    updateTouch(touch) {
        let p = this.p;

        if (this.distance(touch.x, touch.y) <= 40) {
            p.fill(0, 255, 255);
            p.rect(0, 0, this.canvasWidth, this.canvasHeight);
            this.randX = p.random(0, this.canvasWidth);
            this.randY = p.random(0, this.canvasHeight);
            p.fill(255, 150, 100);
            p.ellipse(this.randX, this.randY, 80, 80);
            p.fill(0, 255, 100);
            p.ellipse(this.randX, this.randY, 50, 50);
        }

    }

    distance(x, y) {
        return Math.sqrt((this.randX-x)*(this.randX-x) + (this.randY-y)*(this.randY-y));
    }
}