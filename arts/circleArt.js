class CircleArt extends Art {
    constructor(red, green, blue, settings) {
        super(red, green, blue);

        this.circleList = [];

        this.timer = new Timer(30);
    }
    
    form() {
        // setting
        this.pushSetting(this.p.createDiv("Size : "), 30);
        this.circleSizeSlider = this.p.createSlider(50, 300, 100);
        this.pushSetting(this.circleSizeSlider, 40);

        this.pushSetting(this.p.createDiv("User Circle Create Period : "), 30);
        this.userCircleCreatePeriodSlider = this.p.createSlider(1, 200, 100);
        this.pushSetting(this.userCircleCreatePeriodSlider, 40);

        this.pushSetting(this.p.createDiv("Blue Circle Create Period : "), 30);
        this.blueCircleCreatePeriodSlider = this.p.createSlider(10, 100, 30);
        this.blueCircleCreatePeriodSlider.input(() => {
            this.timer = new Timer(this.blueCircleCreatePeriodSlider.value());
        })
        this.pushSetting(this.blueCircleCreatePeriodSlider, 40);

        this.pushSetting(this.p.createDiv("Red Color : "), 30);
        this.redColorSlider = this.p.createSlider(0, 100, 0);
        this.pushSetting(this.redColorSlider, 40);
        this.pushSetting(this.p.createDiv("Green Color : "), 30);
        this.greenColorSlider = this.p.createSlider(0, 100, 0);
        this.pushSetting(this.greenColorSlider, 40);

        // info
        this.pushInfo(this.p.createDiv("Circle Art"), 30,'title');
        this.pushInfo(this.p.createDiv("Made by Chanhee"), 30,'body');
    }

    setup(p) {
        this.p.noStroke();
    }

    update() {
        super.update();

        let p = this.p;

        if (this.timer.timeover(this.getDeltaTime())) {
            this.circleList.push({
                x: p.random(0, this.canvasWidth),
                y: p.random(0, this.canvasHeight),
                size: 0,
                r: this.redColorSlider.value(),
                g: this.greenColorSlider.value(),
                b: p.random(0, 256)
            });
        }

        for (let i = 0; i < this.circleList.length; i++) {
            let circle = this.circleList[i];

            p.fill(circle.r, circle.g, circle.b);
            p.ellipse(circle.x, circle.y, circle.size);
            circle.size++;
            if (circle.size > this.circleSizeSlider.value()) {
                this.circleList.splice(i, 1);
                i--;
                continue;
            }
        }
    }

    
    initTouch(touch) {
        touch.timer = new Timer(this.userCircleCreatePeriodSlider.value());
        switch (touch.id%3) {
        case 0:
            touch.g = 0;
            touch.b = 0;
            break;
        case 1:
            touch.g = 100;
            touch.b = 0;
            break;
        case 2:
            touch.g = 0;
            touch.b = 100;
            break;
        default:
            touch.g = 0;
            touch.b = 0;
            break;
        }
    }

    updateTouch(touch) {
        if (touch.timer.timeover(this.getDeltaTime())) {
            this.circleList.push({
                x: touch.x,
                y: touch.y,
                size: 0,
                r: this.p.random(0, 256),
                g: touch.g,
                b: touch.b
            });
        }
    }
}