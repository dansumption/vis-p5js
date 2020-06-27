import colorUtils from '../colors.js';
import Glitch from '../glitch.js';

const threads = {
  setup: function () {
    this.layer = createGraphics(width, width);
    this.spawn(1);
  },
  spawn: function (energy = 1) {
    const numCells = Math.ceil(energy / 23) + Math.random() * 5 + 2;
    this.cells = [];
    const sharp = Math.random() > 0.23 ? 1 : 0;
    const alpha = sharp ? 3 : 1;
    for (let i = 0; i < numCells; i++) {
      this.cells.push(
        this.spawnParticle({
          size: Math.random() * 123 + 69 * sharp,
          color: colorUtils.alternate(i, alpha),
          bounce: false,
          spikes: Math.random() * 10 + Math.random() * 10 + 1,
          sharp,
        })
      );
    }
  },
  startFade: function () {
    this.fading = true;
    this.fades = 0;
    this.layer.fill(0, 0, 0, 23);
    this.layer.rect(0, 0, width, height);
  },
  fade: function (energy) {
    if (this.fades++ > 512) {
      this.endFade(energy);
    } else if (this.fades === 46) {
      this.spawn(energy);
    }
    const alpha = 5 - energy / 20; // Math.ceil(this.fades / 500 + 2.43);
    this.layer.fill(0, 0, 0, alpha);
    this.layer.rect(0, 0, width, height);
  },
  endFade: function (energy) {
    this.fading = false;
    this.spawn(energy);
  },
  instaFade: function (energy) {
    const alpha = Math.random() * 3.3 + (255 - energy) * 0.08;
    this.layer.fill(0, 0, 0, alpha);
    this.layer.rect(0, 0, width, height);
  },
  draw: function (spectrum, isPeak, fft) {
    const energy = fft.getEnergy('bass', 'mid');
    // if (
    //   ((!this.fading || this.fades > 42) && energy < 100) ||
    //   (energy < 170 && Math.random() < 0.03)
    // ) {
    //   // Math.random() < 0.002) {
    //   this.startFade();
    // } else if (this.fading) {
    //   this.fade(energy);
    // }

    // if (Math.random() < 0.05) {
    //   this.glitch = new Glitch(this.layer);
    //   this.glitch.show(this.layer);
    // }

    this.layer.strokeWeight(1);
    this.layer.noFill();

    // if (energy < 228) {
      this.instaFade(energy);
    // }

    let repeats = Math.max((energy - 200) / 15, 1);
    while (repeats-- > 0) {
      this.cells.forEach((cell) => {
        cell.vector.limit((isPeak ? 30 : 0.7) * energy);
        this.moveParticle(cell);
        const dx = cell.x - width / 2;
        const dy = cell.y - height / 2;
        let angle = Math.atan(dy / dx);
        angle *= 180 / Math.PI;
        const circleVector = createVector(
          Math.cos(angle) + Math.random() * 0.2 - 0.1,
          sin(angle) + Math.random() * 0.2 - 0.1
        );
        cell.vector = circleVector;
        cell.vector.add(p5.Vector.random2D().mult(energy / 23));
        if (Math.random() < 0.11) {
          this.layer.stroke(0, 0, 0, 2);
        } else {
          const alpha = Math.ceil(energy / 36);
          cell.color.setAlpha(alpha);
          this.layer.stroke(cell.color);
        }
        this.layer.push();
        this.layer.translate(cell.x, cell.y);

        const innerSize =
          cell.size * isPeak ? Math.random() * 23 + 1 : Math.random() * 69 + 1;
        const outerSize = (innerSize * energy) / 9;
        const increment = TWO_PI / cell.spikes;

        for (let angle = 0; angle < TWO_PI; angle += increment) {
          cell.vector.add(p5.Vector.random2D());
          const copyVector = cell.vector.copy();
          cell.vector.limit(0.01);
          this.moveParticle(cell);
          cell.vector = copyVector;

          // triangle version

          if (Math.random() < 0.96) {
            // cell.sharp === 1) {
            this.layer.triangle(
              innerSize * cos(angle) + Math.random() * 24 - 1,
              innerSize * sin(angle) + Math.random() * 24 - 1,
              (outerSize * cos(angle + cell.spikes)) / 2 +
                Math.random() * 24 -
                1,
              (outerSize * sin(angle + cell.spikes)) / 2 +
                Math.random() * 24 -
                1,
              innerSize * cos(angle + cell.spikes) + Math.random() * 24 - 1,
              innerSize * sin(angle + cell.spikes) + Math.random() * 24 - 1
            );
          }

          // curly version
          else {
            for (let angle = 0; angle < TWO_PI; angle += increment)
              this.layer.bezier(
                innerSize * cos(angle),
                innerSize * sin(angle),
                (outerSize * cos(angle - increment + cell.spikes)) / 2,
                (outerSize * sin(angle - increment + cell.spikes)) / 2,
                (outerSize * cos(angle + increment + cell.spikes)) / 2,
                (outerSize * sin(angle + increment + cell.spikes)) / 2,
                innerSize * cos(angle + cell.spikes),
                innerSize * sin(angle + cell.spikes)
              );
          }
        }
        this.layer.pop();
      });
    }
  },
  keyTyped: function () {},
};

export default threads;
