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
      const imgNumber = Math.floor(
        this.processing.random(this.min, this.max + 1)
      );
      const imgString = this.processing.nf(imgNumber, 1);
      const imgName = this.src + imgNumber + '.' + this.format;
      this.images[i] = this.processing.loadImage(imgName, () => {
        this.imgsLoaded++;
      });
      this.currentImage = this.processing.createImage(
        this.processing.width,
        this.processing.height
      );
      this.currentImage.loadPixels();
      this.currentImage.updatePixels();
    }
  },
  setup() {
        this.currentWidth = this.processing.width;
        this.currentHeight = this.processing.height;

    this.setImage();
  },

  ready() {
    return this.imgsLoaded === this.numImages;
  },

  setImage() {
    const imgNumber = Math.floor(this.processing.random(0, this.numImages));
    this.currentImage.copy(
      this.images[imgNumber],
      0,
      0,
      this.images[imgNumber].width,
      this.images[imgNumber].height,
      Math.ceil(-this.scale * 0.956),
      Math.ceil(-this.scale * 0.935),
      this.processing.width + this.scale * 2,
      this.currentHeight + this.scale * 2
    );
  },

  draw(spectrum, isPeak, fft) {
    let reRender = false;
    if (!this.currentImage || isPeak) {
      if (Math.random() > 1 - this.glitchChance) {
        this.glitch = new Glitch(this.processing, this.layer);
        console.log('glitch', this.name)
        reRender = true;
      } else if (Math.random() > 1 - this.newImgChance) {
        this.setImage();
        console.log("load", this.name)
        reRender = true;
      }
      if (this.grow) {
        this.scale += 23;
      }
    }
    if (reRender && this.currentImage.width) {
      this.glitch = new Glitch(this.processing, this.currentImage);
      // this.layer.image(this.currentImage, 0, 0, this.processing.width, this.processing.height);
      this.layer.clear();
      this.glitch.show(this.layer);
    }
  }
};

export default img;
