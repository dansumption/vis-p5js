const backdrop = {
  setup: function () {
    this.layer = createGraphics(width, width);
  },
  draw: function (spectrum, isPeak, fft) {
    const energy = fft.getEnergy('bass', 'mid');
    const energyDiff = energy - this.lastEnergy;
    const level = (255 - energy);
    const alpha = Math.abs(energyDiff / 255);
    this.layer.fill(level, level, level, alpha);
    this.layer.rect(0, 0, width, height);
    this.lastEnergy = energy;
  },
  
  keyTyped: function () {},
};

export default backdrop;
