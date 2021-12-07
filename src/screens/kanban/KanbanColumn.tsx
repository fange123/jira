import React from "react";
import { IKanBan } from "type/kanban";
import { useTask } from "utils/task";
import { useTaskSearchParams } from "./utils";

interface IProps {
  kanban: IKanBan;
}

const KanbanColumn: React.FC<IProps> = (props) => {
  const { kanban } = props;
  const { data: allTasks } = useTask(useTaskSearchParams());

  const tasks = allTasks?.filter((task) => task.id === kanban.id);
  return (
    <div>
      <h3>{kanban.name}</h3>
      {tasks?.map((task) => (
        <div key={task.id}>{task.name}</div>
      ))}
    </div>
  );
};

export default KanbanColumn;
