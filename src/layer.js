import particle from './particle.js';
const noop = () => {};

class Layer {
  constructor(
    processing,
    {
      showPercentage = 100,
      hidePercentage = 0,
      beatMultiplier = 1,
      visible = true,
      renderHidden = false,
      preload = noop,
      setup = noop,
      draw = noop,
      keyTyped = noop,
      ready = () => true,
      ...rest
    }
  ) {
    Object.assign(this, particle);
    Object.assign(this, { ...rest });
    this.visible = visible;
    this.processing = processing;
    this.layer = processing.createGraphics(processing.width, processing.height);
    this.preload = preload;
    this.setup = setup;
    this.draw = draw;
    this.keyTyped = keyTyped;
    this.ready = ready;
    this.showPercentage = showPercentage;
    this.hidePercentage = hidePercentage;
    this.showHide = function (isBeat) {
      switch (this.visible) {
        case true:
          if (Math.random() * 100 < this.hidePercentage) {
            // console.log('hiding', this.name);
            this.visible = false;
          }
          break;
        case false:
          if (Math.random() * 100 < this.showPercentage * (isBeat ? beatMultiplier : 1)) {
            // console.log('showing', this.name);
            this.visible = true;
          }
          break;
      }
    };
  }
}

export default Layer;
