import {IKanBan} from 'type/kanban'
import { useHttp } from "./http";
import {  useQuery } from "react-query";

export const useKanban = (param?:Partial<IKanBan>)=> {
   const client = useHttp();
   return useQuery<IKanBan[]>(['kanbans',param],()=> client('kanbans',{data:param}))


}
