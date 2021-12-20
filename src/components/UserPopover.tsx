import { Divider, List, Popover, Typography } from "antd";
import React from "react";
import { useUsers } from "utils/user";

interface IProps {}

const UserPopover: React.FC<IProps> = (props) => {
  const { data: users, refetch } = useUsers();

  const content = (
    <div>
      <Typography.Text type="secondary">组员列表</Typography.Text>
      <List>
        {users?.map((item) => (
          <List.Item key={item.id}>
            <List.Item.Meta title={item.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
    </div>
  );
  return (
    <Popover
      placement="bottom"
      content={content}
      onVisibleChange={() => refetch()}
    >
      组员
    </Popover>
  );
};

export default UserPopover;
