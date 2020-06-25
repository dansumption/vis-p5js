import colorUtils from '../colors.js';

const eq = {
  draw(spectrum, isPeak, fft) {
    // function drawUpDown() {
    //   const upsideDown = Math.random() > 0.5;
    //   this.layer.clear();
    //   const numBands = spectrum.length;
    //   const rheight = Math.round(height / numBands);
    //   this.layer.noStroke();
    //       this.layer.translate(width / 2, height / 2);

    //   for (let i = 0; i < numBands; i++) {
    //     this.layer.fill(
    //       isPeak
    //         ? colorUtils.getPrimary()
    //         : colorUtils.getSecondary()
    //     );
    //     const level = spectrum[i];
    //     const prevLevel = i == 0 ? level : spectrum[i - 1];
    //     const nextLevel = i == numBands - 1 ? level : spectrum[i + 1];
    //     const prevWidth = Math.round(
    //       ((prevLevel / 255) * width) / 2
    //     );
    //     const rwidth = Math.round(((level / 255) * width) / 2);
    //     const nextWidth = Math.round(
    //       ((nextLevel / 255) * width) / 2
    //     );
    //     const initialY = upsideDown
    //       ? i * rheight
    //       : height - i * rheight;
    //     const nextHeight = upsideDown ? rheight : -rheight;
    //     this.layer.bezier(
    //       width / 2 - prevWidth,
    //       initialY,
    //       width / 2 - rwidth,
    //       initialY + nextHeight / 2,
    //       width / 2 - rwidth,
    //       initialY + nextHeight / 2,
    //       width / 2 - nextWidth,
    //       initialY + nextHeight
    //     );
    //     this.layer.bezier(
    //       width / 2 + prevWidth,
    //       initialY,
    //       width / 2 + rwidth,
    //       initialY + nextHeight / 2,
    //       width / 2 + rwidth,
    //       initialY + nextHeight / 2,
    //       width / 2 + nextWidth,
    //       initialY + nextHeight
    //     );
    //   }
    // }
    // function drawCircle() {
    this.layer.clear();
    this.layer.push();
    this.layer.translate(
      width / 2 + Math.random() * 32 - 16,
      height / 2 + Math.random() * 32 - 16
    );
    this.layer.noStroke();
    const energy = fft.getEnergy('bass', 'mid');
    const numBands = spectrum.length;
    const radius = isPeak ? energy * 2 : energy / 2;
    const increment = (Math.PI * 2) / numBands;
    for (let i = 0; i < numBands; i++) {
      this.layer.fill(
        colorUtils.alternate(energy, Math.random() * 9)
      );
      const angle = i * increment + Math.random() * Math.PI * 4;
      const outerSize = radius + spectrum[i];
      this.layer.triangle(
        radius * cos(angle),
        radius * sin(angle),
        outerSize * cos(angle + increment * 3),
        outerSize * sin(angle + increment * 3),
        radius * cos(angle + increment * 6),
        radius * sin(angle + increment * 6)
      );
    }
    // };
    // drawCircle();
    this.layer.pop();
  }
};

export default eq;
