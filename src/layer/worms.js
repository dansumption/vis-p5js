import colorUtils from '../colors.js';
const worms = {
  setup: function () {
    this.vector = p5.Vector.random2D();
    const numCells = 40;
    this.cells = [];
    for (let i = 0; i < numCells; i++) {
      this.cells.push(
        this.spawnParticle({
          length: Math.random() * 333 + 123,
          color: colorUtils.alternate(i, Math.random() * 23 + 17),
          weight: 1,
          vector: this.vector,
          bounce: false
        })
      );
    }
  },
  draw: function (spectrum, isPeak, fft) {
    this.layer.clear();
    const energy = fft.getEnergy('bass', 'mid');
    if (energy > 223 & Math.random() > 0.999) {
      this.vector = p5.Vector.random2D();
    }
    this.cells.forEach((cell) => {
      cell.lastVector = cell.vector.copy();
      // cell.vector = this.vector.limit(((isPeak ? 15 : 0.5) * energy));
      this.moveParticle(cell);
      cell.vector.add(p5.Vector.random2D().mult(0.01));
      strokeWeight(cell.weight * Math.ceil((energy - 145)/100));
      // strokeCap (PROJECT);
      stroke(cell.color);
      const neck = Math.random();
      const midX = cell.x - cell.vector.x * cell.length * ((energy - 128) / 1024) * neck;
      const midY =
        cell.y - cell.vector.y * cell.length * ((energy - 128) / 1024) * neck;
      line(
        cell.x,
        cell.y,
        midX, midY
        
      );
      // line(
      //   midX,
      //   midY,
      //   midX -
      //     cell.lastVector.x *
      //       cell.length *
      //       ((energy - 128) / 1024) *
      //       (1 - neck),
      //   midY -
      //     cell.lastVector.y * cell.length * ((energy - 128) / 1024) * (1 - neck)
      // );
    });
  },
  keyTyped: function () {},
};

export default worms;
