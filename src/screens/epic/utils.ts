import {useProjectIdInUrl} from 'screens/kanban/utils'

export const useEpicsSearchParams = ()=>({projectId: useProjectIdInUrl()})

export const useEpicsQueryKey = ()=>['epics',useEpicsSearchParams()]


