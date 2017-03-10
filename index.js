var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var numberOfActiveConnections = 0;
app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
});

io.on('connection', function(socket){
    numberOfActiveConnections++;
    console.log("A user connected");
    io.emit('username', 'User'+numberOfActiveConnections);
    socket.on('disconnect', function(){
        console.log('User disconnected'); 
        numberOfActiveConnections--;
    });

    socket.on('chat message', function(username,message){
        socket.broadcast.emit('chat message', username, message);
    });

    socket.on('system message', function(message){
        io.emit('system message', message);
    });
});

http.listen(3000, function(){
    console.log('Listening on *:3000');
});