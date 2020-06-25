import colorUtils from '../colors.js';

const numCells = 6;
let iteration = 0;

const flowers = {
  setup: function () {
    this.cells = [];
    const color = colorUtils.alternate(iteration, 1);
    iteration++;
    for (let i = 0; i < numCells; i++) {
      const centreSize = width / 10; // Math.random() * 80;
      const outerSize = width; // centreSize + Math.random() * 80 + 10;
      this.cells.push(
        this.spawnParticle({
          size: Math.random() * 10,
          centreColor: color,
          petalColor: color,
          centreSize,
          outerSize,
          petals: Math.random * 5 + 3,
        })
      );
    }
  },
  draw: function (spectrum, isBeat, fft) {
    const energy = fft.getEnergy('bass', 'mid');
    this.layer.noStroke();
    this.cells.every((cell) => {
      this.layer.push();
      this.layer.translate(cell.x, cell.y);

      if (cell.size <= cell.outerSize) {
        // cell.centreSize) {
        this.layer.fill(cell.centreColor);
        this.layer.circle(0, 0, cell.size);
      } else if (cell.size <= cell.outerSize) {
        this.layer.fill(cell.petalColor);
        const increment = TWO_PI / cell.petals;
        for (
          let angle = 0;
          angle < TWO_PI;
          angle += increment
        ) {
          this.layer.bezier(
            (cell.centreSize / 2) * Math.cos(angle),
            (cell.centreSize / 2) * sin(angle),
            cell.size * Math.cos(angle),
            cell.size * sin(angle),
            cell.size * Math.cos(angle + increment),
            cell.size * sin(angle + increment),
            (cell.centreSize / 2) * Math.cos(angle + increment),
            (cell.centreSize / 2) * sin(angle + increment)
          );
        }
        // this.layer.fill(cell.centreColor);
        // this.layer.circle(0, 0, cell.centreSize);
      }
      this.layer.pop();
      cell.size += energy / 32;
      if (cell.size < width) {
        return true;
      } else {
        if (iteration % 4 == 0) {
          this.layer.clear();
        }
        this.setup();
        return false;
      }
    });
  },
};
export default flowers;
