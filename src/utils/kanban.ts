import {IKanBan} from 'type/kanban'
import { useHttp } from "./http";
import {  QueryKey, useMutation, useQuery, useQueryClient } from "react-query";

export const useKanban = (param?:Partial<IKanBan>)=> {
   const client = useHttp();
   return useQuery<IKanBan[]>(['kanbans',param],()=> client('kanbans',{data:param}))


}

export const useAddKanban = (queryKey: QueryKey)=> {
  const client = useHttp()
   const queryClient = useQueryClient()

   return useMutation((params:Partial<IKanBan>)=>client(`kanbans`,{
     method: 'POST',
    data:params
   }),{
    //~类似于自动刷新功能
    onSuccess:()=>queryClient.invalidateQueries(queryKey)
  })


}

export const useDeleteKanbans = (queryKey: QueryKey)=> {
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation((params:Partial<IKanBan>)=>client(`kanbans/${params.id}`,{
    method: 'DELETE',
  }),{
    //~类似于自动刷新功能
    onSuccess:()=>queryClient.invalidateQueries(queryKey),
  })

}
