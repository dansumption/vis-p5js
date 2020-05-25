const noop = () => {};

class Layer {
  constructor(processing, { preload = noop, setup = noop, draw = noop, keyTyped = noop, ready = () => true, ...rest }) {
    this.processing = processing;
    this.layer = processing.createGraphics(processing.width, processing.height);
    this.preload = preload;
    this.setup = setup;
    this.draw = draw;
    this.keyTyped = keyTyped;
    this.ready = ready;
    this.moveParticle = (particle) => {
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
    }
    this.spawnParticle = ({ ...rest }) => {
      const particle = {
        x: Math.random() * this.processing.width,
        y: Math.random() * this.processing.height,
        vector: p5.Vector.random2D(),
        ...rest
      }
      return particle;
    }
  }
}

export default Layer;