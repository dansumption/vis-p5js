const spin = {
  name: 'spin',
  threshold: 230,
  setup: function () {
    this.threshold = 230;
    const p5 = this.processing;
    this.layer.blendMode(p5.SOFT_LIGHT);
    this.layer.stroke(p5.color(192, 70, 0));
    this.layer.strokeWeight(3);

    this.layer.angleMode(p5.DEGREES);
    this.layer.imageMode(p5.CENTER);
    this.layer.translate(p5.width / 2, p5.height / 2);

    this.baseLayer = Object.create(this.layer);

    for (let i = 0; i < 1000; i++) {
      this.layer.point(
        p5.randomGaussian(0, 0.001) * p5.width - p5.width / 2,
        p5.randomGaussian(0, 0.001) * p5.height - p5.height / 2
      );
    }
  },
  draw: function(spectrum, isPeak, fft){
    const p5 = this.processing;
    const energy = fft.getEnergy('bass', 'mid');
    const rotated = Object.create(this.baseLayer);
    this.layer.rotate(Math.random() * 10);
    let blend;
      if (energy < this.threshold)
      {
        blend = p5.REMOVE;
        // this.layer.tint(192, 70, 0)
      } else {
        blend = p5.SOFT_LIGHT;
        // rotated.tint(255, 255, 255, energy);
      }
    this.layer.blendMode(blend);
    const noiseX = p5.noise(Math.random() / 100) * 10 - 5;
    const noiseY = p5.noise(Math.random() / 100) * 10 - 5;
    this.layer.translate(noiseX, noiseY);
    this.layer.image(rotated, 0, 0);
  },
  keyTyped: function(){
    const processing = this.processing;
    switch (processing.keyCode) {
      case 188:
        this.threshold = Math.max(this.threshold - 1, 0);
        break;
      case 190:
        this.threshold = Math.min(this.threshold + 1, 255);
        break;
    }
    console.log(this.threshold);
  },
  baseLayer: null
}

export default spin;
