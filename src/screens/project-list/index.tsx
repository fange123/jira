import List from "./List";
import SearchPanel from "./SearchPanel";
// import { useDebounce } from "ahooks";
import { useDebounce, useDocumentTitle } from "utils/index";
import styled from "styled-components";
import { Button } from "antd";
import { useProject } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectModal, useProjectsSearchParam } from "./utils";
import { ErrorBox, Row } from "components/lib";

interface IProps {}

const ProjectListScreen = (props: IProps) => {
  const [param, setParam] = useProjectsSearchParam();
  const { open } = useProjectModal();

  useDocumentTitle("项目列表", false);
  //自定义的hooks
  //ahooks的hooks
  // const debouncedValue = useDebounce(param, { wait: 2000 });
  const { isLoading, error, data: list } = useProject(useDebounce(param, 2000));

  const { data: users } = useUsers();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button onClick={open}>新建项目</Button>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <ErrorBox error={error} />
      <List dataSource={list || []} users={users || []} loading={isLoading} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
  width: 100%;
`;

export default ProjectListScreen;
