//instancias
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

//declaramos donde van a estar los static
app.use(express.static(__dirname + '/static'));

//rutas
app.get('/', function (req, res) {
    res.sendfile('./views/index.html')
});

app.get('/ledrgb', function (req, res) {
    res.sendfile('./views/ledrgb.html')
});

//server
server.listen(3000, "127.0.0.1");

//el johnny-five
five.Board().on('ready', function () {

    //creamos un objeto de led RGB
    var led = new five.Led.RGB({

        //pines del arduino
        pins: {
            red: 3,
            green: 5,
            blue: 6
        }
        ,
        isAnode: true
    })

    //injectamos el led
    this.repl.inject({
        led: led
    });

    //encendemos el led
    led.on();
    console.log('led on');

    //le damos color rojo
    led.color("#0000FF");

    //evento socket.io de espera
    io.on('connection', function (socket) {
        console.log('Conectado');

        //escuchamos la room changueColor y recibimos el msg
        socket.on('changueColor', function (msg) {
            console.log("#"+msg);

            //le damos al led la data que recibimos
            led.color("#"+msg);

            //emitimos mensaje de retorno
            io.emit('retorno', "#"+msg);
        });

        //escuchamos evento de desconectar
        socket.on('disconnect', function () {
            console.log('Desconectado');
        });

    });
});
