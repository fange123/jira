import {IEpic} from 'type/epic'
import { useHttp } from "./http";
import {  QueryKey, useMutation, useQuery, useQueryClient } from "react-query";

export const useEpic = (param?:Partial<IEpic>)=> {
   const client = useHttp();
   return useQuery<IEpic[]>(['epics',param],()=> client('epics',{data:param}))


}

export const useAddEpic = (queryKey: QueryKey)=> {
  const client = useHttp()
   const queryClient = useQueryClient()

   return useMutation((params:Partial<IEpic>)=>client(`epics`,{
     method: 'POST',
    data:params
   }),{
    //~类似于自动刷新功能
    onSuccess:()=>queryClient.invalidateQueries(queryKey)
  })


}

export const useDeleteEpics = (queryKey: QueryKey)=> {
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation((params:Partial<IEpic>)=>client(`epics/${params.id}`,{
    method: 'DELETE',
  }),{
    //~类似于自动刷新功能
    onSuccess:()=>queryClient.invalidateQueries(queryKey),
  })

}


