import {ITaskType} from 'type/taskType';
import { useHttp } from "./http";
import {  useQuery } from "react-query";

export const useTaskTypes = (param?:Partial<ITaskType>)=> {
   const client = useHttp();
   return useQuery<ITaskType[]>(['taskTypes',param],()=> client('taskTypes',{data:param}))

}
