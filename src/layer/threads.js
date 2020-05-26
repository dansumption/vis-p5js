import colorUtils from '../colors.js';
const name = 'threads';

const threads = {
  setup: function () {
    const numCells = 32;
    this.cells = [];
    for (let i = 0; i < numCells; i++) {
      this.cells.push(
        this.spawnParticle({
          size: Math.random() * 10,
          color: colorUtils.getBlackOrWhite(this.processing, 10),
        })
      );
    }
  },
  draw: function (spectrum, isPeak, fft) {
    const energy = fft.getEnergy('bass', 'mid');

    this.layer.strokeWeight(1);
    this.layer.noFill();
    this.cells.forEach((cell) => {
      cell.vector.limit(((isPeak ? 5 : 0.5) * energy) / 8);
      this.moveParticle(cell);
      cell.vector.add(p5.Vector.random2D());
      this.layer.stroke(cell.color);
      this.layer.push();
      this.layer.translate(cell.x, cell.y);

      const spikes = energy;
      const innerSize = cell.size * isPeak ? 8 : 32;
      const outerSize = (innerSize * energy) / 2;
      const increment = this.processing.TWO_PI / spikes;

      for (let angle = 0; angle < this.processing.TWO_PI; angle += increment)
        this.layer.triangle(
          innerSize * this.processing.cos(angle),
          innerSize * this.processing.sin(angle),
          (outerSize * this.processing.cos(angle + spikes)) / 2,
          (outerSize * this.processing.sin(angle + spikes)) / 2,
          innerSize * this.processing.cos(angle + spikes),
          innerSize * this.processing.sin(angle + spikes)
        );

      // for (let angle=0;angle<this.processing.TWO_PI;angle += increment)
      // layer.bezier(
      //   innerSize*this.processing.cos(angle), innerSize*this.processing.sin(angle),
      //   outerSize*this.processing.cos(angle - increment +spikes)/2, outerSize*this.processing.sin(angle - increment+spikes)/2,
      //   outerSize*this.processing.cos(angle + increment +spikes)/2, outerSize*this.processing.sin(angle + increment+spikes)/2,
      //   innerSize*this.processing.cos(angle+spikes), innerSize*this.processing.sin(angle+spikes)
      // );
      this.layer.pop();
    });
  },
  keyTyped: function () {},
};

export default threads;
