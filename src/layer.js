const noop = () => {};

class Layer {
  constructor(processing, { preload = noop, setup = noop, draw = noop, keyPressed = noop, ready = () => true, ...rest }) {
    this.processing = processing;
    this.layer = processing.createGraphics(processing.width, processing.height);
    this.preload = preload;
    this.setup = setup;
    this.draw = draw;
    this.keyPressed = keyPressed;
    this.ready = ready;
  }
}

export default Layer;