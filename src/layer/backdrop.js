const backdrop = {
  setup: function () {
    this.layer = createGraphics(width, width);
  },
  draw: function (spectrum, isPeak, fft) {
    const energy = fft.getEnergy('bass', 'mid');
    const level = (255 - energy);
    this.layer.fill(level, level, level, 23);
    this.layer.rect(0, 0, width, height);
  },
  keyTyped: function () {},
};

export default backdrop;
