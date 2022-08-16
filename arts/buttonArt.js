class ButtonArt extends Art {
    constructor(red, green, blue) {
        super(red, green, blue);


        this.btnList = [];
        this.animationList = [];

        this.BTN_WIDTH = 200;
        this.BTN_HEIGHT = 100;

        this.ROW_GAP = 50;
        this.COLUMN_GAP = 20;

        this.BTN_LENGTH = 200;

        this.BTN_PUSHED_LENGTH = 100;
        this.BTN_MOVE_DIST = 1;

        let curX = 0;
        let curY = 0;
        let line = 1;

        while (true) {
            if (curX > this.canvasWidth + this.BTN_WIDTH / 2) {
                if (line % 2 === 1) {
                    curX = this.BTN_WIDTH / 2 + this.ROW_GAP / 2;
                    curY += this.BTN_HEIGHT / 2 + this.COLUMN_GAP / 2;
                } else {
                    curX = 0;
                    curY += this.BTN_HEIGHT / 2 + this.COLUMN_GAP / 2;
                }
                line++;

                if (curY > this.canvasHeight + this.BTN_HEIGHT / 2) {
                    break;
                }
            }

            this.btnList.push({
                cx: curX,
                cy: curY,

                x1: curX,
                y1: curY - this.BTN_HEIGHT / 2,

                x2: curX - this.BTN_WIDTH / 2,
                y2: curY,

                x3: curX,
                y3: curY + this.BTN_HEIGHT / 2,

                x4: curX + this.BTN_WIDTH / 2,
                y4: curY,

                x5: curX - this.BTN_WIDTH / 2,
                y5: curY + this.BTN_LENGTH,

                x6: curX,
                y6: curY + this.BTN_HEIGHT / 2 + this.BTN_LENGTH,

                x7: curX + this.BTN_WIDTH / 2,
                y7: curY + this.BTN_LENGTH,

                pushed: 0
            })
            curX += this.BTN_WIDTH + this.ROW_GAP;
        }
    }

    setup(p) {
        super.setup(p);
        console.log(this.btnList);
    }

    draw(p) {
        super.draw(p);

        p.background(this.bgc.r, this.bgc.g, this.bgc.b);

        this.updateAnimation();

        for (let i = 0; i < this.btnList.length; i++) {
            let btn = this.btnList[i];

            this.onHoverEvent(p, i);

            p.noStroke();

            p.fill(255 * i/this.btnList.length, 50, 50);
            p.beginShape();
            p.vertex(btn.x1, btn.y1 + btn.pushed);
            p.vertex(btn.x2, btn.y2 + btn.pushed);
            p.vertex(btn.x3, btn.y3 + btn.pushed);
            p.vertex(btn.x4, btn.y4 + btn.pushed);
            p.endShape(p.CLOSE);

            p.fill(255 * i/this.btnList.length, 70, 70);
            p.beginShape();
            p.vertex(btn.x3, btn.y3 + btn.pushed);
            p.vertex(btn.x2, btn.y2 + btn.pushed);
            p.vertex(btn.x5, btn.y5);
            p.vertex(btn.x6, btn.y6);
            p.endShape(p.CLOSE);

            p.fill(255 * i/this.btnList.length, 100, 100);
            p.beginShape();
            p.vertex(btn.x4, btn.y4 + btn.pushed);
            p.vertex(btn.x3, btn.y3 + btn.pushed);
            p.vertex(btn.x6, btn.y6);
            p.vertex(btn.x7, btn.y7);
            p.endShape(p.CLOSE);

            p.stroke(200, 50, 50);
            p.noFill();
            //p.circle(btn.cx, btn.cy, this.BTN_HEIGHT, this.BTN_HEIGHT);
        }
    }

    onHoverEvent(p, index) {
        let distance = Math.sqrt(Math.pow(this.btnList[index].cx - p.mouseX, 2) + Math.pow(this.btnList[index].cy - p.mouseY, 2));

        if (distance > this.BTN_HEIGHT / 2) return false;

        let isOngoing = false;
        for (let i = 0; i < this.animationList.length; i++) {
            if (this.animationList[i].idx === index) {
                isOngoing = true;
                break;
            }
        }

        if (!isOngoing) {
            this.animationList.push({
                idx: index,
                scene: 0,
                // 0: descend
                // 1: delay
                // 2: raise
                // 3: end
                sceneList: [
                    { t: 0, tlimit: 2000 },
                    { t: 0, tlimit: 500 },
                    { t: 0, tlimit: 2000 }
                ]
            });
        }
    }

    updateAnimation() {
        for (let i = 0; i < this.animationList.length; i++) {
            let ani = this.animationList[i];

            switch(ani.scene) {
                case 0:
                    this.btnList[ani.idx].pushed = this.BTN_PUSHED_LENGTH * ani.sceneList[ani.scene].t / ani.sceneList[ani.scene].tlimit;
                    break;
                case 1:
                    break;
                case 2:
                    this.btnList[ani.idx].pushed = this.BTN_PUSHED_LENGTH * (1 - (ani.sceneList[ani.scene].t / ani.sceneList[ani.scene].tlimit));
                    break;
            }
            
            ani.sceneList[ani.scene].t += this.getDeltaTime();

            if (ani.sceneList[ani.scene].t > ani.sceneList[ani.scene].tlimit)
                ani.scene++;

            if (ani.scene === 3) {
                this.animationList.splice(i, 1);
                i--;
            }
        }
    }
}