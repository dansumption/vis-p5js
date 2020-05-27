import colorUtils from '../colors.js';

const numCells = 32;

const flowers = {
  setup: function () {
    this.cells = [];
    const color = colorUtils.getBlackOrWhite(this.processing, 2)
    for (let i = 0; i < numCells; i++) {
      const centreSize = this.processing.width / 10; // Math.random() * 80;
      const outerSize = this.processing.width; // centreSize + Math.random() * 80 + 10;
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

      if (cell.size <= cell.outerSize) { // cell.centreSize) {
        this.layer.fill(cell.centreColor);
        this.layer.circle(0, 0, cell.size);
      } else if (cell.size <= cell.outerSize) {
        this.layer.fill(cell.petalColor);
        const increment = this.processing.TWO_PI / cell.petals;
        for (
          let angle = 0;
          angle < this.processing.TWO_PI;
          angle += increment
        ) {
          this.layer.bezier(
            (cell.centreSize / 2) * Math.cos(angle),
            (cell.centreSize / 2) * Math.sin(angle),
            cell.size * Math.cos(angle),
            cell.size * Math.sin(angle),
            cell.size * Math.cos(angle + increment),
            cell.size * Math.sin(angle + increment),
            (cell.centreSize / 2) * Math.cos(angle + increment),
            (cell.centreSize / 2) * Math.sin(angle + increment)
          );
        }
        // this.layer.fill(cell.centreColor);
        // this.layer.circle(0, 0, cell.centreSize);
      }
      this.layer.pop();
      cell.size += energy / 128;
      if (cell.size > this.processing.width / 2) {
        this.layer.clear();
        this.setup();
        return false;
      }
      return true;
    });
  },
};
export default flowers;
