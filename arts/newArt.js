class NewArt extends Art {
    constructor(red, green, blue) {
        super(red, green, blue);

        this.raindropList = [];
        this.createTimer = new Timer(10);
        this.CREATE_LIMIT = 100;
        this.COLLISION_VISIBLE = false;
        this.ground = 60;

        this.x = 500;
        this.y = 300;
        this.width = 200;
        this.height = 100;
        this.circles = [];
        this.circles.push({
            x: this.x,
            y: this.y,
            r: this.height / 2
        })

        let uniform = 10;
        for (let i = 0; i < uniform; i++) {
            this.circles.push({
                x: this.x - this.width * ((i + 1) / uniform),
                y: this.y + (i + 1) * 5,
                r: this.height / 2 - (i + 1) * 4
            });
            this.circles.push({
                x: this.x + this.width * ((i + 1) / uniform),
                y: this.y + (i + 1) * 5,
                r: this.height / 2 - (i + 1) * 4
            });
        }
    }

    isCollidedPointWithCircle(x, y, circle) {
        if (Math.sqrt((circle.x - x) * (circle.x - x) + (circle.y - y) * (circle.y - y)) <= circle.r) return true;
        return false;
    }

    isCollidedPointWithRect(x, y, rect) {
        let left = rect.x - rect.width / 2;
        let right = rect.x + rect.width / 2;
        let top = rect.y - rect.height / 2;
        let bottom = rect.y + rect.height / 2;
        if (left <= x && x <= right && top <= y && y <= bottom) return true;
        return false;
    }

    setup(p) {
        super.setup(p);
    }
    draw(p) {
        super.draw(p);
        p.background(this.bgc.r, this.bgc.g, this.bgc.b);

        // 마우스를 누르고 있을 때 충돌 범위 이동
        if (p.mouseIsPressed) {
            let deltaX = p.mouseX - 10 - this.x;
            let deltaY = p.mouseY - 160 - this.y;
            for (let i = 0; i < this.circles.length; i++) {
                this.circles[i].x += deltaX;
                this.circles[i].y += deltaY;
            }
            this.x += deltaX;
            this.y += deltaY;
        }

        // 우산 출력
        p.noFill();
        p.stroke(0);
        p.strokeWeight(5);
        let revision = -8;
        p.line(this.x, this.y - this.height / 2 + revision, this.x - this.width, this.y + this.height / 2);
        p.line(this.x, this.y - this.height / 2 + revision, this.x + this.width, this.y + this.height / 2);
        let y = this.y + this.height / 2;
        let x = this.x - this.width;
        for (let i = 0; i < 5; i++) {
            p.bezier(x, y, x + this.width / 5, y - 15, x + this.width / 5, y - 15, x + this.width / 5 * 2, y);
            p.line(this.x, this.y - this.height / 2 + revision, x + this.width / 5 * 2, y);
            x = x + this.width / 5 * 2;
        }
        p.strokeWeight(6);
        p.line(this.x, y, this.x, this.y - this.height / 2 + 200);
        p.bezier(this.x, this.y - this.height / 2 + 200, this.x, this.y - this.height / 2 + 200 + 20, this.x + 20, this.y - this.height / 2 + 200 + 20, this.x + 20, this.y - this.height / 2 + 200);

        // 충돌 범위 출력
        /*
        for (let i = 0; i < this.circles.length; i++) {
            let c = this.circles[i];
            p.noFill();
            p.stroke(0);
            p.strokeWeight(1);
            p.circle(c.x, c.y, c.r*2);
        }
        */


        // 무작위로 빗방울 추가
        if (this.createTimer.timeover(this.getDeltaTime())) {
            if (this.raindropList.length < this.CREATE_LIMIT) {
                let level = Math.floor(Math.random() * 6);
                this.raindropList.push({
                    x: Math.floor(Math.random() * Gallery.getInst().canvasWidth),
                    y: 0,
                    v: level,
                    b: 50 + 30 * level
                });
            }
        }


        // 빗방울 출력 및 떨어지기, 땅과 우산 충돌 범위에 진입 시 빗방울 삭제
        for (let i = 0; i < this.raindropList.length; i++) {
            let r = this.raindropList[i];
            p.strokeWeight(5.0);
            p.strokeCap(p.ROUND);
            p.stroke(20, 20, r.b);
            p.line(r.x, r.y, r.x, r.y - 20);
            r.y += 2 + r.v;

            if (r.y - 20 >= Gallery.getInst().canvasHeight - this.ground) {
                this.raindropList.splice(i, 1);
                i--;
                continue;
            }

            for (let j = 0; j < this.circles.length; j++) {
                if (this.isCollidedPointWithCircle(r.x, r.y, this.circles[j])) {
                    let level = Math.floor(Math.random() * 6);
                    if (j % 2 == 1) {
                        this.raindropList.push({
                            x: this.x - this.width - Math.random() * 20,
                            y: this.y + this.height / 2 + 50,
                            v: level,
                            b: 50 + 30 * level
                        });
                    } else {
                        this.raindropList.push({
                            x: this.x + this.width + Math.random() * 20,
                            y: this.y + this.height / 2 + 50,
                            v: level,
                            b: 50 + 30 * level
                        });
                    }
                    this.raindropList.splice(i, 1);
                    i--;
                    break;
                }
            }
        }

        // 땅 출력
        p.noStroke();
        p.fill(100, 50, 50);
        p.rect(0, Gallery.getInst().canvasHeight - this.ground, Gallery.getInst().canvasWidth, this.ground);
    }
}