import {IUsers} from 'screens/project-list/List';
import {createSlice} from '@reduxjs/toolkit'
import * as auth from 'auth-provider'
import {User} from 'context/auth-context'
import {AppDispatch, RootState} from './index'

interface State{
  user:IUsers|null
}

const initialState:State = {
  user:null
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{
    setUser(state,action){
      state.user = action.payload
    }

}
})

export const selectUser =(state:RootState)=>state.auth.user

const {setUser} =authSlice.actions
export const login = (form:User)=>(dispatch:AppDispatch)=>auth.login(form).then((user)=>dispatch(setUser(user)))
export const register = (form:User)=>(dispatch:AppDispatch)=>auth.register(form).then((user)=>dispatch(setUser(user)))
export const logout = ()=>(dispatch:AppDispatch)=>auth.logout().then(()=>dispatch(setUser(null)))
