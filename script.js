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
    constructor(red, blue, green) {
        this.bgc = { r: red, b: blue, g: green };
    }

    setup(p) {
        p.background(this.bgc.r, this.bgc.b, this.bgc.r);
    }

    draw(p) {
    }
}

class newArt extends Art {
    constructor(red, blue, green) {
        super(red, blue, green);
        this.CHANGE_LEVEL = 8;
        this.circleSize = 80;
        this.color_R = 0;
        this.color_G = 0;
        this.color_B = 0;
        this.count_circle = 0;
        this.repeat_check = 0;
    }

    setup(p) {
        super.setup(p);
        p.noStroke();
    }

    draw(p) {
        p.background(this.bgc.r, this.bgc.b, this.bgc.r);
        console.log(this.bgc);

        if(p.mouseX<Gallery.getInst().canvasWidth/2 && p.mouseY<Gallery.getInst().canvasHeight/2){
            this.color_R = 255;
            this.color_G = 200;
            this.color_B = 200;
        }else if(p.mouseX>=Gallery.getInst().canvasWidth/2 && p.mouseY<Gallery.getInst().canvasHeight/2){
            this.color_R = 0;
            this.color_G = 200;
            this.color_B = 255;
        }else if(p.mouseX<Gallery.getInst().canvasWidth/2 && p.mouseY>=Gallery.getInst().canvasHeight/2){
            this.color_R = 200;
            this.color_G = 255;
            this.color_B = 100;
        }else{
            this.color_R = 150;
            this.color_G = 80;
            this.color_B = 255;
        }

        if (p.mouseIsPressed) {
            this.circleSize += 2;
            for(this.repeat_check = 0; this.repeat_check <= (this.circleSize/100) + 1; this.repeat_check++){
                p.fill(this.color_R - (this.CHANGE_LEVEL*this.repeat_check), this.color_G - (this.CHANGE_LEVEL*this.repeat_check), this.color_B - (this.CHANGE_LEVEL*this.repeat_check));
                p.ellipse(p.mouseX,p.mouseY, this.circleSize - (100 * this.repeat_check), this.circleSize - (100 * this.repeat_check));
            }
        }
        else {
            this.circleSize = 0;
        }
    }
}