import {createSlice} from '@reduxjs/toolkit'
import { RootState } from 'store';

interface State {
  projectOpenModal: boolean
}

const initialState:State = {
  projectOpenModal: false
}


export const projectListSlice = createSlice({
    name: 'projectListSlice',
    initialState,
    reducers:{
    openProjectModal(state){
      //TODO:reducer中原来是不可以直接改变state的值的，但是react toolkit由于借助了immer，进行了一些转换
      state.projectOpenModal = true;
    },
    closeProjectModal(state){
      state.projectOpenModal = false;
    }
    }
})

export const projectActionList =projectListSlice.actions

export const selectProjectModalOpen =(state:RootState)=> state.projectList.projectOpenModal
