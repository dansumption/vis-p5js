import colorUtils from '../colors.js';

let threshold = 230;

const spin = {
  setup: function () {
    // this.layer.blendMode(HARD_LIGHT);
    this.layer.stroke(colorUtils.getSecondary(20));
    this.layer.strokeWeight(2);

    this.layer.angleMode(DEGREES);
    this.layer.imageMode(CENTER);
    this.layer.translate(width / 2, height / 2);

    for (let i = 0; i < 1000; i++) {
      this.layer.point(
        randomGaussian(0, 0.001) * width - width / 2,
        randomGaussian(0, 0.001) * height - height / 2
      );
    }
          
    this.baseLayer = Object.create(this.layer);
  },
  draw: function (spectrum, isPeak, fft) {
      this.showHide();
      if (this.visible) {

        const energy = fft.getEnergy('bass', 'mid');
        const rotated = Object.create(this.baseLayer);
        this.layer.rotate(Math.random() * 8);
        let blend;
        if (energy < threshold) {
          blend = REMOVE;
          // rotated.tint(255, 239, 0);
        } else {
          blend = DARKEST;
          // rotated.tint(239, 0, 0);
        }
        this.layer.blendMode(blend);
        const noiseX = noise(Math.random() / 100) * 10 - 5;
        const noiseY = noise(Math.random() / 100) * 10 - 5;
        this.layer.translate(noiseX, noiseY);
        this.layer.image(rotated, 0, 0);
      } else {
        // this.layer.clear;
      }
  },
  keyTyped: function () {
    switch (keyCode) {
      case 188:
        threshold = Math.max(threshold - 10, 0);
        break;
      case 190:
        threshold = Math.min(threshold + 10, 255);
        break;
    }
    console.log('spin threshold:', threshold);
  },
};

export default spin;
