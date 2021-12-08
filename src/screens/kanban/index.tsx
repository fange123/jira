import React from "react";
import { useDocumentTitle } from "utils";
import { useKanban } from "utils/kanban";
import { useKanBanSearchParams, useProjectInUrl } from "./utils";
import KanbanColumn from "./KanbanColumn";
import styled from "styled-components";
import SearchPanel from "./SearchPanel";
import { ScreenContainer } from "components/lib";

interface IProps {}

const KanBanScreen: React.FC<IProps> = (props) => {
  useDocumentTitle("看板列表");
  const { data: kanbans } = useKanban(useKanBanSearchParams());
  const { data: currentProjects } = useProjectInUrl();
  return (
    <ScreenContainer>
      <h1>{currentProjects?.name}看板</h1>
      <SearchPanel />
      <KanBanContainer>
        {kanbans?.map((item) => (
          <KanbanColumn key={item.id} kanban={item} />
        ))}
      </KanBanContainer>
    </ScreenContainer>
  );
};

export default KanBanScreen;

export const KanBanContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
