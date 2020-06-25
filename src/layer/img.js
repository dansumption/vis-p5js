import Glitch from '../glitch.js';
const img = {
  preload() {
    this.images = [];
    this.currentImage;
    this.imgsLoaded = 0;
    this.min = 1;
    this.scale = 0;

    console.log(this.numImages, this.max);
    for (let i = 0; i < this.numImages; i++) {
      // const imgNumber = i + 1;
      const imgNumber = Math.floor(random(this.min, this.max + 1));
      const imgString = nf(imgNumber, 1);
      const imgName = this.src + imgNumber + '.' + this.format;
      this.images[i] = loadImage(imgName, () => {
        this.imgsLoaded++;
      });
    }
  },
  setup() {
    this.currentImage = createImage(width, height);
    this.currentImage.loadPixels();
    this.currentImage.updatePixels();
    this.currentWidth = width;
    this.currentHeight = height;

    this.setImage();
  },

  ready() {
    return this.imgsLoaded === this.numImages;
  },

  setImage() {
    const imgNumber = Math.floor(random(0, this.numImages));
    this.currentImage.copy(
      this.images[imgNumber],
      0,
      0,
      this.images[imgNumber].width,
      this.images[imgNumber].height,
      Math.ceil(-this.scale * 0.956),
      Math.ceil(-this.scale * 0.935),
      width + this.scale * 2,
      this.currentHeight + this.scale * 2
    );
  },

  draw(spectrum, isPeak, fft) {
    let reRender = false;
    if (!this.currentImage || true) {
      // || isPeak) {
      if (Math.random() > 1 - this.glitchChance) {
        this.glitch = new Glitch(this.layer);
        console.log('glitch', this.name);
        reRender = true;
      } else if (Math.random() > 1 - this.newImgChance) {
        this.setImage();
        console.log('load', this.name);
        reRender = true;
      }
      if (this.grow) {
        this.scale += 23;
      }
    }
    if (reRender && this.currentImagewidth) {
      this.glitch = new Glitch(this.currentImage);
      // this.layer.image(this.currentImage, 0, 0, width, height);
      this.layer.clear();
      this.glitch.show(this.layer);
    }
  }
};

export default img;
