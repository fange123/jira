import { useEffect, useRef, useState } from "react";

const isFalsy = (value:unknown) => (value === 0 ? false : !value);
// const isVoid = (value:unknown)=> value === undefined || '' || null

export const cleanObj = (obj:Record<string,unknown>) => {
  const newObj = { ...obj };
  for (const key in newObj) {
    if (isFalsy(newObj[key])) {
      delete newObj[key];
    }
  }
  return newObj;
};

// export const cleanObj = (object:{[key:string]:unknown}) => {
//   const result = { ...object };
//   Object.keys(result).forEach((key) => {
//     // 0
//     const value = result[key];
//     if (isVoid(value)) {
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

export const useDocumentTitle = (title:string,keepOnUnmount:boolean = true)=> {
  //报错页面初始的值，在之后的生命周期中都不会改变
  //!使用useRef
  const oldTitle = useRef(document.title).current
  useEffect(()=> {
    document.title = title
  },[title])

  useEffect(()=> {
    return ()=> {
       if(!keepOnUnmount){
         document.title = oldTitle
      }
    }
  },[keepOnUnmount, oldTitle])

}

//重置路由
export const resetRoute = ()=> window.location.href = window.location.origin

//~用来返回组件的挂载状态，如果还没挂载或者已经卸载，返回false，否则返回true
export const useMountedRef = ()=> {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true

    return ()=> {
       mountedRef.current = false
    }

  })
    return mountedRef


}
