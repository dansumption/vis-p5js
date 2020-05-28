import Glitch from '../glitch.js';
const img = {
  preload() {
    this.images = [];
    this.currentImage;
    this.numImages = 6;
    this.imgsLoaded = 0;
    this.min = 1;
    this.max = 6;

    for (let i = 0; i < this.numImages; i++) {
      const imgNumber = i + 1;
      // const imgNumber = Math.floor(
      //   this.processing.random(this.min, this.max + 1)
      // );
      // const imgString = this.processing.nf(imgNumber, 1);
      const imgName = '../img/myoptik/image(' + imgNumber + ').png';
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
        0,
        0,
        this.processing.width,
        this.processing.height
      );
    },

  draw(spectrum, isPeak, fft) {
    let reRender = false;
    if (!this.currentImage || isPeak && Math.random() > 0.96) {
      this.setImage();
      reRender = true;
    } else if (isPeak && Math.random() > 0.6) {
      this.glitch = new Glitch(this.processing, this.layer);
      reRender = true;
    }
      if (reRender && this.currentImage.width) {
        this.glitch = new Glitch(this.processing, this.currentImage);
        // this.layer.image(this.currentImage, 0, 0, this.processing.width, this.processing.height);
        this.layer.clear();
        this.glitch.show(this.layer);
    }
  },
};

export default img;
