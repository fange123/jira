import React from "react";
import { Button, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  projectActionList,
  selectProjectModalOpen,
} from "./project-list-slice";

interface IProps {}

const ProjectModal: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectProjectModalOpen);
  return (
    <Drawer
      visible={projectModalOpen}
      width="100%"
      onClose={() => dispatch(projectActionList.closeProjectModal())}
    >
      <h1>hh</h1>
      <Button onClick={() => dispatch(projectActionList.closeProjectModal())}>
        关闭
      </Button>
    </Drawer>
  );
};

export default ProjectModal;
