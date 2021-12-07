import { useEffect } from "react";
import useAsync from "./http-async";
import { cleanObj} from "./index";
import { useHttp } from "./http";
import { IUsers } from "type/user";

export const useUsers = (param?:Partial<IUsers>)=> {
   const client = useHttp();
   const { run,  ...result } = useAsync<IUsers[]>();
    useEffect(() => {
    run(client("users", { data: cleanObj(param || {}) }));
  }, [param,run,client]);

  return result

}
