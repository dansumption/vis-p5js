import Layer from './layer.js';
import eqMixin from './layer/eq.js';
import flowersMixin from './layer/flowers.js';
import imgMixin from './layer/img.js';
import wormsMixin from './layer/worms.js';
import spinMixin from './layer/spin.js';
import threadsMixin from './layer/threads.js';

const audioFile = '../audio/hybrid/Myoptik.wav';
const audioFormat = 'wav';
let counter;

const sketch = (processing) => {
  const setupLayers = function (layers) {
    // layers.push(new Layer(processing, { name: 'blobs', ...flowersMixin }));
    // layers.push(new Layer(processing, { name: 'img', ...imgMixin }));
    layers.push(
      new Layer(processing, {
        name: 'worms',
        visible: true,
        showPercentage: 4,
        hidePercentage: 2,
        ...wormsMixin,
      })
    );
    layers.push(new Layer(processing, { name: 'threads', ...threadsMixin }));
        layers.push(
          new Layer(processing, {
            name: 'worms',
            visible: true,
            showPercentage: 0.5,
            hidePercentage: 4,
            ...wormsMixin,
          })
        );
    layers.push(
      new Layer(processing, {
        name: 'spin',
        visible: false,
        showPercentage: 1,
        hidePercentage: 1.5,
        beatMultiplier: 4,
        renderHidden: true,
        ...spinMixin,
      })
    );
    layers.push(
      new Layer(processing, {
        name: 'blob flowers',
        visible: false,
        showPercentage: 30,
        hidePercentage: 10,
        beatMultiplier: 5,
        ...flowersMixin,
      })
    );
    layers.push(
      new Layer(processing, {
        name: 'img2',
        visible: false,
        showPercentage: 0.1,
        hidePercentage: 8,
        beatMultiplier: 350,
        ...imgMixin,
      })
    );
    layers.push(
      new Layer(processing, {
        name: 'eq',
        visible: false,
        showPercentage: 2,
        hidePercentage: 10,
        beatMultiplier: 50,
        ...eqMixin,
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

  processing.preload = () => {
    audio = processing.loadSound(audioFile, () => {
      console.log('sound loaded');
    });
    setupLayers(layers);

    layers.forEach((layer) => {
      layer.preload();
    });
  };

  processing.setup = () => {
    counter = document.createTextNode('...'); // Create a text node
    // document.body.appendChild(counter);
    processing.createCanvas(1280, 720);
    processing.frameRate(60);
    processing.background(0);
    setupRun = true;
    processing.soundFormats(audioFormat);
    fft = new p5.FFT(0.8, 64);
    peakDetect = new p5.PeakDetect(20, 20000, 0.18, 1);
    layers.forEach((layer) => {
      layer.setup();
    });
    console.log('setup complete');
  };

  processing.draw = () => {
    processing.background(0);
    if (isPlaying()) {
      console.log(
        '> ' +
          processing.nf(audio.currentTime(), 4, 0) +
          ' / ' +
          processing.nf(audio.duration(), 4, 0)
      );
      let spectrum = fft.analyze();
      peakDetect.update(fft);
      layers.forEach((layer) => {
        layer.showHide(peakDetect.isDetected);
        // console.log(layer.name , layer.visible);
        if (layer.visible || layer.renderHidden) {
          layer.draw(spectrum, peakDetect.isDetected, fft);
          if (layer.visible) {
            processing.image(layer.layer, 0, 0);
          }
        }
      });
    }
    // if (processing.frameRate() < 20) {
    //   console.log(processing.frameRate());
    // }
  };

  processing.keyTyped = () => {
    if (ready()) {
      if (48 <= processing.keyCode <= 57) {
        const layerNum = processing.keyCode - 48;
        if (layers[layerNum]) {
          layers[layerNum].layer.clear();
        }
      }
      switch (processing.keyCode) {
        case processing.ENTER:
          play();
          break;
        case 32:
          if (isPlaying()) {
            pause();
          } else {
            play();
          }
          break;
        default:
          layers.forEach((layer) => layer.keyTyped());
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
};

const myP5 = new p5(sketch);
