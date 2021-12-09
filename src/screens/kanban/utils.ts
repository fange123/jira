import { useCallback, useMemo } from 'react'
import {useLocation} from 'react-router'
import {useProjectDetail} from 'utils/project'
import {  useTaskDetail } from 'utils/task'
import { useUrlQueryParam } from 'utils/url'
export const useProjectIdInUrl = ()=> {
  const {pathname} = useLocation()

  const id = pathname.match(/projects\/(\d)+/)?.[1]
  return Number(id)

}

export const useProjectInUrl =()=>useProjectDetail(useProjectIdInUrl())

export const useKanBanSearchParams = ()=>({projectId: useProjectIdInUrl()})

export const useKanBanQueryKey = ()=>['kanbans',useKanBanSearchParams()]

export const useTaskSearchParams = ()=>{
  const [param] = useUrlQueryParam([
    'name',
    'typeId',
    'processorId',
    'tagId'
  ])

const projectId = useProjectIdInUrl()


  return useMemo(() => ({projectId ,
    typeId:Number(param.typeId) || undefined,
    processorId:Number(param.processorId) || undefined,
    tagId:Number(param.tagId) || undefined,
  name:param.name }), [projectId,param])
}

export const useTaskQueryKey = ()=>['tasks',useTaskSearchParams()]

export const useTaskModal = ()=>{
  const [{editingTaskId},setEditingTaskId]= useUrlQueryParam(['editingTaskId'])
  const {data:editTaskDetail,isLoading} = useTaskDetail(Number(editingTaskId))
  const startTask = useCallback((id:number)=>{

    setEditingTaskId({editingTaskId:id})
  },[setEditingTaskId])
  const closeTask = useCallback(()=>{
    setEditingTaskId({editingTaskId:''})
  },[setEditingTaskId])

  return {
    startTask,
    closeTask,
    editTaskDetail,
    isLoading,
    editingTaskId
  }

}
