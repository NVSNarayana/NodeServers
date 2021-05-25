// Make socket connection
var socket = io.connect('http://localhost:5000');

function eleById(id) {
      return document.getElementById(id);
}

function elesByClass(className) {
      return document.getElementsByClassName(className);
}

// Evemts from client
rxjs.fromEvent(eleById('btnStart'), 'click').subscribe(v => {
      startSpeak();
});

rxjs.fromEvent(eleById('btnStop'), 'click').subscribe(v => {
      intervalSub.unsubscribe();
});

// Normal functions
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
const alphabets = range('A'.charCodeAt(0), 'Z'.charCodeAt(0), 1).map(x => String.fromCharCode(x));

var currentResult=0;
var intervalSub;
function startSpeak(){
      intervalSub=   rxjs.interval(2000).subscribe(t=>{
            if(currentResult === alphabets.length-1){
                  intervalSub.unsubscribe();
            }
            var alphabet = alphabets[currentResult];
            eleById('currentResult').innerHTML = alphabet;
            socket.emit('speakNumbers', { text: alphabet});
            currentResult = currentResult+1;
      });
}

// Listen Server Socket Events

socket.on('displayNumbers', function (data) {
      console.log(data);
     // chatOutput.innerHTML = '<br>' + JSON.stringify(data) + chatOutput.innerHTML;
});
