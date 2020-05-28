const zaliColors = [
  [21, 1, 1],
  [89, 31, 17],
  [190, 125, 60],
  [254, 254, 254],
];

const myoptik = [
  [0, 0, 0],
  [239, 0, 0],
  [255, 239, 0],
  [255, 255, 255]
]

  const colorUtils = {
  getPrimary: (processing, alpha = 255) => {
    const color = myoptik[2];
    return processing.color(color[0], color[1], color[2], alpha);
  },
  getSecondary: (processing, alpha = 255) => {
    const color = myoptik[1];
    return processing.color(color[0], color[1], color[2], alpha);
  },
  getBlackOrWhite: (processing, alpha = 255) => {
    const color = Math.random() < 0.5 ? 0 : 255;
    return processing.color(color, color, color, alpha);
  },
  alternate: (processing, iteration, alpha = 255) => {
    // const color = iteration % 2 == 0 ? 0 : 255;
    const color = myoptik[iteration % 4];
    return processing.color(color[0], color[1], color[2], alpha);
  },
};

export default colorUtils;
