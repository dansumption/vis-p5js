import Layer from './layer.js';
import eqMixin from './layer/eq.js';
import flowersMixin from './layer/flowers.js';
import imgMixin from './layer/img.js';
import wormsMixin from './layer/worms.js';
import spinMixin from './layer/spin.js';
import threadsMixin from './layer/threads.js';
import backdropMixin from './layer/backdrop.js';

const layers = {
  layers: [],
  setup: function () {
    this.layers.push(new Layer({ name: 'backdrop', ...backdropMixin }));
    this.layers.push(new Layer({ name: 'threads', ...threadsMixin }));
    this.layers.push(
      new Layer({
        name: 'worms',
        visible: true,
        showPercentage: 113,
        hidePercentage: 2,
        ...wormsMixin,
      })
    );
    this.layers.push(
      new Layer({
        name: 'eq',
        visible: false,
        showPercentage: 0.001,
        hidePercentage: 3.4,
        beatMultiplier: 1000,
        ...eqMixin,
      })
    );
    this.layers.forEach((layer) => {
      layer.preload();
    });
    this.layers.forEach((layer) => {
      layer.createGraphics(width, height);
    });
  },
  isReady: function () {
    return this.layers.reduce((prev = true, layer) => {
      return prev && layer.ready();
    });
  },
  update: function (sample) {
    if (sample) {
      this.layers.forEach((layer) => {
        layer.showHide(sample.peak);
        if (layer.visible || layer.renderHidden) {
          layer.draw(sample);
          if (layer.visible) {
            image(layer.layer, 0, 0);
          }
        }
      });
    }
  },
  keyTyped: function () {
    this.layers.forEach((layer) => layer.keyTyped());
  },
};

export default layers;
