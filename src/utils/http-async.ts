import { useCallback, useState } from "react"
import { useMountedRef } from "utils"


interface IState<D>{
  error : Error | null
  data: D | null
  stat:'success' | 'loading' | 'error' | 'idle'
}

const initialDefaultState:IState<null> = {
  error:null,
  data:null,
  stat:'idle'

}

const defaultConfig = {
  throwOnError:false
}

const useAsync = <D>(initialState?:IState<D>,initialConfig?:typeof defaultConfig)=> {

  const config = {
    ...defaultConfig,
    initialConfig
  }
  const [state, setState] = useState<IState<D>>({
    ...initialDefaultState,
    ...initialState
  })

  const mountedRef = useMountedRef()

  const setData = useCallback((data: D)=> {
  setState({
    error:null,
    data,
    stat:'success'
  })
},[])
  const setError = useCallback((error: Error | null)=> {
  setState({
    error:error,
    data:null,
    stat:'error'
  })
},[])

const run = useCallback(async (promise:Promise<D>)=> {
  if(!promise || !promise.then){
    throw new Error('请输入 Promise 类型数据')
  }
  setState(prevState=>({...prevState,stat:'loading'}))
  try {
    const data = await promise
    if(mountedRef.current)
    setData(data)
    return data
  } catch (error) {
    setError(error as Error)
    if(config.throwOnError) return Promise.reject(error)
    return error
  }

},[config.throwOnError, mountedRef, setData,setError])


  return{
    isIdle:state.stat === 'idle',
    isLoading:state.stat === 'loading',
    isError:state.stat === 'error',
    isSuccess:state.stat === 'success',
    setError,
    setData,
    run,
    //retry被调用时重新调用一次run,让state刷新一遍
    retry:()=>{},
    ...state

  }
}

export default useAsync
