const particle = {
  moveParticle: function (particle) {
    particle.x += particle.vector.x;
    particle.y += particle.vector.y;
    if (particle.x > width || particle.x < 0) {
      if (particle.bounce) {
        particle.vector.x = -particle.vector.x;
        particle.x += particle.vector.x;
      } else {
        particle.x = particle.x < 0 ? width : 0;
      }
    }
    if (particle.y > height || particle.y < 0) {
      if (particle.bounce) {
        particle.vector.y = -particle.vector.y;
        particle.y += particle.vector.y;
      } else {
        particle.y = particle.y < 0 ? height : 0;
      }
    }
  },
  spawnParticle: function ({ bounce = true, ...rest }) {
    const particle = {
      x: Math.random() * width,
      y: Math.random() * height,
      vector: p5.Vector.random2D(),
      bounce,
      ...rest,
    };
    return particle;
  },
};

export default particle;
