// 返回页面url中，指定键的参数值

import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObj } from "utils"

export const useUrlQueryParam = <K extends string>(keys:K[])=> {
  const [searchParams] = useSearchParams()
  const setSearchParams = useSetUrlSearchParams()

  return [

    //+useMemo可以避免重复渲染
   useMemo(() =>  keys.reduce((prev:{[key in K]:string},key:K)=> {
      return {...prev,[key]:searchParams.get(key) || ''}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },{} as {[key in K] : string}), [searchParams]),
    (params:Partial<{[key in K]:unknown}>)=> {

      return setSearchParams(params)

    }
  ] as const
}

// TODO: as const的作用
//* 如果出现一下情况：

// const a = ['jack',18,{sex:'男'}]
// const a = ['jack',18,{sex:'男'}] as const

//*本来是想这个数组第一项是字符串，第二项是数字，第三项是对象，但是ts只能认为每一项都是string | number | object
//*as const就是解决这个问题的

export const useSetUrlSearchParams = ()=> {
   const [searchParams,setSearchParams] = useSearchParams()

   return (params:{[key in string]:unknown})=> {
     const o =cleanObj({...Object.fromEntries(searchParams),...params}) as URLSearchParamsInit
      return setSearchParams(o)

   }

}
