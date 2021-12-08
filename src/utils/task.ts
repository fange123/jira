import {ITask} from 'type/task';
import { useHttp } from "./http";
import {  QueryKey, useMutation, useQuery, useQueryClient } from "react-query";

export const useTask = (param?:Partial<ITask>)=> {
   const client = useHttp();
   return useQuery<ITask[]>(['tasks',param],()=> client('tasks',{data:param}))


}

export const useAddTask = (queryKey: QueryKey)=> {
  const client = useHttp()
   const queryClient = useQueryClient()

   return useMutation((params:Partial<ITask>)=>client(`tasks`,{
     method: 'POST',
    data:params
   }),{
    //~类似于自动刷新功能
    onSuccess:()=>queryClient.invalidateQueries(queryKey)
  })


}
