import React from "react";
import { useDocumentTitle } from "utils";
import { useKanban } from "utils/kanban";
import {
  useKanBanSearchParams,
  useProjectInUrl,
  useTaskSearchParams,
} from "./utils";

import KanbanColumn from "./KanbanColumn";
import styled from "styled-components";
import SearchPanel from "./SearchPanel";
import { ScreenContainer } from "components/lib";
import { useTask } from "utils/task";
import { Spin } from "antd";
import CreateKanban from "./CreateKanban";

interface IProps {}

const KanBanScreen: React.FC<IProps> = (props) => {
  useDocumentTitle("看板列表");
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanban(
    useKanBanSearchParams()
  );
  const { data: currentProjects } = useProjectInUrl();
  const { isLoading: taskIsLoading } = useTask(useTaskSearchParams());

  const isLoading = kanbanIsLoading || taskIsLoading;

  return (
    <ScreenContainer>
      <h1>{currentProjects?.name}看板</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <KanBanContainer>
          {kanbans?.map((item) => (
            <KanbanColumn key={item.id} kanban={item} />
          ))}
          <CreateKanban />
        </KanBanContainer>
      )}
    </ScreenContainer>
  );
};

export default KanBanScreen;

export const KanBanContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
