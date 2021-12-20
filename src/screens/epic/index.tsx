import { Row, ScreenContainer } from "components/lib";
import React, { useState } from "react";
import { useProjectInUrl } from "screens/kanban/utils";
import { useDeleteEpics, useEpic } from "utils/epic";
import { useEpicsQueryKey, useEpicsSearchParams } from "screens/epic/utils";
import { Button, List, Modal } from "antd";
import dayjs from "dayjs";
import { useTask } from "utils/task";
import { Link } from "react-router-dom";
import CreateEpic from "./CreateEpic";
import { IEpic } from "type/epic";

interface IProps {}

const EpicScreen: React.FC<IProps> = (props) => {
  const { data: currentProjects } = useProjectInUrl();
  const { data: epics } = useEpic(useEpicsSearchParams());
  const { data: tasks } = useTask({ projectId: currentProjects?.id });
  const { mutate: deleteEpic } = useDeleteEpics(useEpicsQueryKey());

  const confirmDeleteEpic = (epic: IEpic) => {
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除吗？",
      content: "点击确定删除",
      onOk() {
        deleteEpic({ id: epic.id });
      },
    });
  };

  const [epicCreateOpen, setEpicCreateOpen] = useState<boolean>(false);
  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{currentProjects?.name}任务组</h1>
        <Button onClick={() => setEpicCreateOpen(true)}>创建任务组</Button>
      </Row>
      <List
        style={{ overflow: "scroll" }}
        dataSource={epics}
        itemLayout="vertical"
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between={true}>
                  <span>{epic?.name}</span>
                  <Button type="link" onClick={() => confirmDeleteEpic(epic)}>
                    删除
                  </Button>
                </Row>
              }
              description={
                <>
                  <div>开始时间：{dayjs(epic.start).format("YYYY-MM-DD")}</div>
                  <div>结束时间：{dayjs(epic.end).format("YYYY-MM-DD")}</div>
                </>
              }
            />
            <div>
              {tasks
                ?.filter((item) => item.id === item.epicId)
                .map((task) => (
                  <Link
                    to={`/projects/${currentProjects?.id}/kanban?editingTaskId=${task.id}`}
                    key={task.id}
                  >
                    {task.name}
                  </Link>
                ))}
            </div>
          </List.Item>
        )}
      />
      <CreateEpic
        onClose={() => setEpicCreateOpen(false)}
        visible={epicCreateOpen}
      />
    </ScreenContainer>
  );
};

export default EpicScreen;
