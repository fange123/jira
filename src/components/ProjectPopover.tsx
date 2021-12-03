import { Divider, List, Popover, Typography } from "antd";
import React from "react";
import { useProjectModal } from "screens/project-list/utils";
import { useProject } from "utils/project";
import { ButtonNoPadding } from "./lib";

interface IProps {}

const ProjectPopover: React.FC<IProps> = (props) => {
  const { data: projects } = useProject();
  const { open } = useProjectModal();
  const projectPin = projects?.filter((item: any) =>
    item["14"] === "t" ? true : false
  );
  const content = (
    <div>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {projectPin?.map((item) => (
          <List.Item key={item.id}>
            <List.Item.Meta title={item.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding type="link" onClick={open}>
        创建项目
      </ButtonNoPadding>
    </div>
  );
  return (
    <Popover placement="bottom" content={content}>
      项目
    </Popover>
  );
};

export default ProjectPopover;
