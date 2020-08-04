const sample = {
  setup: function ({ spectrum, peak, fft }) {
    this.spectrum = spectrum;
    this.peak = peak;
    this.fft = fft;
  },
  peak: undefined
};

export default sample;