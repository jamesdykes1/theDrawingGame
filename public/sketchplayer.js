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
  fill(255, 0, 100);
  ellipse(data.x, data.y, 10, 10);
}

/*
    Drawing to your own broswer


function mouseDragged(){
  console.log('Sending: ' + mouseX + ', ' + mouseY);

  var data = {
    x: mouseX,
    y: mouseY
  }

  socket.emit('mouse', data);

  noStroke();
  fill(255);
  ellipse(mouseX, mouseY, 5, 5);
}

function draw() {
}
 */