import Layer from './layer.js';
import eqMixin from './layer/eq.js';
import imgMixin from './layer/img.js';
import wormsMixin from './layer/worms.js';
import spinMixin from './layer/spin.js';
import threadsMixin from './layer/threads.js';

const audioFile = '../audio/lozsmall';
const audioFormat = 'wav';

const sketch = (processing) => {
  let fft;
  let peakDetect;
  let audio;
  let layers = [];
  let setupRun = false;

  const isPlaying = () => {
    return audio && audio.isPlaying();
  };
  const play = () => {
    audio.play();
  };
  const pause = () => {
    audio.pause();
  };

  processing.preload = () => {
    audio = processing.loadSound(audioFile, () => {
      console.log('sound loaded');
    });

    // layers.push(new Layer(processing, { ...imgMixin }));
    layers.push(new Layer(processing, { name: 'threads', ...threadsMixin }));
    layers.push(new Layer(processing, { name: 'worms', ...wormsMixin }));
    layers.push(
      new Layer(processing, {
        name: 'spin',
        visible: false,
        showPercentage: 1,
        hidePercentage: 0.4,
        ...spinMixin,
      })
    );
    layers.push(
      new Layer(processing, {
        name: 'eq',
        visible: false,
        showPercentage: 0.1,
        hidePercentage: 0.1,
        ...eqMixin,
      })
    );

    layers.forEach((layer) => {
      layer.preload();
    });
  };

  processing.setup = () => {
    processing.createCanvas(1280, 720);
    processing.frameRate(60);
    processing.background(0);
    setupRun = true;
    processing.soundFormats(audioFormat);
    fft = new p5.FFT(0.8, 256);
    peakDetect = new p5.PeakDetect(20, 20000, 0.18, 1);
    layers.forEach((layer) => {
      layer.setup();
    });
    console.log('setup complete');
  };

  processing.draw = () => {
    processing.background(0);
    if (isPlaying()) {
      let spectrum = fft.analyze();
      peakDetect.update(fft);
      layers.forEach((layer) => {
        layer.showHide();
        // console.log(layer.name , layer.visible);
        if (layer.visible) {
          layer.draw(spectrum, peakDetect.isDetected, fft);
          processing.image(layer.layer, 0, 0);
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
      layers.reduce((prev = true, layer) => prev && layer.ready())
    );
  };
};

const myP5 = new p5(sketch);
