class FireflyArt extends Art {
    constructor() {
        super();
        this.backColor = { r: 0, g: 0, b: 0 }
    }

    form() {
    }

    setup() {
        this.fireflies = [];
        
        this.timeFlag = 0;
        this.clicked = false;

        this.limit = 50;
        for (let i = 0; i < this.limit; i++) {
            this.fireflies.push({
                x: this.p.random(0, this.canvasWidth),
                y: this.p.random(0, this.canvasHeight),
                a: 0,
                transparency: 0,
                t: this.p.random(0, 2000),
                tLimit: 2000,
                blinking: false,
                raising: false,
                size: this.p.random(80, 120)
            });
        }
    }

    update() {
        
        super.update();
        let p = this.p;

        if (p.mouseIsPressed) {
            if (this.clicked) {
            } else {
                if (this.timeFlag === 1) this.timeFlag = 0;
                else if (this.timeFlag === 0) this.timeFlag = 1;
                this.clicked = true;
            }
        } else {
            this.clicked = false;
            
        }

        if (this.timeFlag === 0) {
            p.background(50, 190, 210);
            for (let i = 0; i < this.limit; i++) {
                let firefly = this.fireflies[i];
                firefly.x += 1 * Math.cos(firefly.a);
                firefly.y += 1 * Math.sin(firefly.a);
                
                firefly.a += this.p.random(-0.5, 0.5);

                p.noStroke();
                for (let i = 0; i < this.limit; i++) {
                    let firefly = this.fireflies[i];
        
                    p.fill(30);
                    p.circle(firefly.x, firefly.y, 5);
                }
            }
        } else if (this.timeFlag === 1) {
            p.background(this.backColor.r, this.backColor.g, this.backColor.b);
        
            for (let i = 0; i < this.limit; i++) {
                let firefly = this.fireflies[i];
                firefly.x += 5 * Math.cos(firefly.a);
                firefly.y += 5 * Math.sin(firefly.a);
                
                firefly.a += this.p.random(-0.5, 0.5);
    
                if (firefly.x < 0) firefly.x = 0;
                if (firefly.x > this.canvasWidth) firefly.x = this.canvasWidth;
                if (firefly.y < 0) firefly.y = 0;
                if (firefly.y > this.canvasHeight) firefly.y = this.canvasHeight;
    
                if (firefly.blinking) {
                    if (firefly.raising) {
                        firefly.transparency += 0.5;
                        if (firefly.transparency >= 10) {
                            firefly.transparency = 10;
                            firefly.raising = false;
                        }   
                    } else {
                        firefly.transparency -= 0.5;  
                        if (firefly.transparency <= 0) {
                            firefly.transparency = 0;
                            firefly.blinking = false;
                        }
                    }
                } else {
                    firefly.t += this.getDeltaTime();
                    if (firefly.t >= firefly.tLimit) {
                        firefly.t = 0;
                        firefly.blinking = true;
                        firefly.raising = true;
                    }
                }
            }
    
            p.noStroke();
            for (let i = 0; i < this.limit; i++) {
                let firefly = this.fireflies[i];
    
                for (let j = 0; j < firefly.size; j += 3) {
                    p.fill(255-j, 230-j, 0, firefly.transparency);
                    p.circle(firefly.x, firefly.y, firefly.size - j);
                }
    
            }
        }
    }
    
}