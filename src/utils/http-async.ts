import { useState } from "react"

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

const useAsync = <D>(initialState?:IState<D>)=> {
  const [state, setState] = useState<IState<D>>({
    ...initialDefaultState,
    ...initialState
  })

  const setData = (data: D)=> {
  setState({
    error:null,
    data,
    stat:'success'
  })
}
  const setError = (error: Error | null)=> {
  setState({
    error:error,
    data:null,
    stat:'error'
  })
}

const run = (promise:Promise<D>)=> {
  if(!promise || !promise.then){
    throw new Error('请输入 Promise 类型数据')
  }
  setState({...state,stat:'loading'})
  return promise.then(data=> {
    setData(data)
    return data
  }).catch(error => {
    setError(error)
    return error
  })

}


  return{
    isIdle:state.stat === 'idle',
    isLoading:state.stat === 'loading',
    isError:state.stat === 'error',
    isSuccess:state.stat === 'success',
    setError,
    setData,
    run,
    ...state

  }
}

export default useAsync
