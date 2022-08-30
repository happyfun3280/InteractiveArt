class GrubberStretchingArt extends Art {
    constructor() {
        super();
        this.backColor = { r: 255, g: 255, b: 255 }
    }

    setup() {
        this.currQuadrant = 1;
        this.lastQuadrant = 1;
        this.color = 0;

        this.p.noStroke();
    }

    update() {
        this.p.background(this.backColor.r, this.backColor.g, this.backColor.b);
        super.update();
        
        if(this.p.mouseX<this.canvasWidth/2 && this.p.mouseY<this.canvasHeight/2){
            this.currQuadrant=2;
        }else if(this.p.mouseX>=this.canvasWidth/2 && this.p.mouseY<this.canvasHeight/2){
            this.currQuadrant=4;
        }else if(this.p.mouseX<this.canvasWidth/2 && this.p.mouseY>=this.canvasHeight/2){
            this.currQuadrant=3;
        }else{
            this.currQuadrant=1;
        }
        if(this.currQuadrant!=this.lastQuadrant){
            this.lastQuadrant=this.currQuadrant;
            this.color++;
        }
        if(this.color%3==0){
            this.p.fill(0,50+this.colorControl(),50+this.colorControl());
        }else if(this.color%3==1){
            this.p.fill(50+this.colorControl(),0,50+this.colorControl());
        }else{
            this.p.fill(50+this.colorControl(),50+this.colorControl(),0);
        }
        this.p.ellipse(this.canvasWidth/2,this.canvasHeight/2,2*(this.p.mouseX-this.canvasWidth/2),2*(this.p.mouseY-this.canvasHeight/2));
    }

    initTouch(touch) {
    }

    updateTouch(touch) {
    }

    colorControl() {
        return 200*(Math.abs(this.p.mouseY-this.canvasHeight/2)+Math.abs(this.p.mouseX-this.canvasWidth/2))/(this.canvasWidth/2+this.canvasHeight);
    }
}