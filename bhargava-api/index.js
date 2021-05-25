var express = require('express');
var cors = require('cors');
var socket = require('socket.io');
var rxjs = require('rxjs');
var common = require('./core/common/common');
var PORT = 5000;


// App setup
var app = express();
app.use(cors());

var server = app.listen(PORT, function () {
      console.log('Listening request from PORT ' + PORT);
      console.log('http://localhost:5000');
});

//Static Files
app.use(express.static('public'));

//Socket Setup
var io = socket(server);

io.on('connection', function (socket) {
      console.log('made socket connection', socket.id);

      socket.on('speakNumbers', function (data) {
            common.speakStart(data.text, speakCallback.bind(data));
      });

      socket.on('stopNumbers', function (data) {
            common.speakStop(data.text);
      });

      function speakCallback(err) {
            if (err) {
                  return console.error(err);
            }

            rxjs.timer(500).subscribe(t => {
                  socket.emit('speakDone', this);
            });
      };
});

