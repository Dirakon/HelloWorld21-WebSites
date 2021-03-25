
const noteTable = {
    'C':523.3,
    'C#':554.4,
    'D':587.3,
    'D#':622.3,
    'E':659.3,
    'F':698.5,
    'F#':740.0,
    'G':784.0,
    'G#':830.6,
    'A':880.0,
    'A#':932.3,
    'H':987.8,
    'hC':1047,
    'hC#':1109,
    'hD':1175,
    'hD#':1245,
    'hE':1319
}

function keyClicked(event){
    alert(event);
}


let alreadyCameToBe = [];
let allWhites= document.getElementsByClassName("white");
let allBlacks = document.getElementsByClassName("black");
let allKeys = [...allWhites,...allBlacks];
for (let i = 0; i < allKeys.length;++i){
    let key = allKeys[i];
    let value = key.innerHTML;
    if (alreadyCameToBe.includes(value)){
        value = 'h' + value;
    }else{
        alreadyCameToBe.push(value);
    }
    key.id=value;
    key.onclick=function () {
        playSound(noteTable[value]);
    };
}


function playSound(frequency) {
    let audioContext = new AudioContext()
    let oscillator = audioContext.createOscillator()
    let  gain = audioContext.createGain()
    oscillator.connect(gain)
    gain.connect(audioContext.destination)
    //let frequency = 523.3
    oscillator.frequency.value = frequency
    oscillator.start(0)
    gain.gain.exponentialRampToValueAtTime(
        0.00001, audioContext.currentTime + 10
    )
}
