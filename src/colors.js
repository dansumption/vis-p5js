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
  [200, 204, 208],
  [134, 198, 216],
  [185, 234, 239],
  [255, 255, 255]
];

const bw = [
  [255, 255, 255],
  [0, 0, 0],
  [240, 240, 240],
  [200, 200, 200]
];

const eq = {
  bass: [0, 0, 46],
  midbass: [0, 0, 92],
  mid: [128, 128, 128],
  midtreble: [207, 0, 0],
  treble: [255, 255, 255],
  all: [0, 0, 0]
}

const palette = bw;

  const colorUtils = {
  getPrimary: (alpha = 255) => {
    const chosenColor = palette[0];
    return color(chosenColor[0], chosenColor[1], chosenColor[2], alpha);
  },
  getSecondary: (alpha = 255) => {
    const chosenColor = palette[1];
    return color(chosenColor[0], chosenColor[1], chosenColor[2], alpha);
  },
  getBlackOrWhite: (alpha = 255) => {
    const chosenColor = Math.random() < 0.5 ? 0 : 255;
    return color(chosenColor, chosenColor, chosenColor, alpha);
  },
  alternate: (iteration, alpha = 255) => {
    // const chosenColor = iteration % 2 == 0 ? 0 : 255;
    const chosenColor = palette[iteration % palette.length];
    return color(chosenColor[0], chosenColor[1], chosenColor[2], alpha);
  },
};

export default colorUtils;
