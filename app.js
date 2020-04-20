let express = require('express');
let path = require('path');
let logger = require('morgan');
let socketio = require('socket.io')
let http = require('http');
let cors = require('cors')


const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketio(server);
let status = false

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('notChecked', (data) => {
        status = data.status
        emitSocket()
      });

    socket.on('newNot', (data) => {
        status = data.status
        emitSocket()
      });

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });

      emitSocket(socket)
  });



function emitSocket(){
    io.emit('getHit', {message: 'Server Sent Data', status})
}



server.listen(port, () => {console.log(`Listening to port ${port}`)});

module.exports = app;