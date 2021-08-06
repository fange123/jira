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
    if(res.ok){
      return res.json()

    }else {
      return Promise.reject(res.json())

    }
  }).then()

}

export const useHttp = ()=> {
  const {user} = useAuth()
  return (...[endPoint,config]:Parameters<typeof http>)=>http(endPoint,{...config,token:user?.token})
}
