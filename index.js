var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var five = require("johnny-five");

app.disable('x-powered-by');

app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', "http://"+req.headers.host+':8000');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        next();
    }
);

app.use(express.static(__dirname + '/static'));

app.get('/', function (req, res) {
    res.sendfile('./views/index.html')
});

app.get('/ledrgb', function (req, res) {
    res.sendfile('./views/ledrgb.html')
});

server.listen(3000, "127.0.0.1");

five.Board().on('ready', function () {
    var led = new five.Led.RGB({
        pins: {
            red: 3,
            green: 5,
            blue: 6
        }
    })

    this.repl.inject({
        led: led
    });

    led.on();
    console.log('led on');
    led.color("#FF0000");
    io.on('connection', function (socket) {

        console.log('Conectado');

        socket.on('changueColor', function (msg) {
            console.log("#"+msg);
            led.color("#"+msg);
            io.emit('retorno', "#"+msg);
        });

        socket.on('disconnect', function () {
            console.log('Desconectado');
        });

    });
});
