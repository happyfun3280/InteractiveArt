var movers = [];
var r = g = b = 0;
function setup() {
  createCanvas(640, 600);
  movers[0] = new Mover(1,30,40);
}
function mouseClicked(){
  movers.push(new Mover(random(2,7),mouseX, mouseY));
  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);
}
function draw() {
  background(0);
  for (var i = 0; i < movers.length; i++) {
    var wind = createVector(0.5, 0);
    var gravity = createVector(0,3* movers[i].mass);
    var c = 0.03;
    var friction = movers[i].velocity.copy();
    friction.mult(-1);
    friction.normalize();
    friction.mult(c);
    movers[i].applyForce(friction);
    movers[i].applyForce(wind);
    movers[i].applyForce(gravity);
    movers[i].update();
    movers[i].display();
    movers[i].checkEdges();
  }
}
var Mover = function(m, x, y) {
  this.mass = m;
  this.position = createVector(x, y);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.applyForce = function(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  };
  this.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  };
  this.display = function() {
    noStroke();
    fill(r,g,b);
    ellipse(this.position.x, this.position.y, m*10, m*10);
  };
  this.checkEdges = function() {
    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -1;
    } else if (this.position.x < 0) {
      this.velocity.x *= -1;
      this.position.x = 0;
    }
    if (this.position.y > height) {
      this.velocity.y *= -1;
      this.position.y = height;
    }
  };
};