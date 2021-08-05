import {MY_TOKEN} from './utils/constant'
import {IUsers} from './screens/project-list/List'

const apiUrl = process.env.REACT_APP_API_URL;

export const getToken = ()=> window.localStorage.getItem(MY_TOKEN)

export const handleUserResponse = ({user}:{user:IUsers})=> {
  window.localStorage.setItem(MY_TOKEN,user.token || '')
  return user

}

export const login = (params: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .then((res) => {
      if(res.ok){
        return res.json()
      }else {
        return Promise.reject('')
      }
    })
    .then(res => {
      return handleUserResponse(res)
    });
};

export const register = (params: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .then((res) => {
      if(res.ok){
        return res.json()
      }else {
        return Promise.reject('')
      }
    })
    .then(res => {
      return handleUserResponse(res)
    });
};

export const  logout = async ()=> window.localStorage.removeItem(MY_TOKEN)
