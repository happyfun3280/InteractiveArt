class RectangleArt extends Art {
    constructor() {
        super();
        this.backColor = { r: 255, g: 255, b: 255 };
    }
    
    form() {
        // setting
        this.pushSetting(this.p.createDiv("Min & Max Size : "), 30);
        this.minSizeSlider = this.p.createSlider(1, 100, 20);
        this.pushSetting(this.minSizeSlider, 40);
        this.maxSizeSlider = this.p.createSlider(1, 100, 80);
        this.pushSetting(this.maxSizeSlider, 40);
        
        this.pushSetting(this.p.createDiv("Density Size : "), 30);
        this.densitySlider = this.p.createSlider(30, 200, 80);
        this.pushSetting(this.densitySlider, 40);
        
        // info
        this.pushInfo(this.p.createDiv("Rectangle Art"), 30, 'title');
        this.pushInfo(this.p.createDiv("Made by Solchan"), 30, 'body');
    }
    setup() {
        this.p.noStroke();
    }

    update() {
        super.update();
    }

    initTouch(touch) {
    }

    updateTouch(touch) {
        let p = this.p;

        let x = touch.x;
        let y = touch.y;

        let color_R = y / this.canvasHeight*255;
        let color_B = x / this.canvasWidth*255;
        
        p.fill(p.random(color_R-25, color_R+25), 150, p.random(color_B-25, color_B+25));
        p.rect(p.random(x-this.densitySlider.value(), x+this.densitySlider.value()), p.random(y-this.densitySlider.value(), y+this.densitySlider.value()), p.random(this.minSizeSlider.value(), this.maxSizeSlider.value()));
    }
}