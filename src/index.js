import Layer from './layer.js';
import eqMixin from './eq.js';
import imgMixin from './img.js';
import spinMixin from './spin.js';

const sketch = (processing) => {
  let fft;
  let peakDetect;
  let audio;
  let layers = [];

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
    processing.soundFormats('wav');
    audio = processing.loadSound('../audio/lozsmall', () => {
      console.log('sound loaded');
    });
    layers.push(new Layer(processing, { ...imgMixin }));
    layers.forEach((layer) => {
      layer.preload();
    });
  };

  processing.setup = () => {
    processing.createCanvas(1280, 720);
    processing.frameRate(60);
    processing.background(0);
    fft = new p5.FFT(0.8, 256);
    peakDetect = new p5.PeakDetect(20, 20000, 0.2, 1);
    layers.push(new Layer(processing, { ...spinMixin }));
    layers.push(new Layer(processing, { ...eqMixin }));
    layers.forEach((layer) => {
      layer.setup();
    });
  };

  processing.draw = () => {
    processing.background(0);
    if (isPlaying()) {
      let spectrum = fft.analyze();
      peakDetect.update(fft);
      layers.forEach((layer) => {
        layer.draw(spectrum, peakDetect.isDetected, fft);
        processing.image(layer.layer, 0, 0);
      });
    }
    // if (processing.frameRate() < 20) {
    //   console.log(processing.frameRate());
    // }
  };

  processing.keyPressed = () => {
    if (ready()) {
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
          layers.forEach((layer) => layer.keyPressed());
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
