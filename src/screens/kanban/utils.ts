import {useLocation} from 'react-router'
import {useProjectDetail} from 'utils/project'
export const useProjectIdInUrl = ()=> {
  const {pathname} = useLocation()

  const id = pathname.match(/projects\/(\d)+/)?.[1]
  return Number(id)

}

export const useProjectInUrl =()=>useProjectDetail(useProjectIdInUrl())

export const useKanBanSearchParams = ()=>({projectId: useProjectIdInUrl()})

export const useKanBanQueryKey = ()=>['kanbans',useKanBanSearchParams()]

export const useTaskSearchParams = ()=>({projectId: useProjectIdInUrl()})

export const useTaskQueryKey = ()=>['tasks',useTaskSearchParams()]
