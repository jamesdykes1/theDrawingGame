var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("Server Running");

/*
    Creating the connection to the WebSocket
 */

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){
  console.log('new connection: ' + socket.id);

  socket.on('mouse', mouseMsg);

  /*
      Send X and Y of mouse to other clients
   */

  function mouseMsg(data){
    socket.broadcast.emit('mouse', data);
    console.log(data);
  }

}
