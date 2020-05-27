import Glitch from '../glitch.js';
const img = {
  preload() {
    this.images = [];
    this.currentImage;
    this.numImages = 4;
    this.imgsLoaded = 0;
    this.min = 1;
    this.max = 4;

    for (let i = 0; i < this.numImages; i++) {
      const imgNumber = Math.floor(this.processing.random(this.min, this.max + 1));
      const imgString = this.processing.nf(imgNumber, 1);
      const imgName = '../img/set1/image_' + imgString + '.jpg';
      this.images[i] = this.processing.loadImage(imgName, () => {
        this.imgsLoaded++;
      });
    }
  },

  ready() {
    return this.imgsLoaded === this.numImages;
  },

  draw(spectrum, isPeak, fft) {
    this.processing;

    const setImage = () => {
      const imgNumber = Math.floor(this.processing.random(0, this.numImages));
      this.currentImage = this.images[imgNumber];
      this.layer.image(this.currentImage, this.processing.width, this.processing.height);
    }

    let reRender = false;
    if (!this.currentImage) {
      setImage();
      reRender = true;
    }
    if (isPeak) {
      const rndNum = Math.floor(this.processing.random(0, 4));
      switch (rndNum) {
        case 0:
          this.currentImage.filter(this.processing.INVERT);
          reRender = true;
          break;
        case 1:
          this.currentImage.filter(this.processing.POSTERIZE, Math.floor(this.processing.random(2, 20)));
          reRender = true;
          break;
        case 2:
          this.currentImage.resize(
            Math.floor(this.processing.random(20, this.processing.width * 2)),
            Math.floor(this.processing.random(20, this.processing.height * 2))
          );
          reRender = true;
          break;
        case 3:
          setImage();
      }
    }
    if (reRender) {
      if (this.currentImage.width && this.currentImage.height) {
        this.glitch = new Glitch(this.processing, this.currentImage);
        // this.layer.image(this.currentImage, 0, 0, this.processing.width, this.processing.height);
        this.layer.clear();
        this.glitch.show(this.layer);
      }
    }
  },
};

export default img;
