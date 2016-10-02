var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/css/main.css', function(req, res){
  res.sendFile(__dirname + '/css/main.css');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    var commandResponse = checkCommand(msg);
    if (commandResponse) {
        io.emit('chat message', commandResponse);
    } else {
        io.emit('chat message', msg);
    }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


function checkCommand(msg) {
    switch (msg) {
        case '/time':
            return new Date();
            break;
        default:
            return null;
    }
}
