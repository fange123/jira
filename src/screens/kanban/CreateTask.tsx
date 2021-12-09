import React, { useEffect, useState } from "react";
import { useAddTask } from "utils/task";
import { useTaskQueryKey, useProjectIdInUrl } from "screens/kanban/utils";
import { Card, Input } from "antd";

interface IProps {
  kanbanId: number;
}

const CreateTask: React.FC<IProps> = (props) => {
  const { kanbanId } = props;
  const [name, setName] = useState<string>("");
  const { mutateAsync: addTask } = useAddTask(useTaskQueryKey());
  const projectId = useProjectIdInUrl();
  const [inputMode, setInputMode] = useState<boolean>(false);

  const submit = async () => {
    await addTask({ name, projectId, kanbanId });
    setInputMode(false);
    setName("");
  };

  const toggle = () => setInputMode(!inputMode);

  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);

  if (!inputMode) {
    return (
      <div onClick={toggle} style={{ cursor: "pointer" }}>
        +创建事物
      </div>
    );
  }

  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder="需要做些什么"
        autoFocus={true}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      ></Input>
    </Card>
  );
};

export default CreateTask;
