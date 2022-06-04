class UmbrellaArt extends Art {
    constructor(red, green, blue, settings) {
        super(red, green, blue);

        this.raindropList = [];
        this.wetList = [];
        this.disappearTime = 2000;
        if (settings === undefined) {
            this.rdLen = 20;
            this.rdCreateTimer = new Timer(100);
            this.collisionAreaVisible = false;
        } else {
            this.rdLen = (settings.rdLen === undefined) ? 20 : settings.rdLen;
            this.rdCreateTimer = new Timer((settings.rdTime === undefined) ? 100 : settings.rdTime);
            this.collisionAreaVisible = (settings.visible === undefined) ? false : settings.visible;
        }
        this.CREATE_LIMIT = 100;

        this.ground = Gallery.getInst().canvasHeight / 20;
        this.x = Gallery.getInst().canvasWidth / 2;
        this.y = Gallery.getInst().canvasHeight / 2;
        this.width = Gallery.getInst().canvasWidth / 4;
        this.height = this.width / 4;

        this.circles = [];
        this.initCollisionArea(10);
    }

    initCollisionArea(uniform) {
        this.circles.push({
            x: this.x,
            y: this.y,
            r: this.height / 2
        })
        let gapX = this.width / 2 / uniform;
        let gapY = this.height / 2 / (uniform + 2);

        for (let i = 0; i < uniform; i++) {
            this.circles.push({
                x: this.x - gapX * (i + 1),
                y: this.y + gapY * (i + 1),
                r: this.height / 2 - gapY * (i + 1)
            });
            this.circles.push({
                x: this.x + gapX * (i + 1),
                y: this.y + gapY * (i + 1),
                r: this.height / 2 - gapY * (i + 1)
            });
        }
    }

    moveUmbrella(movedX, movedY) {
        let deltaX = movedX - this.x;
        let deltaY = movedY - this.y - this.height * 2;
        for (let i = 0; i < this.circles.length; i++) {
            this.circles[i].x += deltaX;
            this.circles[i].y += deltaY;
        }
        this.x += deltaX;
        this.y += deltaY;
    }

    drawUmbrella(p) {
        p.noFill();
        p.stroke(0);
        p.strokeWeight(4);
        let x = this.x;
        let y = this.y;
        let halfWidth = this.width / 2;
        let halfHeight = this.height / 2;
        p.line(x, y - halfHeight, x - halfWidth, y + halfHeight);
        p.line(x, y - halfHeight, x + halfWidth, y + halfHeight);

        let slope = this.height / 10;
        let tipUniform = Math.floor(this.height / 8);
        if (tipUniform % 2 === 0) tipUniform--;
        let tipGap = this.width / tipUniform;
        let tipX = x - halfWidth;

        for (let i = 0; i < tipUniform; i++) {
            p.bezier(tipX, y + halfHeight, tipX + tipGap / 2, y + halfHeight - slope, tipX + tipGap / 2, y + halfHeight - slope, tipX + tipGap, y + halfHeight);
            p.line(x, y - halfHeight, tipX, y + halfHeight);
            tipX += tipGap;
        }

        p.strokeWeight(5);
        let stickLength = this.height * 1.5;
        let gap = 5;
        let gripWidth = this.width / 20;
        let gripHeight = gripWidth * 0.8;
        p.line(x, y + halfHeight + gap, x, y + halfHeight + stickLength + gap);
        p.bezier(x, y + halfHeight + stickLength + gap, x, y + halfHeight + stickLength + gap + gripHeight, x + gripWidth, y + halfHeight + stickLength + gap + gripHeight, x + gripWidth, y + halfHeight + stickLength + gap);
    }

    drawCollisionArea(p) {
        for (let i = 0; i < this.circles.length; i++) {
            let c = this.circles[i];
            p.noFill();
            p.stroke(0);
            p.strokeWeight(1);
            p.circle(c.x, c.y, c.r * 2);
        }
    }

    addRandomRaindrop() {
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

    updateRaindrop() {
        for (let i = 0; i < this.raindropList.length; i++) {
            let r = this.raindropList[i];
            if (r.y - this.rdLen / 2 >= Gallery.getInst().canvasHeight - this.ground) {
                this.wetList.push({
                    x: r.x,
                    t: 0
                });
                this.raindropList.splice(i, 1);
                i--;
                continue;
            }

            for (let j = 0; j < this.circles.length; j++) {
                if (this.isCollidedPointWithCircle(r.x, r.y, this.circles[j])) {
                    let level = 3 + Math.floor(Math.random() * 3);
                    let raindrop = {
                        x: 0,
                        y: this.y + this.height / 2 + 30,
                        v: level,
                        b: 50 + 30 * level
                    }
                    let randomGap = Math.random() * 10;
                    if (j === 0) {
                        if (r.x <= this.x) {
                            raindrop.x = this.x - this.width / 2 + randomGap;
                        } else {
                            raindrop.x = this.x + this.width / 2 - randomGap;
                        }
                    } else if (j % 2 === 1) {
                        raindrop.x = this.x - this.width / 2 + randomGap;
                    } else {
                        raindrop.x = this.x + this.width / 2 - randomGap;
                    }
                    this.raindropList.push(raindrop);

                    this.raindropList.splice(i, 1);
                    i--;
                    break;
                }
            }
        }
    }

    drawRaindrop(p) {
        for (let i = 0; i < this.raindropList.length; i++) {
            let r = this.raindropList[i];
            p.strokeWeight(5.0);
            p.strokeCap(p.ROUND);
            p.stroke(20, 20, r.b);
            p.line(r.x, r.y, r.x, r.y - this.rdLen);
            r.y += 2 + r.v;
        }
    }
    
    drawGround(p) {
        p.noStroke();
        p.fill(80, 40, 40);
        p.rect(0, Gallery.getInst().canvasHeight - this.ground, Gallery.getInst().canvasWidth, this.ground);
    }

    updateWet() {
        for (let i = 0; i < this.wetList.length; i++) {
            if (this.wetList[i].t >= this.disappearTime) {
                this.wetList.splice(i, 1);
                i--;
                continue;
            }
            this.wetList[i].t += this.deltaTime;
        }
    }

    drawWet(p) {
        p.noStroke();
        let size = this.ground / 3 * 2;
        for  (let i = 0; i < this.wetList.length; i++) {
            let w = this.wetList[i];
            let color = w.t / (this.disappearTime / 20);
            p.fill(60 + color, 30 + color / 2, 30 + color / 2);
            p.arc(w.x, Gallery.getInst().canvasHeight - this.ground, size * 2, size, 0, p.PI);
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
        console.log(this.deltaTime);
        p.background(this.bgc.r, this.bgc.g, this.bgc.b);

        if (p.mouseIsPressed) {
            p.cursor('grabbing');
            this.moveUmbrella(p.mouseX, p.mouseY);
        } else {
            p.cursor('grab');
        }

        this.drawUmbrella(p);

        if (this.collisionAreaVisible) {
            this.drawCollisionArea(p);
        }

        if (this.rdCreateTimer.timeover(this.getDeltaTime())) {
            this.addRandomRaindrop();
        }

        this.updateRaindrop();
        this.drawRaindrop(p);

        this.drawGround(p);
        
        this.updateWet();
        this.drawWet(p);
    }

    windowResized(p) {
        this.ground = Gallery.getInst().canvasHeight / 20;
        this.x = Gallery.getInst().canvasWidth / 2;
        this.y = Gallery.getInst().canvasHeight / 2;
        this.width = Gallery.getInst().canvasWidth / 4;
        this.height = this.width / 4;
        
        this.circles = [];
        this.initCollisionArea(10);
    }
}