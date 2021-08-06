import { useEffect, useState } from "react";

const isFalsy = (value:unknown) => (value === 0 ? false : !value);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

//自定义hooks
export const useDebounce = <T>(value: T,delay?: number)=>{
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(()=> {
    const timeout = setTimeout(()=> {
      setDebounceValue(value)
    },delay)

    return ()=> clearInterval(timeout)

  },[value,delay])
  return debounceValue
}

export const useArray = <T>(obj:T[]) => {
  const [value, setValue] = useState(obj)// hello，请把作业写在这里吧，写完记得再对照作业要求检查一下

  return {
    value,
    add:(item:T) => {
      setValue([...value,item])
    },
    clear:() => {
      setValue([])
    },
    removeIndex:(index:number) => {
      const copy = [...value]
      copy.splice(index,1)
      setValue(copy)

    }

  }
};
