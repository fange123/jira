import List from "./List";
import SearchPanel from "./SearchPanel";
// import { useDebounce } from "ahooks";
import { useDebounce, useDocumentTitle } from "utils/index";
import styled from "styled-components";
import { Button, Typography } from "antd";
import { useProject } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectsSearchParam } from "./utils";
import { Row } from "components/lib";

interface IProps {
  buttonProject: JSX.Element;
}

const ProjectListScreen = (props: IProps) => {
  const { Text } = Typography;
  const [param, setParam] = useProjectsSearchParam();

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
        {props.buttonProject}
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? <Text type="danger">{error.message}</Text> : null}
      <List
        dataSource={list || []}
        users={users || []}
        loading={isLoading}
        buttonProject={props.buttonProject}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListScreen;
