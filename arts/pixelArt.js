class PixelArt extends Art {
    constructor() {
        super();
        this.backColor = { r: 0, g: 0, b: 0 }
    }

    form() {
    }

    setup() {
        this.cells = [];
        this.cellW = 15;
        this.cellH = 15;
        this.nbCellW = Math.floor(this.canvasWidth / this.cellW) + 1;
        this.nbCellH = Math.floor(this.canvasHeight / this.cellH) + 1;

        let p = this.p;
        p.rectMode(p.CENTER);
        p.colorMode(p.HSB, 1);

        for (let i = 0; i < this.nbCellW * this.nbCellH; i++) {
            this.cells.push(p.createVector(0, 0));
        }
    }

    update() {
        super.update();
        
        let p = this.p;
        for (var i = 0; i < this.nbCellW; i++) {
            for (var j = 0; j < this.nbCellH; j++) {
                var k = i + j * this.nbCellW;
                var x = this.cellW * i + this.cellW / 2;
                var y = this.cellH * j + this.cellH / 2;
                var h = p.map(this.cells[k].heading(), -p.PI, p.PI, 0, 1);
                var b = Math.min(this.cells[k].mag() * 100, 10);
                p.fill(h, 1, b);
                p.rect(x, y, this.cellW, this.cellH);
                this.cells[k].mult(.98);
            }
        }   
    }

    initTouch(touch) {
        touch.prevX = touch.x;
        touch.preY = touch.y;
    }
    
    updateTouch(touch) {
        let p = this.p;
        let deltaMouse = p.createVector(touch.x - touch.prevX, touch.y - touch.prevY);
        touch.prevX = touch.x;
        touch.prevY = touch.y;
        
        for (var i = 0; i < this.nbCellW; i++) {
            for (var j = 0; j < this.nbCellH; j++) {
                var k = i + j * this.nbCellW;
                var x = this.cellW * i + this.cellW / 2;
                var y = this.cellH * j + this.cellH / 2;
                var d = Math.max(1, p.dist(touch.x, touch.y, x, y));
                deltaMouse.normalize();
                deltaMouse.mult(1 / (d * 30));
                this.cells[k].add(deltaMouse);
                this.cells[k].limit(10);
            }
        }   
    }
}