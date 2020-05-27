let threshold = 230;

const spin = {
  setup: function () {
    const p5 = this.processing;
    // this.layer.blendMode(p5.HARD_LIGHT);
    this.layer.stroke(p5.color(0));
    this.layer.strokeWeight(2);

    this.layer.angleMode(p5.DEGREES);
    this.layer.imageMode(p5.CENTER);
    this.layer.translate(p5.width / 2, p5.height / 2);

    for (let i = 0; i < 1000; i++) {
      this.layer.point(
        p5.randomGaussian(0, 0.001) * p5.width - p5.width / 2,
        p5.randomGaussian(0, 0.001) * p5.height - p5.height / 2
      );
    }
          
    this.baseLayer = Object.create(this.layer);
  },
  draw: function (spectrum, isPeak, fft) {
    if (this.processing) {
      this.showHide();
      if (this.visible) {

        const p5 = this.processing;
        const energy = fft.getEnergy('bass', 'mid');
        const rotated = Object.create(this.baseLayer);
        this.layer.rotate(Math.random() * 10);
        // let blend;
        // if (energy < threshold) {
        //   blend = p5.REMOVE;
        //   // this.layer.tint(192, 70, 0)
        // } else {
        //   blend = p5.DARKEST;
        //   // rotated.tint(255, 255, 255, energy);
        // }
        // this.layer.blendMode(blend);
        const noiseX = p5.noise(Math.random() / 100) * 10 - 5;
        const noiseY = p5.noise(Math.random() / 100) * 10 - 5;
        this.layer.translate(noiseX, noiseY);
        this.layer.image(rotated, 0, 0);
      } else {
        // this.layer.clear;
      }
    }
  },
  keyTyped: function () {
    const processing = this.processing;
    switch (processing.keyCode) {
      case 188:
        threshold = Math.max(threshold - 1, 0);
        break;
      case 190:
        threshold = Math.min(threshold + 1, 255);
        break;
    }
    console.log('spin threshold:', threshold);
  },
};

export default spin;
