import Layer from './layer.js';
import eqMixin from './layer/eq.js';
import flowersMixin from './layer/flowers.js';
import imgMixin from './layer/img.js';
import wormsMixin from './layer/worms.js';
import spinMixin from './layer/spin.js';
import threadsMixin from './layer/threads.js';

const audioFile = '../audio/ice1.wav';
const audioFormat = 'wav';
let counter;

const setupLayers = function(layers) {
  // layers.push(new Layer({ name: 'blobs', ...flowersMixin }));
  // layers.push(new Layer({ name: 'img', ...imgMixin }));
  // layers.push(
  //   new Layer({
  //     name: 'queenimage',
  //     src: '../img/ice/queen/queen',
  //     format: 'jpg',
  //     numImages: 1,
  //     max: 1,
  //     newImgChance: 0.23,
  //     glitchChance: 0.23,
  //     visible: true,
  //     grow: true,
  //     showPercentage: 25,
  //     hidePercentage: 1,
  //     beatMultiplier: 1,
  //     ...imgMixin
  //   })
  // );
  layers.push(new Layer({ name: 'threads', ...threadsMixin }));
  // layers.push(
  //   new Layer({
  //     name: 'worms2',
  //     visible: true,
  //     showPercentage: 0.5,
  //     hidePercentage: 4,
  //     ...wormsMixin,
  //   })
  // );
  layers.push(
    new Layer({
      name: 'worms',
      visible: true,
      showPercentage: 113,
      hidePercentage: 2,
      ...wormsMixin
    })
  );
  // layers.push(
  //   new Layer({
  //     name: 'spin',
  //     visible: false,
  //     showPercentage: 1,
  //     hidePercentage: 1.5,
  //     beatMultiplier: 4,
  //     renderHidden: true,
  //     ...spinMixin
  //   })
  // );
  // layers.push(
  //   new Layer({
  //     name: 'img2',
  //     src: '../img/ice/image',
  //     format: 'jpg',
  //     numImages: 29,
  //     max: 29,
  //     newImgChance: 0.23,
  //     glitchChance: 0.69,
  //     visible: true,
  //     showPercentage: 0.001,
  //     hidePercentage: 3,
  //     beatMultiplier: 100000,
  //     ...imgMixin
  //   })
  // );
  // layers.push(
  //   new Layer({
  //     name: 'blob flowers',
  //     visible: false,
  //     showPercentage: 100,
  //     hidePercentage: 0,
  //     beatMultiplier: 1,
  //     ...flowersMixin
  //   })
  // );
  layers.push(
    new Layer({
      name: 'eq',
      visible: false,
      showPercentage: 0.001,
      hidePercentage: 3.4,
      beatMultiplier: 1000,
      ...eqMixin
    })
  );
};

let fft;
let peakDetect;
let audio;
let layers = [];
let setupRun = false;

const isPlaying = () => {
  return audio && audio.isPlaying();
};
const play = () => {
  console.log('play');
  audio.play();
};
const pause = () => {
  console.log('pause');
  audio.pause();
};

window.preload = () => {
  setupLayers(layers);

  layers.forEach(layer => {
    layer.preload();
  });
};

window.setup = () => {
  createCanvas(1280, 720);
  frameRate(60);
  background(0);

  layers.forEach(layer => {
    layer.createGraphics(width, height);
  });

  audio = loadSound(audioFile, () => {
    console.log('sound loaded');
  });
  // counter = document.createTextNode('...'); // Create a text node
  // document.body.appendChild(counter);

  setupRun = true;
  soundFormats(audioFormat);
  fft = new p5.FFT(0.8, 64);
  peakDetect = new p5.PeakDetect(20, 20000, 0.18, 1);
  layers.forEach(layer => {
    layer.setup();
  });
  console.log('setup complete');
};

window.draw = () => {
  if (isPlaying()) {
      background(0);
    console.log(
      '> ' + nf(audio.currentTime(), 4, 0) + ' / ' + nf(audio.duration(), 4, 0)
    );
    let spectrum = fft.analyze();
    peakDetect.update(fft);
    layers.forEach(layer => {
      layer.showHide(peakDetect.isDetected);
      // console.log(layer.name , layer.visible);
      if (layer.visible || layer.renderHidden) {
        layer.draw(spectrum, peakDetect.isDetected, fft);
        if (layer.visible) {
          image(layer.layer, 0, 0);
        }
      }
    });
  }
  // if (frameRate() < 20) {
  //   console.log(frameRate());
  // }
};

window.keyTyped = () => {
  if (ready()) {
    if (48 <= keyCode <= 57) {
      const layerNum = keyCode - 48;
      if (layers[layerNum]) {
        layers[layerNum].layer.clear();
      }
    }
    switch (keyCode) {
      case ENTER:
        play();
        break;
      case 32:
        if (isPlaying()) {
          pause();
        } else {
          play();
        }
        break;
      case 188:
        audio.jump(audio.currentTime() - 10, audio.duration() - audio.currentTime() + 10);

      case 190:
        audio.jump(
          audio.currentTime() + 10,
          audio.duration() - audio.currentTime() - 10
        );

      default:
        layers.forEach(layer => layer.keyTyped());
    }
  }
};

const ready = () => {
  return (
    audio &&
    audio.isLoaded() &&
    layers.reduce((prev = true, layer) => {
      // console.log(layer.name, layer.ready());
      return prev && layer.ready();
    })
  );
};
