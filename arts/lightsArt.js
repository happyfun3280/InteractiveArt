class LightsArt extends Art {
    constructor() {
        super();
        this.backColor = { r: 106, g: 102, b: 87 }
    }

    form() {
    }

    setup() {
        this.lines;
        this.board;
        this.col;
        this.row;
        this.mx;
        this.my;
        this.fmx;
        this.fmy;
        this.off;
        this.win;
        this.col = Math.floor(this.canvasWidth / this.lines);
        this.row = Math.floor(this.canvasHeight / this.lines);
        this.p.lines = this.canvasHeight / 5;
        this.clicked = false;
        this.board = new Array(4);
        for (let i = 0; i < 4; i++) {
            this.board[i] = new Array(4);
        }
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                this.board[i][j] = Math.floor(this.p.random(2));
            }
        }
    }
    update() {
        super.update();
        let p = this.p;
        p.background(106, 102, 87);
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                p.stroke(106, 102, 87);
                p.fill(155, 152, 139);
                p.square(this.canvasWidth / 2 + this.canvasHeight / 4 - i * (this.canvasHeight / 4), j * (this.canvasHeight / 4) + 5, this.canvasHeight / 4 - 10);
                p.stroke(0);
                if (this.board[i][j] % 2 == 1) p.fill(244, 208, 63);
                else p.fill(40, 38, 34);
                p.circle(this.canvasWidth / 2 + this.canvasHeight / 4 - i * (this.canvasHeight / 4) + this.canvasHeight / 9 + 10, j * (this.canvasHeight / 4) + this.canvasHeight / 9 + 10, this.canvasHeight / 6);
                p.stroke(146, 141, 123);
                p.strokeWeight(3);
                p.line(this.canvasWidth / 2 - 5, 0, this.canvasWidth / 2 - 5, this.canvasHeight);
                p.line(this.canvasWidth / 2 - 5 + this.canvasHeight / 2, 0, this.canvasWidth / 2 - 5 + this.canvasHeight / 2, this.canvasHeight);
                p.line(this.canvasWidth / 2 - 5 + this.canvasHeight / 4, 0, this.canvasWidth / 2 - 5 + this.canvasHeight / 4, this.canvasHeight);
                p.line(this.canvasWidth / 2 - 5 - this.canvasHeight / 2, 0, this.canvasWidth / 2 - 5 - this.canvasHeight / 2, this.canvasHeight);
                p.line(this.canvasWidth / 2 - 5 - this.canvasHeight / 4, 0, this.canvasWidth / 2 - 5 - this.canvasHeight / 4, this.canvasHeight);
                p.line(this.canvasWidth / 2 - this.canvasHeight / 2 - 5, this.canvasHeight / 2, this.canvasWidth / 2 + this.canvasHeight / 2 - 5, this.canvasHeight / 2);
                p.line(this.canvasWidth / 2 - this.canvasHeight / 2 - 5, this.canvasHeight / 4, this.canvasWidth / 2 + this.canvasHeight / 2 - 5, this.canvasHeight / 4);
                p.line(this.canvasWidth / 2 - this.canvasHeight / 2 - 5, this.canvasHeight * 3 / 4, this.canvasWidth / 2 + this.canvasHeight / 2 - 5, this.canvasHeight * 3 / 4);
            }
        }
        this.clearcheck();
        if (this.win == 1) {
            p.background(20);
            p.fill(255, 255, 0);
            p.textSize(100);
            p.text('you win!', this.canvasWidth / 2, this.canvasHeight / 2);
        }
        let button = this.p.createButton('Restart');
        button.position(0, this.canvasHeight - 100);
        button.size(150, 100);
        button.mousePressed(() => this.restart());

        if (p.mouseIsPressed) {
            if (this.clicked) {

            } else {
                this.mousePressed();
                this.clicked = true;
            }
        } else {
            this.clicked = false;
        }
    }
    mousePressed() {
        let p = this.p;
        if (p.mouseX >= this.canvasWidth / 2 - this.canvasHeight / 2 && p.mouseX <= this.canvasWidth / 2 - this.canvasHeight / 4) {
            this.fmx = 3;
        }
        if (p.mouseX >= this.canvasWidth / 2 - this.canvasHeight / 4 && p.mouseX <= this.canvasWidth / 2) {
            this.fmx = 2;
        }
        if (p.mouseX >= this.canvasWidth / 2 && p.mouseX <= this.canvasWidth / 2 + this.canvasHeight / 4) {
            this.fmx = 1;
        }
        if (p.mouseX >= this.canvasWidth / 2 + this.canvasHeight / 4 && p.mouseX <= this.canvasWidth / 2 + this.canvasHeight / 2) {
            this.fmx = 0;
        }

        if (p.mouseY >= 0 && p.mouseY <= this.canvasHeight / 4) {
            this.fmy = 0;
        }
        else if (p.mouseY >= this.canvasHeight / 4 && p.mouseY <= this.canvasHeight / 2) {
            this.fmy = 1;
        }
        else if (p.mouseY >= this.canvasHeight / 2 && p.mouseY <= this.canvasHeight * 3 / 4) {
            this.fmy = 2;
        }
        else if (p.mouseY >= this.canvasHeight * 3 / 4 && p.mouseY <= this.canvasHeight) {
            this.fmy = 3;
        }
        this.board[this.fmx][this.fmy]++;
        if (this.fmx - 1 >= 0) this.board[this.fmx - 1][this.fmy]++;
        if (this.fmx + 1 <= 3) this.board[this.fmx + 1][this.fmy]++;
        if (this.fmy - 1 >= 0) this.board[this.fmx][this.fmy - 1]++;
        if (this.fmy + 1 <= 3) this.board[this.fmx][this.fmy + 1]++;
    }
    clearcheck() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.board[i][j] % 2 == 0) this.off += 1;
            }
        }
        if (this.off == 16) {
            this.win = 1;
        }
        this.off = 0;
    }
    restart() {
        this.win = 0;
        this.setup();
    }
}