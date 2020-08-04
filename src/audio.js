import sample from './sample.js';

const audioFile = '../audio/KimCosmik.wav';
const audioFormat = 'wav';

let fft;
let peakDetect;
let audioStream;

const audio = {
  sample: undefined,
  setup: function () {
    soundFormats(audioFormat);
    audioStream = loadSound(audioFile, function () {
      console.log('loaded', audioFile);
    });
    console.log('loading', audioFile);
    fft = new p5.FFT(0.8, 64);
    peakDetect = new p5.PeakDetect(20, 20000, 0.18, 1);
  },
  isReady: function () {
    return audioStream.isLoaded();
  },
  update: function () {
    // let spectrum = fft.analyze();
    // peakDetect.update(fft);
    // this.sample = sample.setup({ spectrum, peak: peakDetect.isDetected, fft });
    // return this.sample;
  },
  log: function () {
    // if (audioStream.duration) {
    //   console.log(
    //     '> ' +
    //     nf(audioStream.currentTime(), 4, 0) +
    //     ' / ' +
    //     nf(audioStream.duration(), 4, 0)
    //   );
    // }
  },
  isPlaying: function () {
    return audioStream && audioStream.isPlaying();
  },
  play: function () {
    console.log('play');
      setTimeout(function() {
        audioStream.play();
        console.log('playing');
      }, 200);
  },
  pause: function () {
    console.log('pause');
    audioStream.pause();
  },
  rwd: function () {
    audio.jump(
      audio.currentTime() - 10,
      audio.duration() - audio.currentTime() + 10
    );
  },
  ffwd: function () {
    audio.jump(
      audio.currentTime() + 10,
      audio.duration() - audio.currentTime() - 10
    );
  },
  // zero: function () {
  //   if (audio.duration) {
  //     audio.jump(0, audio.duration);
  //   }
  // },
};
export default audio;
