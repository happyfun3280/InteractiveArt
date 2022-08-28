class BalloonArt extends Art {
    constructor(red, green, blue) {
        super(red, green, blue);
    }

    form() {
        // setting
        this.pushSetting(this.p.createDiv("Interval : "), 30);
        this.intervalSlider = this.p.createSlider(50, 500, 100);
        this.pushSetting(this.intervalSlider, 40);
        this.pushSetting(this.p.createDiv("Color Interval : "), 30);
        this.colorIntervalSlider = this.p.createSlider(1, 20, 8);
        this.pushSetting(this.colorIntervalSlider, 40);

        //info
        this.pushInfo(this.p.createDiv("Balloon Art"), 30, 'title');
        this.pushInfo(this.p.createDiv("Made by Solchan"), 30, 'body');
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
        for(let repeat_check = 0; repeat_check <= (touchObj.circleSize/this.intervalSlider.value()) + 1; repeat_check++){
            p.fill(
                touchObj.r - (this.colorIntervalSlider.value()*repeat_check), 
                touchObj.g - (this.colorIntervalSlider.value()*repeat_check),
                touchObj.b - (this.colorIntervalSlider.value()*repeat_check)
            );
            p.ellipse(touchObj.x, touchObj.y, 
                touchObj.circleSize - (this.intervalSlider.value() * repeat_check), 
                touchObj.circleSize - (this.intervalSlider.value() * repeat_check)
            );
        }
    }
}