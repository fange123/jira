import { useState,useEffect } from "react"
import List from './List'
import SearchPanel from './SearchPanel'
import qs from 'qs'
import {cleanObj} from '../../utils/index'


 const ProjectListScreen = ()=> {
  const apiUrl = process.env.REACT_APP_API_URL

  const [param,setParam] = useState({
    name:'',
    personId:''
  })
  const [users,setUsers] = useState([])
  const [list,setList] = useState([])
console.log(cleanObj(param));
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObj(param))}`).then(response => {
      if(response.ok){
        return response.json()
      }else {
        return Promise.reject('something went wrong!')
      }
    }).then(data => setList(data))

  }, [param])

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(response => {
      if(response.ok){
        return response.json()
      }else {
        return Promise.reject('something went wrong!')
      }
    }).then(data => setUsers(data))

  }, [])
  return(
   <>
    <List list={list} users={users}/>
    <SearchPanel users={users} param={param} setParam={setParam}/>

   </>
  )
}

export default ProjectListScreen
