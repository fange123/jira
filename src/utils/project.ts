
import { useHttp } from "./http";
import { IList } from "type/project";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useProject = (param?:Partial<IList>)=> {
   const client = useHttp();
   return useQuery<IList[]>(['projects',param],()=> client('projects',{data:param}))


}

export const useEditProject = ()=> {
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation((params:Partial<IList>)=>client(`projects/${params.id}`,{
    method: 'PATCH',
    data:params
  }),{
    //~类似于自动刷新功能
    onSuccess:()=>queryClient.invalidateQueries('projects'),
  })

}
export const useDeleteProject = ()=> {
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation((params:Partial<IList>)=>client(`projects/${params.id}`,{
    method: 'DELETE',
  }),{
    //~类似于自动刷新功能
    onSuccess:()=>queryClient.invalidateQueries('projects'),
  })

}

export const useAddProject = ()=> {
  const client = useHttp()
   const queryClient = useQueryClient()

   return useMutation((params:Partial<IList>)=>client(`projects`,{
     method: 'POST',
    data:params
   }),{
    //~类似于自动刷新功能
    onSuccess:()=>queryClient.invalidateQueries('projects')
  })


}

export const useProjectDetail = (id?:number)=> {
  const client  = useHttp()
  return useQuery<IList>(['project',id],
  ()=>client(`projects/${id}`),
  //~useQuery的第三个参数一般都是配置项
  //~当id不存在时步伐请求
  {
    enabled:!!id
  })
}
