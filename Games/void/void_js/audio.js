const audioCtx =
new (
window.AudioContext ||
window.webkitAudioContext
)();

function playTone(

freq,
duration=0.03,
type="square",
volume=0.05

){

const osc =
audioCtx.createOscillator();

const gain =
audioCtx.createGain();

osc.type = type;

osc.frequency.value =
freq;

osc.connect(gain);

gain.connect(
audioCtx.destination
);

gain.gain.value =
volume;

gain.gain.exponentialRampToValueAtTime(
0.0001,
audioCtx.currentTime + duration
);

osc.start();

osc.stop(
audioCtx.currentTime + duration
);

}