const isFalsy = (value) => (value === 0 ? false : !value);
export const cleanObj = (obj) => {
  const newObj = { ...obj };
  console.log(obj);
  for (const key in newObj) {
    if (isFalsy(newObj[key])) {
      delete newObj[key];
    }
  }
  return newObj;
};

// export const cleanObj = (object) => {
//   const result = { ...object };
//   Object.keys(result).forEach((key) => {
//     // 0
//     const value = result[key];
//     if (isFalsy(value)) {
//       delete result[key];
//     }
//   });
//   return result;
// };
