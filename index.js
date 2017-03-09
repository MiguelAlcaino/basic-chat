var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
});

io.on('connection', function(socket){
    console.log("A user connected");
    socket.on('disconnect', function(){
        console.log('User disconnected');
    });

    socket.on('chat message', function(msg){
        console.log('Message: '+msg);
        io.emit('chat message',msg);
    });
});

http.listen(3000, function(){
    console.log('Listening on *:3000');
});