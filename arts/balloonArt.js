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

    initTouch(touch) {
        touch.r = 0;
        touch.g = 0;
        touch.b = 0;
        touch.circleSize = 80;
    }

    updateTouch(touch) {
        let p = this.p;
        if(touch.x<this.canvasWidth/2 && touch.y<this.canvasHeight/2){
            touch.r = 255;
            touch.g = 200;
            touch.b = 200;
        }else if(touch.x>=this.canvasWidth/2 && touch.y<this.canvasHeight/2){
            touch.r = 0;
            touch.g = 200;
            touch.b = 255;
        }else if(touch.x<this.canvasWidth/2 && touch.y>=this.canvasHeight/2){
            touch.r = 200;
            touch.g = 255;
            touch.b = 100;
        }else{
            touch.r = 150;
            touch.g = 80;
            touch.b = 255;
        }


        touch.circleSize += 2;
        for(let repeat_check = 0; repeat_check <= (touch.circleSize/this.intervalSlider.value()) + 1; repeat_check++){
            p.fill(
                touch.r - (this.colorIntervalSlider.value()*repeat_check), 
                touch.g - (this.colorIntervalSlider.value()*repeat_check),
                touch.b - (this.colorIntervalSlider.value()*repeat_check)
            );
            p.ellipse(touch.x, touch.y, 
                touch.circleSize - (this.intervalSlider.value() * repeat_check), 
                touch.circleSize - (this.intervalSlider.value() * repeat_check)
            );
        }
    }
}