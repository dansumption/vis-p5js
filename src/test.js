
const audioFile = '../audio/KimCosmik.wav';
let audioStream;
let playing = false;

window.setup = () => {
  createCanvas(640, 480);
  background(0,128,0)
  audioStream = loadSound(audioFile, function () {
    console.log('loaded', audioFile);
  });
  console.log('loading', audioFile);
};

window.draw = () => {
  if (!playing && audioStream.isLoaded()) {
    playing = true;
    console.log('play');
    audioStream.play();
    console.log('playing');
  }
};