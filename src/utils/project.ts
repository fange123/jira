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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  console.log( error?.message);


  return {error,...result}

}
