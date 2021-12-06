import { useMemo } from 'react';
import { useProjectDetail } from 'utils/project';
import {useSetUrlSearchParams, useUrlQueryParam} from '../../utils/url'
import { useSearchParams } from 'react-router-dom';

export const useProjectsSearchParam = ()=> {

 const [param, setParam] = useUrlQueryParam(["name", "personId"]);
 return [
   useMemo(() => ({
    ...param,
    personId: Number(param.personId) || undefined,
  }), [param]),
  setParam
 ] as const;}


 export const useProjectModal = ()=>{
  const [{projectCreate},setProjectCreate] = useUrlQueryParam(['projectCreate'])
  const [{editProjectId},setEditProjectId] = useUrlQueryParam(['editProjectId'])
  const setUrlParams = useSetUrlSearchParams();

  const {data:editProject,isLoading} = useProjectDetail(Number(editProjectId))
  const open = ()=>setProjectCreate({projectCreate:true})
 const close = () => setUrlParams({ projectCreate: '', editProjectId: '' });
  const startEdit = (id:number) =>setEditProjectId({editProjectId:id})

  //+  返回三个活以内的值用tuple的方式比较好，因为可以随便命名，如下
  // return [
  //   projectCreate === 'true',
  //   open,
  //   close
  // ] as const

  //+ 但是，超过三个或以上，还要考虑某些值的解构问题，还是直接返回对象比较好
  return {
    projectModalOpen:projectCreate === 'true' || Boolean(editProjectId),
    open,
    close,
    startEdit,
    editProject,
    isLoading
  }
 }
