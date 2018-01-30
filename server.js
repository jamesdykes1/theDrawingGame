var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');

var app = express();
var server = app.listen(3000);
var addRequestId = require('express-request-id')();
var session = require('express-session');
var parseurl = require('parseurl');
 
var socket = require('socket.io');
var io = socket(server);
var cred = require('./cred.js');


app.set('view engine', 'ejs');


console.log("Server Running");

/*
    Creating the connection to the WebSocket
 */

var serverReq = 0;
var session;
var clue= [];

http.createServer(function(req, res){
	
	serverReq++;
	
	console.log(vis);
});
 

io.sockets.on('connection', newConnection);
app.use(addRequestId);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('cookie-parser') (cred.cookieSecret));
app.use(session({secret: 'drawinggame',saveUninitialized: true,resave: false}));

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/player', urlencodedParser, function (req, res) {
	
  if (!req.body) return res.sendStatus(400)
  console.log(req.body);
  console.log(req.cookies);
  console.log(req.session);
  console.log(req.sessionID);  
  console.log('request '+serverReq);

	clue += req.body.clueword;  
	session = req.session;
	session.username = req.body.username;
	//session.clueword = req.body.clueword;

		if (serverReq == 0) {
			res.render('game', {data: req.body});	
			serverReq++;
			console.log(serverReq);
			}
			else {
				res.render('incorrectguess', {data: req.body});
				serverReq++;
				console.log(serverReq);
			}
			
	});
var message = '';
	
app.post('/guesser', urlencodedParser, function (req, res) {
	  if (!req.body) return res.sendStatus(400)
		
	  guessedWord = req.body.guessedWord;
		console.log (guessedWord);
		console.log (clue);
	  if (clue == guessedWord) {
		  //console.log ('Correct');
		  message = 'correct';
		  console.log (message);
		  res.render('correctguess', {data: req.body});
	  } else {
			message = 'Incorrect';
		 	 // console.log ('Incorrect');
			  console.log (message);
			  res.render('incorrectguess', {data: req.body});
	  }
	
});	
	
/*	
app.get('/guesser', function(req,res){
	
	session = req.session;

});

	

*/



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
  
  /*
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
  
  */
  
  
  

}
