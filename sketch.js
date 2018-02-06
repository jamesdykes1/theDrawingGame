var socket;

function setup() {
  var canvas = createCanvas(680, 400);
  canvas.parent('playerboard');
  background(51);

  socket = io.connect('http://localhost:3000')
  socket.on('mouse', newDrawing);
}

/*
    Recieving a drawing from another broswer/ client
 */

function newDrawing(data){
  noStroke();
  fill(data.colour);
  ellipse(data.x, data.y, 10, 10);
}

/*
    Drawing to your own broswer
 */

function mouseDragged(){
  console.log('Sending: ' + mouseX + ', ' + mouseY);
  var drawColour=document.getElementById('drawColor').value;
  var data = {
    x: mouseX,
    y: mouseY,
    colour: drawColour
  }

  socket.emit('mouse', data);
    noStroke();
    var drawColour=document.getElementById('drawColor').value;
  fill(drawColour);
  ellipse(mouseX, mouseY, 5, 5);
}

function draw() {
}
