// More layer templates...

layers.push(new Layer({ name: 'blobs', ...flowersMixin }));
layers.push(new Layer({ name: 'img', ...imgMixin }));
layers.push(
  new Layer({
    name: 'queenimage',
    src: '../img/ice/queen/queen',
    format: 'jpg',
    numImages: 1,
    max: 1,
    newImgChance: 0.23,
    glitchChance: 0.23,
    visible: true,
    grow: true,
    showPercentage: 25,
    hidePercentage: 1,
    beatMultiplier: 1,
    ...imgMixin
  })
);
layers.push(
  new Layer({
    name: 'spin',
    visible: false,
    showPercentage: 1,
    hidePercentage: 1.5,
    beatMultiplier: 4,
    renderHidden: true,
    ...spinMixin
  })
);
layers.push(
  new Layer({
    name: 'img2',
    src: '../img/ice/image',
    format: 'jpg',
    numImages: 29,
    max: 29,
    newImgChance: 0.23,
    glitchChance: 0.69,
    visible: true,
    showPercentage: 0.001,
    hidePercentage: 3,
    beatMultiplier: 100000,
    ...imgMixin
  })
);
layers.push(
  new Layer({
    name: 'blob flowers',
    visible: false,
    showPercentage: 100,
    hidePercentage: 0,
    beatMultiplier: 1,
    ...flowersMixin
  })
);
layers.push(
  new Layer({
    name: 'worms2',
    visible: true,
    showPercentage: 0.5,
    hidePercentage: 4,
    ...wormsMixin,
  })
);
