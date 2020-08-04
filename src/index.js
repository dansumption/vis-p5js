import audio from './audio.js';
import layers from './layers.js';

let counter;
let setupRun = false;

window.preload = () => {
  layers.setup();
};

window.setup = () => {
  createCanvas(1280, 720);
  frameRate(40);
  background(0);

  audio.setup();
  layers.setup();
  setupRun = true;
  console.log('setup complete');
};

window.draw = () => {
  let sample;
  if (audio.isPlaying()) {
    background(0);
    sample = audio.update();
  }
  layers.update(sample);
};

window.keyTyped = () => {
  console.log("Key", keyCode);
  if (ready()) {
    switch (keyCode) {
      case ENTER:
        audio.play();
        break;
      case 32:
        if (audio.isPlaying()) {
          audio.pause();
        } else {
          try {
audio.play();
          } catch (error) {
            console.log('problem playing');
          }
          
        }
        break;
      case 188:
        audio.rwd();
        break;
      case 190:
        audio.ffwd();
        break;
      default:
        layers.keyTyped(keyCode);
    }
    // This code needs updating now that all layers are stored in layers.js
    //
    // if (48 <= keyCode <= 57) {
    //   const layerNum = keyCode - 48;
    //   if (layers[layerNum]) {
    //     layers[layerNum].layer.clear();
    //   }
    // }
  }
};

const ready = () => {
  return audio.isReady() && layers.isReady();
};
