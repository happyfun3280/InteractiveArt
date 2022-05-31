class Gallery {
    constructor() {
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight;
        this.p5Container = undefined;
        this.mainContainer = undefined;
        this.p = undefined;
        this.art = undefined;

        this.isMain = true;
    }

    static getInst() {
        if (Gallery.instance === undefined) {
            Gallery.instance = new Gallery();
        }
        return Gallery.instance;
    }

    setContainers(p5Container, mainContainer) { this.p5Container = p5Container; this.mainContainer = mainContainer; }
    selectArt(art) { this.art = art; }
    openArt(art) {
        this.selectArt(art);
        this.create();
    }

    create() {
        if (!this.isMain) return;
        this.isMain = false;
        this.p = new p5((p) => {
            p.setup = () => {
                p.createCanvas(this.canvasWidth, this.canvasHeight);
                let backBtn = p.createButton("Back");
                backBtn.position(0, 0);
                backBtn.addClass('backBtn');
                backBtn.mousePressed(() => {
                    p.remove();
                    this.isMain = true;
                });
                this.art.setup(p);
            };
            p.draw = () => {
                this.art.draw(p);
            };
        }, this.p5Container);
    }
}

class Art {
    constructor(backColor) {
        this.backColor = backColor;
    }

    setup(p) {
        p.background(this.backColor);
    }

    draw(p) {
    }
}