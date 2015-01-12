//instancias
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var five = require("johnny-five");

app.disable('x-powered-by');

app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', "http://" + req.headers.host + ':8000');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        next();
    }
);

//declaramos donde van a estar los static
app.use(express.static(__dirname + '/static'));

//ruta http://localhost:3000/motores
app.get('/motores', function (req, res) {
    res.sendfile('./views/motores.html')
});

//server
server.listen(3000, "127.0.0.1");

//el johnny-five
board = new five.Board();

//numero de pin de arduino
var pin1 = 9;

board.on('ready', function () {

    scalingRange = [0, 2000];

    servo = new five.Servo({
        pin: pin1,
        range: scalingRange
    });

    //evento socket.io de espera
    io.on('connection', function (socket) {
        console.log('Conectado');

        //escuchamos la room changueColor y recivimos el msg
        socket.on('changeVelocidadM1', function (speed) {
            
            servo.to(speed[1]);
            
            console.log("volar: "+speed[1]);
            //emitimos mensaje de retorno
            io.emit('retorno', speed);
        });

        //escuchamos evento de desconectar
        socket.on('disconnect', function () {
            console.log('Desconectado');
        });

    });

});

