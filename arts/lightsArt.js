class LightsArt extends Art {
    constructor() {
        super();
        this.backColor = { r: 106, g: 102, b: 87 }
    }

    form() {
    }

    setup() {
        this.clicked = false;
        this.gap = 100;

        this.lines = 100;
        this.col = Math.floor(400 / this.lines);
        this.row = Math.floor(400 / this.lines);
        this.board = new Array(4);
        this.win = 0;
        this.button = this.p.createButton('Restart');
        this.button.position(160, 400 + this.gap);
        this.button.size(100, 60);
        this.button.mousePressed(() => {
            this.setup();
        });
        this.mx;
        this.my;
        this.fmx;
        this.fmy;


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
        p.background(this.backColor.r, this.backColor.g, this.backColor.b);

        this.mousepos();
        if (p.mouseIsPressed) {
            if (this.clicked) {

            } else {
                this.fmx = Math.floor(this.mx / this.lines);
                this.fmy = Math.floor(this.my / this.lines);
                this.board[this.fmx][this.fmy]++;
                if (this.fmx - 1 >= 0) this.board[this.fmx - 1][this.fmy]++;
                if (this.fmx + 1 <= 3) this.board[this.fmx + 1][this.fmy]++;
                if (this.fmy - 1 >= 0) this.board[this.fmx][this.fmy - 1]++;
                if (this.fmy + 1 <= 3) this.board[this.fmx][this.fmy + 1]++;
                this.clicked = true;
            }
        } else this.clicked = false;

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                p.stroke(106, 102, 87);
                p.fill(155, 152, 139);
                p.square(i * this.lines + 5, j * this.lines + 5 + this.gap, 90);
                p.stroke(0);
                if (this.board[i][j] % 2 == 1) p.fill(244, 208, 63);
                else p.fill(40, 38, 34);
                p.circle((i + 0.5) * this.lines, (j + 0.5) * this.lines + this.gap, 65);
                p.stroke(146, 141, 123);
                p.line(i * this.lines, 0 + this.gap, i * this.lines , 500 + this.gap);
                p.line(0, i * this.lines + this.gap, 500, i * this.lines + this.gap);
                p.line(0, 1 + this.gap, 400, 1 + this.gap);
                p.line(0, 399 + this.gap, 400, 399 + this.gap);
                p.line(1, 0 + this.gap, 1, 400 + this.gap);
                p.line(399, 0 + this.gap, 399, 400 + this.gap);
            }

            p.stroke(255, 0, 0);
            if (this.board[Math.floor(this.mx / this.lines)][Math.floor(this.my / this.lines)] % 2 == 1) p.fill(244, 208, 63);
            else p.fill(40, 38, 34);
            p.circle(Math.floor(this.mx / this.lines) * this.lines + 50, Math.floor(this.my / this.lines) * this.lines + 50 + this.gap, 65);
            this.clearcheck();
            if (this.win == 1) {
                p.background(20);
                p.fill(255, 255, 0);
                p.textSize(60);
                p.text('you win!', 90, 220 + this.gap);
            }
        }


    }

    mousepos() {
        if (this.p.mouseX < 400 && this.p.mouseX >= 0) {
            this.mx = this.p.mouseX;
        }
        else this.mx = 300;
        if (this.p.mouseY < 400 + this.gap && this.p.mouseY >= 0 + this.gap) {
            this.my = this.p.mouseY - this.gap;
        }
        else this.my = 300;
    }

    clearcheck() {
        let off = 0;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.board[i][j] % 2 == 0) off += 1
            }
        }
        if (off == 16) {
            this.win = 1;
        }
        else off = 0;
    }


    initTouch(touch) {
    }

    updateTouch(touch) {
    }

}