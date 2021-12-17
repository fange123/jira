import React, { useCallback } from "react";
import { useDocumentTitle } from "utils";
import { useKanban, useReorderKanban } from "utils/kanban";
import {
  useKanBanQueryKey,
  useKanBanSearchParams,
  useProjectInUrl,
  useTaskQueryKey,
  useTaskSearchParams,
} from "./utils";

import KanbanColumn from "./KanbanColumn";
import styled from "styled-components";
import SearchPanel from "./SearchPanel";
import { ScreenContainer } from "components/lib";
import { useReorderTask, useTask } from "utils/task";
import { Spin } from "antd";
import CreateKanban from "./CreateKanban";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "components/drag-and-drop";

interface IProps {}

const KanBanScreen: React.FC<IProps> = (props) => {
  useDocumentTitle("看板列表");
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanban(
    useKanBanSearchParams()
  );
  const { data: currentProjects } = useProjectInUrl();
  const { isLoading: taskIsLoading } = useTask(useTaskSearchParams());

  const dropEnd = useDragEnd();

  const isLoading = kanbanIsLoading || taskIsLoading;

  return (
    <DragDropContext onDragEnd={dropEnd}>
      <ScreenContainer>
        <h1>{currentProjects?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <KanBanContainer>
            <Drop type="COLUMN" direction="horizontal" droppableId="kanban">
              <DropChild style={{ display: "flex" }}>
                {kanbans?.map((item, index) => (
                  <Drag
                    key={item.id}
                    draggableId={"kanban" + item.id}
                    index={index}
                  >
                    <KanbanColumn key={item.id} kanban={item} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateKanban />
          </KanBanContainer>
        )}
      </ScreenContainer>
    </DragDropContext>
  );
};

export default KanBanScreen;

export const useDragEnd = () => {
  const { data: kanbans } = useKanban(useKanBanSearchParams());
  const { mutate: reorderKanban } = useReorderKanban(useKanBanQueryKey());
  const { mutate: reorderTask } = useReorderTask(useTaskQueryKey());

  const { data: allTasks = [] } = useTask(useTaskSearchParams());
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }
      //*看板排序
      if (type === "COLUMN") {
        const fromId = kanbans?.[source.index].id;
        const toId = kanbans?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }

        const type = destination.index > source.index ? "after" : "before";
        reorderKanban({ fromId, referenceId: toId, type });
      }

      //*task排序
      if (type === "ROW") {
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;

        const fromTask = allTasks.filter(
          (item) => item.kanbanId === fromKanbanId
        )[source.index];

        const toTask = allTasks.filter((item) => item.kanbanId === toKanbanId)[
          destination.index
        ];

        if (fromTask?.id === toTask?.id) {
          return;
        }

        reorderTask({
          fromKanbanId,
          toKanbanId,
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          type:
            fromKanbanId === toKanbanId && destination.index > source.index
              ? "after"
              : "before",
        });
      }
    },
    [reorderKanban, kanbans, allTasks, reorderTask]
  );
};

export const KanBanContainer = styled("div")`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
