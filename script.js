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

                let exitBtn = p.createButton("Exit");
                exitBtn.position(20, 20);
                exitBtn.addClass('topBtn');
                exitBtn.mousePressed(() => {
                    p.remove();
                    p = undefined;
                    this.mainContainer.classList.remove("hidden");
                });

                this.art.p = p;
                this.art.canvasWidth = this.canvasWidth;
                this.art.canvasHeight = this.canvasHeight;


                let settingBG = p.createDiv("");
                settingBG.position(0, 0);
                settingBG.addClass('leftBox hidden');
                let backBtn = p.createButton("Back");
                backBtn.position(20, 20);
                backBtn.addClass('topBtn hidden');
                backBtn.mousePressed(() => {
                    settingBG.addClass('hidden');
                    backBtn.addClass('hidden');
                    for (let i = 0; i < this.art.settingList.length; i++)
                        this.art.settingList[i].addClass('hidden');
                    for (let i = 0; i < this.art.infoList.length; i++)
                        this.art.infoList[i].addClass('hidden');
                });

                let settingBtn = p.createButton("Settings");
                settingBtn.position(90, 20);
                settingBtn.addClass('topBtn settingBtn');
                settingBtn.mousePressed(() => {
                    settingBG.removeClass('hidden');
                    backBtn.removeClass('hidden');
                    for (let i = 0; i < this.art.settingList.length; i++)
                        this.art.settingList[i].removeClass('hidden');
                    for (let i = 0; i < this.art.infoList.length; i++)
                        this.art.infoList[i].addClass('hidden');
                });

                let infoBtn = p.createButton("Info");
                infoBtn.position(185, 20);
                infoBtn.addClass('topBtn infoBtn');
                infoBtn.mousePressed(() => {
                    settingBG.removeClass('hidden');
                    backBtn.removeClass('hidden');
                    for (let i = 0; i < this.art.settingList.length; i++)
                        this.art.settingList[i].addClass('hidden');
                    for (let i = 0; i < this.art.infoList.length; i++)
                        this.art.infoList[i].removeClass('hidden');
                });

                this.art.form();
                for (let i = 0; i < this.art.settingList.length; i++)
                    this.art.settingList[i].addClass('setting hidden');
                for (let i = 0; i < this.art.infoList.length; i++)
                    this.art.infoList[i].addClass('info hidden');

                p.background(this.art.bgc.r, this.art.bgc.g, this.art.bgc.b);
                this.art.setup();
            }

            p.draw = () => {
                if (this.canvasWidth != innerWidth || this.canvasHeight != innerHeight) {
                    this.art.canvasWidth = this.canvasWidth = innerWidth;
                    this.art.canvasHeight = this.canvasHeight = innerHeight;

                    p.resizeCanvas(this.canvasWidth, this.canvasHeight);
                    p.background(this.art.bgc.r, this.art.bgc.g, this.art.bgc.b);
                }
                this.art.draw();
            }

            p.touchStarted = (event) => {
                this.art.touchStarted(event);
            }

            p.touchMoved = (event) => {
                this.art.touchMoved(event);
            }

            p.touchEnded = (event) => {
                this.art.touchEnded(event);
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

        this.canvasWidth = 100;
        this.canvasHeight = 100;

        this.touchObjList = [];

        this.settingList = [];
        this.settingY = 90;
        this.infoList = [];
        this.infoY = 90;
    }

    getDeltaTime() { return this.deltaTime; }

    form() { }
    pushSetting(element, interval, classList) {
        element.addClass(classList);
        element.position(20, this.settingY);
        this.settingY += interval;
        this.settingList.push(element);
    }
    pushInfo(element, interval, classList) {
        element.addClass(classList);
        element.position(20, this.infoY);
        this.infoY += interval;
        this.infoList.push(element);
    }

    setup() { }

    draw() {
        let p = this.p;

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

        this.update();
    }

    touchStarted(event) {
        if (event.changedTouches == undefined) {
            this.touchObjList.splice(0, 0, {
                id: -1,
                x: event.clientX,
                y: event.clientY
            })
            this.initTouch(this.touchObjList[0]);
        } else {
            for (let i = 0; i < event.changedTouches.length; i++) {
                this.touchObjList.push({
                    id: event.changedTouches[i].identifier,
                    x: event.changedTouches[i].clientX,
                    y: event.changedTouches[i].clientY
                });
                this.initTouch(this.touchObjList[this.touchObjList.length - 1]);
            }
        }
        return false;
    }

    touchMoved(event) {
        if (event.changedTouches == undefined) {
            this.touchObjList[0].x = event.clientX;
            this.touchObjList[0].y = event.clientY;
        } else {
            for (let i = 0; i < event.changedTouches.length; i++) {
                for (let j = 0; j < this.touchObjList.length; j++) {
                    if (event.changedTouches[i].identifier == this.touchObjList[j].id) {
                        this.touchObjList[j].x = event.changedTouches[i].clientX;
                        this.touchObjList[j].y = event.changedTouches[i].clientY;
                        break;
                    }
                }
            }
        }
        return false;
    }

    touchEnded(event) {
        if (event.changedTouches == undefined) {
            this.touchObjList.splice(0, 1);
        } else {
            for (let i = 0; i < event.changedTouches.length; i++) {
                for (let j = 0; j < this.touchObjList.length; j++) {
                    if (event.changedTouches[i].identifier == this.touchObjList[j].id) {
                        this.touchObjList.splice(j, 1);
                        break;
                    }
                }
            }
        }
        return false;
    }

    update() {
        for (let i = 0; i < this.touchObjList.length; i++) {
            this.updateTouch(this.touchObjList[i]);
        }
    }

    initTouch(touchObject) { }

    updateTouch(touchObject) { }
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