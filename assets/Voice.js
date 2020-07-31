const btn = document.getElementById('btn');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
var text = ''
recognition.lang = 'en-IN'
recognition.continuous = true;

recognition.onstart = function () {
    document.getElementById('instructions').innerHTML = "<strong>Voice recognition activated</strong>. Try speaking into the microphone.";
}

recognition.onspeechend = function () {
    console.log('You were quiet for a while so voice recognition turned itself off.');
    document.getElementById('instructions').innerHTML = 'You were quiet for a while so voice recognition turned itself off';
}

recognition.onresult = function (event) {
    transcript = event.results[event.resultIndex][0].transcript;

    // Add the current transcript to the contents of our Note.
    // There is a weird bug on mobile, where everything is repeated twice.
    // There is no official solution so far so we have to handle an edge case.
    var mobileRepeatBug = (event.resultIndex == 1 && transcript == event.results[0][0].transcript);

    if (!mobileRepeatBug) {
        text = text + transcript + ' ';
        document.getElementById('result').innerHTML = text;
        read(transcript);
    }
}

function read(text) {
    var speech = new SpeechSynthesisUtterance();
    speech.text = text;
    // if (text.includes('time'))
    //     speech.text = 'It is ' + new Date().getHours() + " " + new Date().getMinutes() + " right now";
    // else if (text.includes('my birthday'))
    //     speech.text = 'Do you think you\'re famous! How the heck would I know your birthday!';
    // else if (text.includes('love me'))
    //     speech.text = 'Of course, not! You piece of junk!';
    window.speechSynthesis.speak(speech);
}

function saveNote() {
    var content = document.getElementById('result').innerHTML;
    var dateTime = new Date().toLocaleString();
    localStorage.setItem('Note - ' + dateTime, content);
    read('Note saved successfully')
    location.reload()
}

function fun(text) {
    var speech = new SpeechSynthesisUtterance();
    speech.text = text;
    if (text.includes('time'))
        speech.text = 'It is ' + new Date().getHours() + " " + new Date().getMinutes() + " right now";
    else if (text.includes('my birthday'))
        speech.text = 'Do you think you\'re famous! How the heck would I know your birthday!';
    else if (text.includes('love me'))
        speech.text = 'Of course, not! You piece of junk!';
    window.speechSynthesis.speak(speech);
}

var date = document.getElementById('date');

function myListen(key) {
    read(localStorage.getItem(key))
}




