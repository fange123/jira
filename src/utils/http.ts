import qs from 'qs'
import {useAuth} from '../context/auth-context'
import  * as auth from '../auth-provider'
const apiUrl = process.env.REACT_APP_API_URL;

interface IConfig extends RequestInit{
  data?:object,
  token?:string
}


//初始化user
export const initialUser = async() => {
  let user  = null
  const token =auth.getToken()
  if(token){
    const data = await http('me',{token})
    user = data.user

  }
  return user

}


export const http = (endPoint:string,{data,token,headers,...customConfig}:IConfig = {})=> {
const config = {
  method:'GET',
  headers:{
    Authorization:token ? `Bearer ${token}` : '',
    'Context-Type' : data ? 'application/json' : ''
  },
  ...customConfig
}

if(config.method.toLocaleUpperCase() === 'GET'){
  endPoint += `?${qs.stringify(data)}`
}else{
  config.body = JSON.stringify(data || {})
}

  return window.fetch(`${apiUrl}/${endPoint}`,config).then((res)=> {
    if(res.status === 401){
      auth.logout()
      window.location.reload()
      return Promise.reject('请重新登录')
    }
    const data = res.json()
    if(res.ok){
      return data
    }else {
      return Promise.reject(data)
    }

  }).then((res)=> {
    return res
  })

}

export const useHttp = ()=> {
  const {user} = useAuth()
  //ts中的typeof和js中的typeof不一样，ts中的typeof是把后面的变量的类型提取出来，这个变量肯定是个函数类型，Parameters<typeof 函数变量>就能读出函数的参数类型
  return (...[endPoint,config]:Parameters<typeof http>)=>http(endPoint,{...config,token:user?.token})
}
