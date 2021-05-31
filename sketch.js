let vid;
let degular;
var xoff = 0;
var xoff2 = 50000;


function preload(){
  vid = createVideo('assets/Visual Essay v6_3.mp4');
  vid.loop();
  //vid.size(852,480);
  vid.size(windowWidth/1.5,windowWidth/1.5*0.5625);
  vid.hide();

  degular = loadFont('assets/DegularDisplayDemo-Medium.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noCursor();
  textFont(degular);

  //background(0);
}

function mousePressed(){
  vid.play();
}

function draw() {
  background(0);


// CLOCK

  push();
  noStroke();
  xoff = xoff + 0.001;
  xoff2 += 0.001;

  //var per = noise(xoff);
  var cx = map(noise(xoff),0,1,0,width);
  var cy = map(noise(xoff2),0,1,0,height);
  var colr = map(hour(),0,24,0,255);
  var colg = map(minute(),0,59,0,255);
  var colb = map(second(),0,59,0,255);
  var timeS = second();
  var timeM = minute();
  var timeH = hour();
  var wave2 = sin(radians(frameCount)) * 80;
  var wave3 = cos(radians(frameCount)) * 80;

  fill(colr,colg,colb);
  ellipse(cx-width/2+wave3,cy-height/2+wave2,10 + timeM,10 + timeM);
  ellipse(cx-width/2,cy-height/2,10 + timeH*2,10 + timeH*2);
  stroke(colr,colg,colb);
  noFill();
  ellipse(cx-width/2 -wave3,cy-height/2 -wave2,10 + timeS,10 + timeS);

pop();

    // BACKGROUND

push();
  for (var a = -width; a <= width; a+= 50){
    for (var b = -height; b <= height; b += 50){
      fill(255);
      noStroke();
      ellipse(a,b,3,3);
    }
  }

  pop();

  // CLICK

  push();
  fill(255);
  textAlign(CENTER,CENTER);
  textSize(50);
  translate(0,0,-100);
  text('Click to play',0,20);
  textSize(20);

  var wave = tan(radians(frameCount)) * 50;

  text('sketch run repeat',wave,-height/2);
  text('A visual essay on Generative Design',-wave,height/2);
  ellipse(width/2,wave,10,10);
  ellipse(-width/2,-wave,10,10);
  pop();

  // VIDEO

  let img = vid.get();

  var xpos = map(mouseX,0,width,-0.5,0.5);
  var ypos = map(mouseY,0,height,-0.5,0.5);

  push();
  imageMode(CENTER);
  translate(-xpos*200,-ypos*200,100);
  rotateX(-ypos);
  rotateY(xpos);
  image(img,0,0);
  pop();

  // MOUSE

  push();
  noStroke();
  fill(10,255,10);
  ellipse(mouseX-width/2,mouseY-height/2,10,10);
  pop();

  // CAMERA

  var xcam = map(mouseX,0,width,-100,100);
  var ycam = map(mouseY,0,height,-100,100);

let X = xcam;
let Y = ycam;
let Z = (height/2.0) / tan(PI*30.0 / 180.0) + ycam;
let centerX = 0;
let centerY = 0;
let centerZ = 0;

camera(X, Y, Z, centerX, centerY, centerZ, 0, 1, 0);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
