class BalloonArt extends Art {
    constructor(red, green, blue) {
        super(red, green, blue);
        this.CHANGE_LEVEL = 8;
    }

    setup() {
        this.p.noStroke();
    }

    update() {
        this.p.background(this.bgc.r, this.bgc.b, this.bgc.r);
        super.update();
    }

    initTouch(touchObj) {
        touchObj.r = 0;
        touchObj.g = 0;
        touchObj.b = 0;
        touchObj.circleSize = 80;
    }

    updateTouch(touchObj) {
        let p = this.p;
        if(touchObj.x<this.canvasWidth/2 && touchObj.y<this.canvasHeight/2){
            touchObj.r = 255;
            touchObj.g = 200;
            touchObj.b = 200;
        }else if(touchObj.x>=this.canvasWidth/2 && touchObj.y<this.canvasHeight/2){
            touchObj.r = 0;
            touchObj.g = 200;
            touchObj.b = 255;
        }else if(touchObj.x<this.canvasWidth/2 && touchObj.y>=this.canvasHeight/2){
            touchObj.r = 200;
            touchObj.g = 255;
            touchObj.b = 100;
        }else{
            touchObj.r = 150;
            touchObj.g = 80;
            touchObj.b = 255;
        }

        touchObj.circleSize += 2;
        for(let repeat_check = 0; repeat_check <= (touchObj.circleSize/100) + 1; repeat_check++){
            p.fill(touchObj.r - (this.CHANGE_LEVEL*repeat_check), touchObj.g - (this.CHANGE_LEVEL*repeat_check), touchObj.b - (this.CHANGE_LEVEL*repeat_check));
            p.ellipse(touchObj.x, touchObj.y, touchObj.circleSize - (100 * repeat_check), touchObj.circleSize - (100 * repeat_check));
        }
    }
}