const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

let styleColorMap = {};
colors.forEach((color) => {
  styleColorMap[color] = { color };
});
export { colors, styleColorMap };
