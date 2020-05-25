const img = {
  preload() {
    this.images = [];
    this.currentImage;
    this.numImages = 100;
    this.imgsLoaded = 0;
    this.min = 1;
    this.max = 8189;
    const p5 = this.processing;

    for (let i = 0; i < this.numImages; i++) {
      const imgNumber = Math.floor(p5.random(this.min, this.max + 1));
      const imgString = p5.nf(imgNumber, 5);
      const imgName = '../img/image_' + imgString + '.jpg';
      this.images[i] = p5.loadImage(imgName, () => {
        this.imgsLoaded++;
      });
    }
  },

  ready() {
    return this.imgsLoaded === this.numImages;
  },

  draw(spectrum, isPeak) {
    const p5 = this.processing;

    const setImage = () => {
      const imgNumber = Math.floor(p5.random(0, this.numImages));
      this.currentImage = this.images[imgNumber];
      this.layer.image(this.currentImage, p5.width, p5.height);
    }

    let reRender = false;
    if (!this.currentImage) {
      setImage();
      reRender = true;
    }
    if (isPeak) {
      const rndNum = Math.floor(p5.random(0, 4));
      switch (rndNum) {
        case 0:
          this.currentImage.filter(p5.INVERT);
          reRender = true;
          break;
        case 1:
          this.currentImage.filter(p5.POSTERIZE, Math.floor(p5.random(2, 20)));
          reRender = true;
          break;
        case 2:
          this.currentImage.resize(
            Math.floor(p5.random(20, p5.width * 2)),
            Math.floor(p5.random(20, p5.height * 2))
          );
          reRender = true;
          break;
        case 3:
          setImage();
      }
    }
    if (reRender) {
      if (this.currentImage.width && this.currentImage.height) {
        this.layer.image(this.currentImage, 0, 0, p5.width, p5.height);
      }
    }
  },
};

export default img;
