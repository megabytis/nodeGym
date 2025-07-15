// Export All as WHOLE inside an ' { } '
const sum = (a, b) => console.log(a + b);
function mult(a, b) {
  console.log(a * b);
}
let b = 90;

export { sum, b, mult };

// ----- OR ------

// Export individually by typing 'export' before any variable
export const div = function (x, y) {
  return x / y;
};

export let name = "Madhuudan";
