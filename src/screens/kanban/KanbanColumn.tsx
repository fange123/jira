import React from "react";
import { IKanBan } from "type/kanban";
import { useTask } from "utils/task";
import { useTaskTypes } from "utils/task-type";
import { useTaskSearchParams } from "./utils";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import styled from "styled-components";
import { Card } from "antd";

interface IProps {
  kanban: IKanBan;
}

const KanbanColumn: React.FC<IProps> = (props) => {
  const { kanban } = props;
  const { data: allTasks } = useTask(useTaskSearchParams());

  const TaskTypeIcon = ({ id }: { id: number }) => {
    const { data: taskTypes } = useTaskTypes();
    const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
    if (!name) {
      return null;
    }
    return <img alt={"task-icon"} src={name === "task" ? taskIcon : bugIcon} />;
  };

  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  console.log(tasks);

  return (
    <Container>
      <h3>{kanban?.name}</h3>
      <TaskContainer>
        {tasks?.map((task) => (
          <Card style={{ marginBottom: ".5rem" }} key={task.id}>
            <div>{task.name}</div>
            <TaskTypeIcon id={task.typeId} />
          </Card>
        ))}
      </TaskContainer>
    </Container>
  );
};

export default KanbanColumn;

const Container = styled.div`
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
