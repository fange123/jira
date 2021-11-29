import { useEffect } from "react";
import useAsync from "./http-async";
import { cleanObj} from "./index";
import { useHttp } from "./http";
import { IList } from "../screens/project-list/List";

export const useProject = (param?:Partial<IList>)=> {
   const client = useHttp();
   const { run, error, ...result } = useAsync<IList[]>();
    useEffect(() => {
    run(client("projects", { data: cleanObj(param || {}) }));
  }, [param,client,run]);


  return {error,...result}

}

export const useEditProject = ()=> {
  const {run,...asyncResult} = useAsync()
  const client = useHttp()
  const mutate =(params:Partial<IList>)=> {

    return run(client(`projects/${params.id}`,{
      data:params,
      method:'PATCH'
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
