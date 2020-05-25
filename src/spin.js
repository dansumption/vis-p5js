const spin = {
  setup() {
    const p5 = this.processing;
    this.layer.blendMode(p5.SOFT_LIGHT);
    this.layer.stroke(p5.color(192, 70, 0));
    this.layer.strokeWeight(3);

    this.layer.angleMode(p5.DEGREES);
    this.layer.imageMode(p5.CENTER);
    this.layer.translate(p5.width / 2, p5.height / 2);

    for (let i = 0; i < 1000; i++) {
      this.layer.point(
        p5.randomGaussian(0, 0.001) * p5.width - p5.width / 2,
        p5.randomGaussian(0, 0.001) * p5.height - p5.height / 2
      );
    }
  },
  draw(spectrum, isPeak, fft) {
    const p5 = this.processing;
    const energy = fft.getEnergy('bass', 'mid');
    const rotated = Object.create(this.layer);
    this.layer.rotate(Math.random() * 10);
    let blend;
    console.log(energy);
      if (energy < 225)
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
};

export default spin;
