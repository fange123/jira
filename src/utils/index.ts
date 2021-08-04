import { useEffect, useState } from "react";

const isFalsy = (value:any) => (value === 0 ? false : !value);
export const cleanObj = (obj:Record<string,unknown>) => {
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
export const useMount = (callback:()=>void) => {
  useEffect(() => {
    callback()
  }, []);
};

//自定义hooks
export const useDebounce = (value: any,delay: any)=>{
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(()=> {
    const timeout = setTimeout(()=> {
      setDebounceValue(value)
    },delay)

    return ()=> clearInterval(timeout)

  },[value,delay])
  return debounceValue
}
