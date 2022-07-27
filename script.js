class Gallery {
    constructor() {
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight;
        this.p5Container = undefined;
        this.mainContainer = undefined;
        this.p = undefined;
        this.art = undefined;
    }

    static getInst() {
        if (Gallery.instance === undefined) {
            Gallery.instance = new Gallery();
        }
        return Gallery.instance;
    }

    setContainers(p5Container, mainContainer) { this.p5Container = p5Container; this.mainContainer = mainContainer; }

    openArt(art) {
        this.art = art;
        this.create();
    }

    create() {
        if (this.p !== undefined) this.p.remove();
        this.mainContainer.classList.add("hidden");
        this.p = new p5((p) => {
            p.setup = () => {
                p.createCanvas(this.canvasWidth, this.canvasHeight);

                let backBtn = p.createButton("Back");
                backBtn.position(20, 20);
                backBtn.addClass('topBtn back');
                backBtn.mousePressed(() => {
                    p.remove();
                    p = undefined;
                    this.mainContainer.classList.remove("hidden");
                });

                let settingBtn = p.createButton("Settings");
                settingBtn.position(90, 20);
                settingBtn.addClass('topBtn setting');
                settingBtn.mousePressed(() => {
                });

                let infoBtn = p.createButton("Info");
                infoBtn.position(185, 20);
                infoBtn.addClass('topBtn info');
                infoBtn.mousePressed(() => {
                });

                this.art.setup(p);
            };
            p.draw = () => {
                this.art.draw(p);
            };
            p.windowResized = () => {
                this.canvasWidth = innerWidth;
                this.canvasHeight = innerHeight;
                p.resizeCanvas(this.canvasWidth, this.canvasHeight);
                this.art.windowResized(p);
            }
        }, this.p5Container);
    }
}

class Art {
    constructor(red, green, blue) {
        this.sTime = new Date().getTime();
        this.eTime = new Date().getTime();
        this.deltaTime = this.eTime - this.sTime;
        this.bgc = { r: red, g: green, b: blue };

        this.pressed = false;
        this.held = false;
        this.released = false;
    }

    getDeltaTime() { return this.deltaTime; }

    setup(p) {
        p.background(this.bgc.r, this.bgc.g, this.bgc.b);
    }

    draw(p) {
        this.eTime = new Date().getTime();
        this.deltaTime = this.eTime - this.sTime;
        this.sTime = new Date().getTime();

        if (p.mouseIsPressed) {
            if (this.held) this.pressed = false;
            else this.pressed = true;
            this.held = true;
        } else {
            if (this.held) this.released = true;
            else this.released = false;
            this.held = false;
        }
    }
    windowResized(p) {
        p.background(this.bgc.r, this.bgc.g, this.bgc.b);
    }
}

class Timer {
    constructor(limit) {
        this.count = 0;
        this.limit = limit;
    }
    
    timeover(delta) {
        this.count += delta;
        if (this.count < this.limit) return false;
        this.count -= this.limit;
        return true;
    }

    change(newLimit) {
        if (newLimit >= 0) this.limit = newLimit;
        else {
            this.limit = 0;
        }
    }
}