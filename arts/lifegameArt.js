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
        this.linenumber = 11;
        this.k = 0;
        this.lines = this.linenumber;
        let button1 = this.p.createButton('Start / Stop');
        button1.position(0, 400);
        button1.mousePressed(() => this.Start());
        let button2 = this.p.createButton('Random');
        button2.position(90, 400);
        button2.mousePressed(() => this.randomfill());
        let button3 = this.p.createButton('Clear');
        button3.position(165, 400);
        button3.mousePressed(() => this.cellclear());
        let button4 = this.p.createButton('Draw Mode');
        button4.position(225, 400);
        button4.mousePressed(() => this.drawmode());
        let button5 = this.p.createButton('Erase Mode');
        button5.position(320, 400);
        button5.mousePressed(() => this.erasemode());
        let button6 = this.p.createButton('Change Size');
        button6.position(420, 400);
        button6.mousePressed(() => this.change());
        this.cellclear();
        this.columns = Math.floor(940 / this.linenumber);
        this.rows = Math.floor(400 / this.linenumber);
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
        if (this.dm == 1 && this.p.mouseIsPressed == true) {
            this.board[Math.floor(this.p.mouseX / this.linenumber)][Math.floor(this.p.mouseY / this.linenumber)] = 1;
            this.nextboard[Math.floor(this.p.mouseX / this.linenumber)][Math.floor(this.p.mouseY / this.linenumber)] = 0;
        }
    }

    cellerase() {
        if (this.dm == 2 && this.p.mouseIsPressed == true) {
            this.board[Math.floor(this.p.mouseX / this.linenumber)][Math.floor(this.p.mouseY / this.linenumber)] = 0;
            this.nextboard[Math.floor(this.p.mouseX / this.linenumber)][Math.floor(this.p.mouseY / this.linenumber)] = 1;
        }
    }

    //mouseClicked() {
    // if (this.dm == 2 && this.board[int(Math.floor(this.p.mouseX / this.linenumber))][int(Math.floor(this.p.mouseY / this.linenumber))] == 1) {
    // this.board[int(Math.floor(this.p.mouseX / this.linenumber))][int(Math.floor(this.p.mouseY / this.linenumber))] = 0;
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
                this.board[i][j] = 0;
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