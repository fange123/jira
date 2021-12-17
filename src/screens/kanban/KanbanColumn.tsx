import React from "react";
import { IKanBan } from "type/kanban";
import { useTask } from "utils/task";
import { useTaskTypes } from "utils/task-type";
import { useKanBanQueryKey, useTaskModal, useTaskSearchParams } from "./utils";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import styled from "styled-components";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import CreateTask from "./CreateTask";
import TaskModal from "./TaskModal";
import { ITask } from "type/task";
import Mask from "components/Mask";
import { useDeleteKanbans } from "utils/kanban";
import { Row } from "components/lib";
import { Drag, Drop, DropChild } from "components/drag-and-drop";

const KanbanColumn = React.forwardRef<HTMLDivElement, { kanban: IKanBan }>(
  ({ kanban, ...restProps }, ref) => {
    const { data: allTasks } = useTask(useTaskSearchParams());
    const { startTask } = useTaskModal();
    const { name: keywords } = useTaskSearchParams();

    const TaskTypeIcon = ({ id }: { id: number }) => {
      const { data: taskTypes } = useTaskTypes();
      const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
      if (!name) {
        return null;
      }
      return (
        <img alt={"task-icon"} src={name === "task" ? taskIcon : bugIcon} />
      );
    };

    const More = ({ kanban }: { kanban: IKanBan }) => {
      const { mutateAsync } = useDeleteKanbans(useKanBanQueryKey());
      const startEdit = () => {
        Modal.confirm({
          okText: "确定",
          cancelText: "取消",
          title: "确定删除看板吗？",
          onOk() {
            return mutateAsync({ id: kanban.id });
          },
        });
      };
      const overlay = () => {
        return (
          <Menu>
            <Menu.Item>
              <Button onClick={startEdit} type="link">
                删除
              </Button>
            </Menu.Item>
          </Menu>
        );
      };
      return (
        <Dropdown overlay={overlay}>
          <Button type="link">...</Button>
        </Dropdown>
      );
    };

    const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
    const TaskCard = ({ task }: { task: ITask }) => {
      return (
        <Card
          style={{ marginBottom: ".5rem", cursor: "pointer" }}
          key={task.id}
          onClick={() => startTask(task.id)}
        >
          <p>
            <Mask name={task.name} keywords={keywords} />
          </p>
          <TaskTypeIcon id={task.typeId} />
        </Card>
      );
    };

    return (
      <Container ref={ref} {...restProps}>
        <Row between={true}>
          <h3>{kanban?.name}</h3>
          <More kanban={kanban} key={kanban.id} />
        </Row>
        <TaskContainer>
          <Drop type="ROW" direction="vertical" droppableId={String(kanban.id)}>
            <DropChild>
              {tasks?.map((task, index) => (
                <Drag
                  key={task.id}
                  draggableId={"task" + task.id}
                  index={index}
                >
                  <div>
                    <TaskCard task={task} key={task.id} />
                  </div>
                </Drag>
              ))}
            </DropChild>
          </Drop>
          <CreateTask kanbanId={kanban.id} />
        </TaskContainer>
        <TaskModal />
      </Container>
    );
  }
);

export default KanbanColumn;

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgba(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
