import {ITask} from 'type/task';
import { useHttp } from "./http";
import {  useQuery } from "react-query";

export const useTask = (param?:Partial<ITask>)=> {
   const client = useHttp();
   return useQuery<ITask[]>(['tasks',param],()=> client('tasks',{data:param}))


}
