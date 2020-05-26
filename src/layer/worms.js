import colorUtils from '../colors.js';
const worms = {
  setup: function () {
    const numCells = 50;
    this.cells = [];
    for (let i = 0; i < numCells; i++) {
      this.cells.push(
        this.spawnParticle({
          length: Math.random() * 10 + 2,
          color: colorUtils.getBlackOrWhite(this.processing, Math.random() * 50 + 100),
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
      const midX = cell.x - cell.vector.x * cell.length * ((energy - 128) / 255) * neck;
      const midY = cell.y - cell.vector.y * cell.length * ((energy - 128) / 255) * neck;
      this.processing.line(
        cell.x,
        cell.y,
        midX, midY
        
      );
      this.processing.line(
        midX,
        midY,
        midX - cell.lastVector.x * cell.length * ((energy - 128) / 255) * (1-neck),
        midY - cell.lastVector.y * cell.length * ((energy - 128) / 255) * (1-neck)
      );
    });
  },
  keyTyped: function () {},
};

export default worms;
