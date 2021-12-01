import React from "react";
import { Button, Drawer } from "antd";

interface IProps {
  projectOpenModal: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<IProps> = (props) => {
  const { projectOpenModal, onClose } = props;
  return (
    <Drawer visible={projectOpenModal} width="100%" onClose={onClose}>
      <h1>hh</h1>
      <Button onClick={onClose}>关闭</Button>
    </Drawer>
  );
};

export default ProjectModal;
