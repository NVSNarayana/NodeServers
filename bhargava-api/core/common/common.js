// https://ourcodeworld.com/articles/read/305/how-to-convert-synthesize-text-to-speech-in-node-js
var say = require('say');

function speakStart(data, cb){
      console.log('data: ', data);
      say.speak(data, null, null, cb);
}

function speakStop(){
      say.stop();
}

module.exports =  {speakStart, speakStop};