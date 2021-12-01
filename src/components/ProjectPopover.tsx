import { Divider, List, Popover, Typography } from "antd";
import React from "react";
import { useProject } from "utils/project";

interface IProps {
  buttonProject: JSX.Element;
}

const ProjectPopover: React.FC<IProps> = (props) => {
  const { buttonProject } = props;
  const { data: projects } = useProject();
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
      {buttonProject}
    </div>
  );
  return (
    <Popover placement="bottom" content={content}>
      项目
    </Popover>
  );
};

export default ProjectPopover;
