var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');

var app = express();
var server = app.listen(3000);
var addRequestId = require('express-request-id')();
var session = require('express-session');
var parseurl = require('parseurl');
var stringSimilarity = require('string-similarity');
 
var socket = require('socket.io');
var io = socket(server);
var cred = require('./cred.js');
var path = require('path');

app.set('view engine', 'ejs');

console.log("Server Running");

/*
    Creating the connection to the WebSocket
 */

var serverReq = 0;
var clue= [];
var player = new Array;
var playerscore = new Array;
http.createServer(function(req, res){
	
	serverReq++;
	
	console.log(vis);
});
 

io.sockets.on('connection', newConnection);
app.use(addRequestId);

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


//app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('cookie-parser') (cred.cookieSecret));
app.use(session({secret: 'drawinggame',saveUninitialized: true,resave: false}));

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function(req,res){
	
	res.render('index', {data: {serverRequest: serverReq}});

});


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
	session.clueword = req.body.clueword;
	console.log(req.session);
					
		if (serverReq == 0) {
			res.render('game', 
			{
					data: {
						username: req.session.username
						//score: scores
					}
				}
			);	
			serverReq++;
			console.log(serverReq);
			}
			else {
				res.render('correctguess', 
				{
					data: {
						username: req.session.username
						//score: scores
					}
				});
				serverReq++;
				console.log(serverReq);
			}



	});
	
app.post('/guesser', urlencodedParser, function (req, res) {
	console.log(req.session);
	  if (!req.body) return res.sendStatus(400)
		if  (req.sessionID){
		  guessedWord = req.body.guessedWord;
		  
			console.log (guessedWord);
			console.log (clue);
			
		scores = stringSimilarity.compareTwoStrings(clue,guessedWord);
				for (var i = 0; i < 1; i++){  

					player.push(req.session.username);
					playerscore.push(scores);
				}
			console.log(player);
			console.log(playerscore);
				console.log(scores)
			  res.render('correctguess', 
			  {data: {
						username: req.session.username,
						score: scores,
						player:player,
						playerscore:playerscore
					}
				});
			   guessedWord = [];

		}
});	



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
