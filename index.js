var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var five = require("johnny-five"),
    board, button;

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.sendfile('./views/index.html')
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });

  	socket.on('disconnect', function(){
    	console.log('user disconnected');
  	});

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});