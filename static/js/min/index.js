var express=require("express"),app=express(),http=require("http").Server(app),io=require("socket.io")(http),five=require("johnny-five"),board,button;app.use(express.static(__dirname+"/static")),app.get("/",function(req,res){res.sendfile("./views/index.html")}),app.get("/ledrgb",function(req,res){res.sendfile("./views/ledrgb.html")}),io.on("connection",function(socket){socket.on("chat message",function(msg){io.emit("chat message",msg)}),socket.on("disconnect",function(){})}),http.listen(3e3,function(){});