import colorUtils from '../colors.js';

const eq = {
  draw(spectrum, isPeak, fft) {
    // function drawUpDown() {
    //   const upsideDown = Math.random() > 0.5;
    //   this.layer.clear();
    //   const numBands = spectrum.length;
    //   const rheight = Math.round(this.processing.height / numBands);
    //   this.layer.noStroke();
    //       this.layer.translate(this.processing.width / 2, this.processing.height / 2);

    //   for (let i = 0; i < numBands; i++) {
    //     this.layer.fill(
    //       isPeak
    //         ? colorUtils.getPrimary(this.processing)
    //         : colorUtils.getSecondary(this.processing)
    //     );
    //     const level = spectrum[i];
    //     const prevLevel = i == 0 ? level : spectrum[i - 1];
    //     const nextLevel = i == numBands - 1 ? level : spectrum[i + 1];
    //     const prevWidth = Math.round(
    //       ((prevLevel / 255) * this.processing.width) / 2
    //     );
    //     const rwidth = Math.round(((level / 255) * this.processing.width) / 2);
    //     const nextWidth = Math.round(
    //       ((nextLevel / 255) * this.processing.width) / 2
    //     );
    //     const initialY = upsideDown
    //       ? i * rheight
    //       : this.processing.height - i * rheight;
    //     const nextHeight = upsideDown ? rheight : -rheight;
    //     this.layer.bezier(
    //       this.processing.width / 2 - prevWidth,
    //       initialY,
    //       this.processing.width / 2 - rwidth,
    //       initialY + nextHeight / 2,
    //       this.processing.width / 2 - rwidth,
    //       initialY + nextHeight / 2,
    //       this.processing.width / 2 - nextWidth,
    //       initialY + nextHeight
    //     );
    //     this.layer.bezier(
    //       this.processing.width / 2 + prevWidth,
    //       initialY,
    //       this.processing.width / 2 + rwidth,
    //       initialY + nextHeight / 2,
    //       this.processing.width / 2 + rwidth,
    //       initialY + nextHeight / 2,
    //       this.processing.width / 2 + nextWidth,
    //       initialY + nextHeight
    //     );
    //   }
    // }
    // function drawCircle() {
    this.layer.clear();
    this.layer.push();
    this.layer.translate(
      this.processing.width / 2 + Math.random() * 32 - 16,
      this.processing.height / 2 + Math.random() * 32 - 16
    );
    this.layer.noStroke();
    const energy = fft.getEnergy('bass', 'mid');
    const numBands = spectrum.length;
    const radius = isPeak ? energy * 2 : energy / 2;
    const increment = (Math.PI * 2) / numBands;
    for (let i = 0; i < numBands; i++) {
      this.layer.fill(
        colorUtils.alternate(this.processing, energy, Math.random() * 9)
      );
      const angle = i * increment + Math.random() * Math.PI * 4;
      const outerSize = radius + spectrum[i];
      this.layer.triangle(
        radius * this.processing.cos(angle),
        radius * this.processing.sin(angle),
        outerSize * this.processing.cos(angle + increment * 3),
        outerSize * this.processing.sin(angle + increment * 3),
        radius * this.processing.cos(angle + increment * 6),
        radius * this.processing.sin(angle + increment * 6)
      );
    }
    // };
    // drawCircle();
    this.layer.pop();
  }
};

export default eq;
