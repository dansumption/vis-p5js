import particle from './particle.js';
const noop = () => {};

class Layer {
  constructor(
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
    this.preload = preload;
    this.setup = setup;
    this.draw = draw;
    this.keyTyped = keyTyped;
    this.ready = ready;
    this.showPercentage = showPercentage;
    this.hidePercentage = hidePercentage;
    this.lastEnergy = 0;
    this.energyDiff = 0;
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
    this.createGraphics = function (w, h) {
      this.layer = createGraphics(w, h);
    }

  }
}

export default Layer;
