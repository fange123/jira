import { useHttp } from "./http";
import { IUsers } from "type/user";
import { useQuery } from "react-query";



export const useUsers = (param?:Partial<IUsers>)=> {
   const client = useHttp();
   return useQuery<IUsers[]>(['users',param],()=> client('users',{data:param}))


}
