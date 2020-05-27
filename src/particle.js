const particle = {
  moveParticle: function (particle) {
    particle.x += particle.vector.x;
    particle.y += particle.vector.y;
    if (particle.x > this.processing.width || particle.x < 0) {
      particle.vector.x = -particle.vector.x;
      particle.x += particle.vector.x;
    }
    if (particle.y > this.processing.height || particle.y < 0) {
      particle.vector.y = -particle.vector.y;
      particle.y += particle.vector.y;
    }
  },
  spawnParticle: function({ ...rest }) {
    const particle = {
      x: Math.random() * this.processing.width,
      y: Math.random() * this.processing.height,
      vector: p5.Vector.random2D(),
      ...rest,
    };
    return particle;
  }
};

export default particle;