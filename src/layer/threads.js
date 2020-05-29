import colorUtils from '../colors.js';

const threads = {
  setup: function () {
    this.layer = this.processing.createGraphics(
      this.processing.width,
      this.processing.width
    );
    const numCells = 3;
    this.cells = [];
    for (let i = 0; i < numCells; i++) {
      this.cells.push(
        this.spawnParticle({
          size: Math.random() * 70 + 30,
          color: colorUtils.alternate(this.processing, i, 7),
          bounce: false,
        })
      );
    }
  },
  draw: function (spectrum, isPeak, fft) {
    const energy = fft.getEnergy('bass', 'mid');
    if (Math.random() < 0.0005) {
      this.layer.clear();
    } else if (Math.random() < 0.7) {
      // do nothing;
    } else {
      this.layer.strokeWeight(1);
      this.layer.noFill();
      this.cells.forEach((cell) => {
        cell.vector.limit(((isPeak ? 15 : 0.5) * energy) / 8);
        this.moveParticle(cell);
        const dx = cell.x - this.processing.width / 2;
        const dy = cell.y - this.processing.height / 2;
        let angle = Math.atan(dy / dx);
        angle *= 180 / Math.PI;
        const circleVector = this.processing.createVector(
          Math.cos(angle),
          Math.sin(angle)
        );
        cell.vector = circleVector;
        cell.vector.add(p5.Vector.random2D());
        this.layer.stroke(cell.color);
        this.layer.push();
        this.layer.translate(cell.x, cell.y);

        const spikes = energy / 46;
        const innerSize = cell.size * isPeak ? 4 : 16;
        const outerSize = innerSize * energy;
        const increment = this.processing.TWO_PI / spikes;

        for (let angle = 0; angle < this.processing.TWO_PI; angle += increment)
          // triangle versio
          // this.layer.triangle(
          //   innerSize * this.processing.cos(angle),
          //   innerSize * this.processing.sin(angle),
          //   (outerSize * this.processing.cos(angle + spikes)) / 2,
          //   (outerSize * this.processing.sin(angle + spikes)) / 2,
          //   innerSize * this.processing.cos(angle + spikes),
          //   innerSize * this.processing.sin(angle + spikes)
          // );

        // curly version 
        for (let angle=0;angle<this.processing.TWO_PI;angle += increment)
        this.layer.bezier(
          innerSize*this.processing.cos(angle), innerSize*this.processing.sin(angle),
          outerSize*this.processing.cos(angle - increment +spikes)/2, outerSize*this.processing.sin(angle - increment+spikes)/2,
          outerSize*this.processing.cos(angle + increment +spikes)/2, outerSize*this.processing.sin(angle + increment+spikes)/2,
          innerSize*this.processing.cos(angle+spikes), innerSize*this.processing.sin(angle+spikes)
        );
        this.layer.pop();
      });
    }
  },
  keyTyped: function () {},
};

export default threads;
