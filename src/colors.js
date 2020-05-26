const colorUtils = {
  getBlackOrWhite: (processing, alpha = 255) => {
    const color = Math.random() < 0.5 ? 0 : 255;
    return processing.color(
      color, color, color, alpha);
  }
}

export default colorUtils;