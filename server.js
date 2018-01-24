var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var server = app.listen(3000);

var drawingName = '';
var allGuesses = [];

app.set('view engine', 'ejs');
//app.use(express.static('public'));

console.log("Server Running");

/*
    Creating the connection to the WebSocket
 */

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/player', urlencodedParser, function (req, res) {

  if (!req.body) return res.sendStatus(400)
  console.log(req.body);
	res.render('game', {data: req.body});

	//res.sendFile(__dirname + '/public/game.html', + req.body.userid);
	//res.json(req.body.userid);
})

//app.get('/Player', function(req, res){
//res.sendFile(__dirname + '/public/game.html', + req.body.userid);

//});




function newConnection(socket){
  console.log('new connection: ' + socket.id);

  socket.on('mouse', mouseMsg);
	socket.on('word', nameOfDrawing);
	socket.on('guess', listOfGuesses);

  /*
      Send X and Y of mouse to other clients
   */

  function mouseMsg(data){
    socket.broadcast.emit('mouse', data);
    console.log(data);
  }

	function nameOfDrawing(data){
		drawingName = data;
		console.log(drawingName);
	}

	function listOfGuesses(data){
		allGuesses.push(data);
		console.log(allGuesses);
		for (var i = 0; i < allGuesses.length; i++) {
			if (allGuesses[i] == drawingName) {
				console.log('Correct!');
			}
			else {
				console.log('Incorrect.');
				allGuesses.splice(i, 1);
			}
		}
	}

}
