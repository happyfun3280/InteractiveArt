class LifegameArt extends Art {
    constructor() {
        super();
        this.backColor = { r: 106, g: 102, b: 87 }
    }

    form() {
    }

    setup() {
        this.lines;
        this.columns;
        this.rows;
        this.board;
        this.nextboard;
        this.start = 0;
        this.startbinary = 0;
        this.setupnumber = 0;
        this.dm = 1;
        this.linenumber = 25;
        this.k = 0;
        this.p.background(25);
        this.lines = this.linenumber;
        let button = this.p.createButton('Start / Stop');
        button.position(0, this.canvasHeight - 103);
        button.mousePressed(() => this.Start());
        button = this.p.createButton('Random');
        button.position(90, this.canvasHeight - 103);
        button.mousePressed(() => this.randomfill());
        button = this.p.createButton('Clear');
        button.position(165, this.canvasHeight - 103);
        button.mousePressed(() => this.cellclear());
        button = this.p.createButton('Draw Mode');
        button.position(225, this.canvasHeight - 103);
        button.mousePressed(() => this.drawmode());
        button = this.p.createButton('Erase Mode');
        button.position(320, this.canvasHeight - 103);
        button.mousePressed(() => this.erasemode());
        this.cellclear();
        this.columns = 61;
        this.rows = 28;
        this.board = new Array(this.columns);
        for (let i = 0; i < this.columns; i++) {
            this.board[i] = new Array(this.rows);
        }
        this.nextboard = new Array(this.columns);
        for (let i = 0; i < this.columns; i++) {
            this.nextboard[i] = new Array(this.rows);
        }
        this.randomfill();
    }

    update() {
        super.update();
        let p = this.p;

        p.background(255);
        if (this.setupnumber == 0) this.cellclear();
        if (this.start == 1) {
            this.next();
            for (let i = 0; i < this.columns; i++) {
                this.board[i][0] = 3;
                this.board[i][this.rows - 1] = 3;
                this.board[0][i] = 3;
                this.board[this.columns - 1][i] = 3;
            }
        }
        else {
            for (let i = 0; i < this.columns; i++) {
                this.board[i][0] = 4;
                this.board[i][this.rows - 1] = 4;
                this.board[0][i] = 4;
                this.board[this.columns - 1][i] = 4;
            }
        }
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                if ((this.board[i][j] == 1)) p.fill(255);
                else if ((this.board[i][j] == 4)) p.fill(255, 120, 120);
                else if ((this.board[i][j] == 3)) p.fill(150, 255, 150);
                else p.fill(0);
                p.stroke(0);
                p.rect(i * this.linenumber, j * this.linenumber, this.linenumber - 1, this.linenumber - 1);
            }
        }
        if (this.start == 0) {
            if (this.dm == 1) this.celldraw();
            else this.cellerase();
        }
    }
    celldraw() {
        let p = this.p;
        if (this.dm == 1 && p.mouseIsPressed == true) {
            this.board[Math.floor(p.mouseX / this.linenumber)][Math.floor(p.mouseY / this.linenumber)] = 1;
            this.nextboard[Math.floor(p.mouseX / this.linenumber)][Math.floor(p.mouseY / this.linenumber)] = 0;
        }
    }
    cellerase() {
        let p = this.p;
        if (this.dm == 2 && p.mouseIsPressed == true) {
            this.board[Math.floor(p.mouseX / this.linenumber)][Math.floor(p.mouseY / this.linenumber)] = 0;
            this.nextboard[Math.floor(p.mouseX / this.linenumber)][Math.floor(p.mouseY / this.linenumber)] = 1;
        }
    }
    //mouseClicked() {
    //   if   (this.dm   ==   2   &&   this.board[int(floor(p.mouseX   /   this.linenumber))][int(floor(p.mouseY   / this.linenumber))] == 1) {
    // this.board[int(floor(p.mouseX / this.linenumber))][int(floor(p.mouseY / this.linenumber))] = 0;
    // }
    //}
    change() {
        this.k++;
        if (this.k % 2 == 1) this.linenumber = 7;
        else if (this.k % 2 == 0) this.linenumber = 11;
        this.setup();
    }
    drawmode() {
        this.dm = 1;
    }
    erasemode() {
        this.dm = 2;
    }
    Start() {
        this.startbinary++;
        if (this.startbinary % 2 == 1) this.start = 1;
        else this.start = 0;
    }
    cellclear() {
        this.setupnumber = 1;
        for (let i = 1; i < this.columns - 1; i++) {
            for (let j = 1; j < this.rows - 1; j++) {
                this.board[i][j] = 0
            }
        }
    }
    randomfill() {
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (i == 0 || j == 0 || i == this.columns - 1 || j == this.rows - 1) this.board[i][j] = 0;
                else this.board[i][j] = Math.floor(this.p.random(2));
                this.nextboard[i][j] = 0;
            }
        }
    }
    next() {
        for (let x = 1; x < this.columns - 1; x++) {
            for (let y = 1; y < this.rows - 1; y++) {
                let neighbors = 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        neighbors += this.board[x + i][y + j];
                    }
                }
                neighbors -= this.board[x][y];
                if ((this.board[x][y] == 1 && neighbors < 2)) {
                    this.nextboard[x][y] = 0;
                }
                else if ((this.board[x][y] == 1 && neighbors > 3)) {
                    this.nextboard[x][y] = 0;
                }
                else if ((this.board[x][y] == 0 && neighbors == 3)) {
                    this.nextboard[x][y] = 1;
                }
                else {
                    this.nextboard[x][y] = this.board[x][y];
                }
            }
        }
        let temp = this.board;
        this.board = this.nextboard;
        this.nextboard = temp;
    }
}