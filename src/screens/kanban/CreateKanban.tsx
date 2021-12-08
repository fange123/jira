import { Input } from "antd";
import React, { useState } from "react";
import { useKanBanQueryKey, useProjectIdInUrl } from "screens/kanban/utils";
import { useAddKanban } from "utils/kanban";
import { Container } from "./KanbanColumn";

interface IProps {}

const CreateKanban: React.FC<IProps> = (props) => {
  const [name, setName] = useState<string>("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addKanban } = useAddKanban(useKanBanQueryKey());
  const submit = async () => {
    await addKanban({ name, projectId });
    setName("");
  };
  return (
    <Container>
      <Input
        size="large"
        placeholder="新建看板名称"
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Container>
  );
};

export default CreateKanban;
