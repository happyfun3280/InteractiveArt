class BalloonArt extends Art {
    constructor(red, green, blue) {
        super(red, green, blue);
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
        super.draw(p);
        p.background(this.bgc.r, this.bgc.b, this.bgc.r);

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