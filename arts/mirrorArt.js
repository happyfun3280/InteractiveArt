class MirrorArt extends Art {
    constructor(red, green, blue) {
        super(red, green, blue);
    }

    form() {
        // setting
        this.pushSetting(this.p.createDiv("Min Size : "), 30);
        this.minSizeSlider = this.p.createSlider(1, 50, 10);
        this.pushSetting(this.minSizeSlider, 40);
        this.pushSetting(this.p.createDiv("Max Size : "), 30);
        this.maxSizeSlider = this.p.createSlider(50, 100, 50);
        this.pushSetting(this.maxSizeSlider, 40);

        this.pushSetting(this.p.createDiv("Brightness : "), 30);
        this.brightnessSlider = this.p.createSlider(0, 255, 100);
        this.pushSetting(this.brightnessSlider, 40);
    }

    setup() {
        this.p.noStroke();
    }

    update() {
        super.update();
    }

    initTouch(touch) {
        touch.size = this.minSizeSlider.value();
        touch.color = this.brightnessSlider.value();
    }

    updateTouch(touch) {
        let p = this.p;
        p.fill(touch.color, 0, 0);
        p.circle(touch.x, touch.y, touch.size, touch.size);
        p.fill(0, touch.color, 0);
        p.circle(this.canvasWidth - touch.x, this.canvasHeight - touch.y, touch.size, touch.size);
        p.fill(0, 0, touch.color);
        p.circle(this.canvasWidth - touch.x, touch.y, touch.size, touch.size);
        p.fill(touch.color, 0, touch.color);
        p.circle(touch.x, this.canvasHeight - touch.y, touch.size, touch.size);

        touch.color += 1;
        if (touch.color > 255) touch.color = 255;

        touch.size += 0.5;
        if (touch.size > this.maxSizeSlider.value()) touch.size = this.maxSizeSlider.value();
    }
}