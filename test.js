const input = {
  a_b_x: 1,
  a_b_y: 2,
  a_b_z_m: 3,
  a_c: 4,
  d: 5,
};

function convert(input) {
  const output = {};

  for (const key in input) {
    const value = input[key];
    const keys = key.split("_");
    let currentObj = output;

    for (let i = 0; i < keys.length; i++) {
      const currentKey = keys[i];

      if (!currentObj[currentKey]) {
        currentObj[currentKey] = {};
      }

      if (i === keys.length - 1) {
        currentObj[currentKey] = value;
      } else {
        currentObj = currentObj[currentKey];
      }
    }
  }

  return output;
}

const result = convert(input);
console.log(result);
