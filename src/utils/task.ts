import {ITask} from 'type/task';
import { useHttp } from "./http";
import {  QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { SortProps } from './kanban';

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

export const useTaskDetail = (id?:number)=> {
  const client  = useHttp()
  return useQuery<ITask>(['task',id],
  ()=>client(`tasks/${id}`),
  //~useQuery的第三个参数一般都是配置项
  //~当id不存在时步伐请求
  {
    enabled:!!id
  })
}


export const useEditTask = (queryKey: QueryKey)=> {
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation((params:Partial<ITask>) =>client(`tasks/${params.id}`,{
    method: 'PATCH',
    data:params
  }),{
    //~类似于自动刷新功能
    onSuccess:()=>queryClient.invalidateQueries(queryKey),
  })

}

export const useDeleteTask = (queryKey: QueryKey)=> {
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation((params:Partial<ITask>)=>client(`tasks/${params.id}`,{
    method: 'DELETE',
  }),{
    //~类似于自动刷新功能
    onSuccess:()=>queryClient.invalidateQueries(queryKey),
  })

}

export const useReorderTask= (queryKey: QueryKey)=> {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation((params:SortProps)=> {
    return client('tasks/reorder',{
      data:params,
      method: 'POST'
    })

  },{
    //~类似于自动刷新功能
    onSuccess:()=>queryClient.invalidateQueries(queryKey),
  })

}
