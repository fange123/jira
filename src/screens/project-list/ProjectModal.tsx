import React from "react";
import { Button, Drawer } from "antd";
import { useProjectModal } from "./utils";

interface IProps {}

const ProjectModal: React.FC<IProps> = (props) => {
  const { projectModalOpen, close } = useProjectModal();
  return (
    <Drawer visible={projectModalOpen} width="100%" onClose={close}>
      <h1>hh</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};

export default ProjectModal;
