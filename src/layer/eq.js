import colorUtils from '../colors.js';

const eq = {
  draw(spectrum, isPeak) {
    const upsideDown = Math.random() > 0.5;
    const p5 = this.processing;
    this.layer.clear();
    const numBands = spectrum.length;
    const rheight = Math.round(p5.height / numBands);
    this.layer.noStroke();
    for (let i = 0; i < numBands; i++) {
      this.layer.fill (isPeak ? colorUtils.getPrimary(this.processing) : colorUtils.getSecondary(this.processing));
      const level = spectrum[i];
      const prevLevel = i == 0 ? level : spectrum[i - 1];
      const nextLevel = i == numBands - 1 ? level : spectrum[i + 1];
      const prevWidth = Math.round(((prevLevel / 255) * p5.width) / 2);
      const rwidth = Math.round(((level / 255) * p5.width) / 2);
      const nextWidth = Math.round(((nextLevel / 255) * p5.width) / 2);
      const initialY = upsideDown ?
        i * rheight
        : p5.height - i * rheight;
      const nextHeight = upsideDown ?
        rheight
        : -rheight;
      this.layer.bezier(
        p5.width / 2 - prevWidth,
        initialY,
        p5.width / 2 - rwidth,
        initialY + nextHeight / 2,
        p5.width / 2 - rwidth,
        initialY + nextHeight / 2,
        p5.width / 2 - nextWidth,
        initialY + nextHeight
      );
      this.layer.bezier(
        p5.width / 2 + prevWidth,
        initialY,
        p5.width / 2 + rwidth,
        initialY + nextHeight / 2,
        p5.width / 2 + rwidth,
        initialY + nextHeight / 2,
        p5.width / 2 + nextWidth,
        initialY + nextHeight
      );
    }
  },
};

export default eq;
