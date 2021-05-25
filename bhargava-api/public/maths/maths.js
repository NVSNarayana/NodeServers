// Make socket connection
var socket = io.connect('http://localhost:5000');

function eleById(id) {
      return document.getElementById(id);
}

function elesByClass(className) {
      return document.getElementsByClassName(className);
}

var currentResult=0;
var intervalSub;

// Evemts from client
rxjs.fromEvent(eleById('btnStart'), 'click').subscribe(v => {
      startSpeak();
});

rxjs.fromEvent(eleById('btnStop'), 'click').subscribe(v => {
      intervalSub.unsubscribe();
});

rxjs.fromEvent(eleById('btnReset'), 'click').subscribe(v => {
      currentResult=0;
      intervalSub.unsubscribe();
      startSpeak();
});

function startSpeak(){
      intervalSub=   rxjs.interval(2000).subscribe(t=>{
            currentResult = currentResult+1;
            eleById('currentResult').innerHTML = currentResult;
            socket.emit('speakNumbers', { text: currentResult});
      });
}

// Listen Server Socket Events

socket.on('displayNumbers', function (data) {
      console.log(data);
     // chatOutput.innerHTML = '<br>' + JSON.stringify(data) + chatOutput.innerHTML;
});
