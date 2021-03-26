
const noteToFrequencyTable = {
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

let alreadyCameToBe = [];
let allWhites= document.getElementsByClassName("white");
let allBlacks = document.getElementsByClassName("black");
let allKeys = [...allWhites,...allBlacks];
for (let i = 0; i < allKeys.length;++i){
    let key = allKeys[i];
    if (alreadyCameToBe.includes(key.innerHTML)){
        key.id = 'h' +  key.innerHTML;
    }else{
        key.id = key.innerHTML;
        alreadyCameToBe.push(key.id);
    }
    key.onclick=function () {
        playSound(noteToFrequencyTable[key.id]);
    };
}


function playSound(frequency) {
    let audioContext = new AudioContext()
    let oscillator = audioContext.createOscillator()
    let  gain = audioContext.createGain()
    oscillator.connect(gain)
    gain.connect(audioContext.destination)
    oscillator.start(0)


    oscillator.frequency.value = frequency
    gain.gain.exponentialRampToValueAtTime(
        0.00001, audioContext.currentTime + 10
    )
}
