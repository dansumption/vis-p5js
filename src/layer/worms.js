import colorUtils from '../colors.js';
const worms = {
  setup: function () {
    const numCells = 40;
    this.cells = [];
    for (let i = 0; i < numCells; i++) {
      this.cells.push(
        this.spawnParticle({
          length: Math.random() * 7 + 2,
          color: colorUtils.alternate(this.processing, i, Math.random() * 180 + 75),
        })
      );
    }
  },
  draw: function (spectrum, isPeak, fft) {
    this.layer.clear();
    const energy = fft.getEnergy('bass', 'mid');
    this.cells.forEach((cell) => {
      cell.lastVector = cell.vector.copy();
      this.moveParticle(cell);
      cell.vector.add(p5.Vector.random2D().mult(0.5));
      this.processing.strokeWeight(10);
      this.processing.strokeCap(this.processing.ROUND);
      this.processing.stroke(cell.color);
      const neck = Math.random();
      const midX = cell.x - cell.vector.x * cell.length * ((energy - 128) / 1024) * neck;
      const midY =
        cell.y - cell.vector.y * cell.length * ((energy - 128) / 1024) * neck;
      this.processing.line(
        cell.x,
        cell.y,
        midX, midY
        
      );
      this.processing.line(
        midX,
        midY,
        midX -
          cell.lastVector.x *
            cell.length *
            ((energy - 128) / 1024) *
            (1 - neck),
        midY -
          cell.lastVector.y * cell.length * ((energy - 128) / 1024) * (1 - neck)
      );
    });
  },
  keyTyped: function () {},
};

export default worms;
