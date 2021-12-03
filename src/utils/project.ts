import { useEffect } from "react";
import useAsync from "./http-async";
import { cleanObj} from "./index";
import { useHttp } from "./http";
import { IList } from "../screens/project-list/List";
import { useQuery } from "react-query";

export const useProject = (param?:Partial<IList>)=> {
   const client = useHttp();
   return useQuery<IList[],Error>(['projects',param],()=> client('projects',{data:param}))


}

export const useEditProject = ()=> {
  const {run,...asyncResult} = useAsync()
  const client = useHttp()
  const mutate =(params:Partial<IList>)=> {

    return run(client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }))

  }

  return{mutate,...asyncResult}
}

export const useAddProject = ()=> {
  const {run,...asyncResult} = useAsync()
  const client = useHttp()
  const mutate =(params:Partial<IList>)=> {
    return run(client(`projects/${params.id}`,{
      data:params,
      method:'POST'
    }))

  }

  return{mutate,...asyncResult}
}
