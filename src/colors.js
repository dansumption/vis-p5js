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

const ice = [
  [16, 175, 223],
  [63, 208, 212],
  [134, 198, 216],
  [185, 234, 239]
];

  const colorUtils = {
  getPrimary: (alpha = 255) => {
    const chosenColor = ice[2];
    return color(chosenColor[0], chosenColor[1], chosenColor[2], alpha);
  },
  getSecondary: (alpha = 255) => {
    const chosenColor = ice[0];
    return color(chosenColor[0], chosenColor[1], chosenColor[2], alpha);
  },
  getBlackOrWhite: (alpha = 255) => {
    const chosenColor = Math.random() < 0.5 ? 0 : 255;
    return color(chosenColor, chosenColor, chosenColor, alpha);
  },
  alternate: (iteration, alpha = 255) => {
    // const chosenColor = iteration % 2 == 0 ? 0 : 255;
    const chosenColor = ice[iteration % 4];
    return color(chosenColor[0], chosenColor[1], chosenColor[2], alpha);
  },
};

export default colorUtils;
