export const colors = {
  "--red": {
    [Symbol.toPrimitive]: () => "rgb(253 102 135)",
    calc: (A = 100) => `rgb(253 102 135 / ${A}%)`,
  },
  "--purple": {
    [Symbol.toPrimitive]: () => "rgb(121 69 255)",
    calc: (A = 100) => `rgb(121 69 255 / ${A}%)`,
  },
  "--yellow": {
    [Symbol.toPrimitive]: () => "rgb(255 206 103)",
    calc: (A = 100) => `rgb(255 206 103 / ${A}%)`,
  },
  "--black": {
    [Symbol.toPrimitive]: () => "rgb(0, 0, 0)",
    calc: (A = 100) => `rgb(0 0 0 / ${A}%)`,
  },
};
