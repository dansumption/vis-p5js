import colorUtils from '../colors.js';

const threads = {
  setup: function () {
    this.layer = this.processing.createGraphics(
      this.processing.width,
      this.processing.width
    );
    this.spawn();
  },
  spawn: function () {
    const numCells = Math.random() * 4 + 2;
    this.cells = [];
    const sharp = Math.random() > 0.23 ? 1 : 0;
    const alpha = sharp ? 3 : 1;
    for (let i = 0; i < numCells; i++) {
      this.cells.push(
        this.spawnParticle({
          size: Math.random() * 123 + 69 * sharp,
          color: colorUtils.alternate(this.processing, i, alpha),
          bounce: false,
          spikes: Math.random() * 5 + Math.random() * 5 + 1,
          sharp,
        })
      );
    }
  },
  draw: function (spectrum, isPeak, fft) {
    const energy = fft.getEnergy('bass', 'mid');
    if (Math.random() < 0.000123) {
      this.layer.clear();
      this.spawn();
    } else if (Math.random() < 0.23) {
      // do nothing;
    } else {
      this.layer.strokeWeight(1);
      this.layer.noFill();
      this.cells.forEach((cell) => {
        cell.vector.limit((isPeak ? 15 : 0.5) * energy);
        this.moveParticle(cell);
        const dx = cell.x - this.processing.width / 2;
        const dy = cell.y - this.processing.height / 2;
        let angle = Math.atan(dy / dx);
        angle *= 180 / Math.PI;
        const circleVector = this.processing.createVector(
          Math.cos(angle) + Math.random() * 0.2 - 0.1,
          Math.sin(angle) + Math.random() * 0.2 - 0.1
        );
        cell.vector = circleVector;
        cell.vector.add(p5.Vector.random2D().mult(energy / 23));
        this.layer.stroke(cell.color);
        this.layer.push();
        this.layer.translate(cell.x, cell.y);

        const innerSize =
          cell.size * isPeak ? Math.random() * 23 + 1 : Math.random() * 69 + 1;
        const outerSize = (innerSize * energy) / 23;
        const increment = this.processing.TWO_PI / cell.spikes;

        for (let angle = 0; angle < this.processing.TWO_PI; angle += increment)
          // triangle version
          if (cell.sharp === 1) {
            this.layer.triangle(
              innerSize * this.processing.cos(angle) + Math.random() * 24 - 1,
              innerSize * this.processing.sin(angle) + Math.random() * 24 - 1,
              (outerSize * this.processing.cos(angle + cell.spikes)) / 2 +
                Math.random() * 24 -
                1,
              (outerSize * this.processing.sin(angle + cell.spikes)) / 2 +
                Math.random() * 24 -
                1,
              innerSize * this.processing.cos(angle + cell.spikes) +
                Math.random() * 24 -
                1,
              innerSize * this.processing.sin(angle + cell.spikes) +
                Math.random() * 24 -
                1
            );
          }

          // curly version
          else {
            for (
              let angle = 0;
              angle < this.processing.TWO_PI;
              angle += increment
            )
              this.layer.bezier(
                innerSize * this.processing.cos(angle),
                innerSize * this.processing.sin(angle),
                (outerSize *
                  this.processing.cos(angle - increment + cell.spikes)) /
                  2,
                (outerSize *
                  this.processing.sin(angle - increment + cell.spikes)) /
                  2,
                (outerSize *
                  this.processing.cos(angle + increment + cell.spikes)) /
                  2,
                (outerSize *
                  this.processing.sin(angle + increment + cell.spikes)) /
                  2,
                innerSize * this.processing.cos(angle + cell.spikes),
                innerSize * this.processing.sin(angle + cell.spikes)
              );
          }
        this.layer.pop();
      });
    }
  },
  keyTyped: function () {},
};

export default threads;
