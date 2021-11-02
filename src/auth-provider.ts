import {MY_TOKEN} from './utils/constant'
import {IUsers} from './screens/project-list/List'

const apiUrl = process.env.REACT_APP_API_URL;

export const getToken = ()=> window.localStorage.getItem(MY_TOKEN)

export const handleUserResponse = (user:IUsers)=> {
  window.localStorage.setItem(MY_TOKEN,user.token || '')
  return user

}

export const login = async (params: { username: string; password: string }) => {
  const res = await fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
   const date = await res.json();
  if (res.ok) {
    return handleUserResponse(date.user);
  } else {
    return Promise.reject(date);
  }

};

export const register = async (params: { username: string; password: string }) => {
  const res = await fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const date = await res.json();
  if (res.ok) {

    return handleUserResponse(date.user);
  } else {
    return Promise.reject(date);
  }

};

export const  logout = async ()=> window.localStorage.removeItem(MY_TOKEN)
