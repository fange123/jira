import { useState } from "react";
import List from "./List";
import SearchPanel from "./SearchPanel";
// import { useDebounce } from "ahooks";
import { useDebounce, useDocumentTitle } from "utils/index";
import styled from "styled-components";
import { Typography } from "antd";
import { useProject } from "utils/project";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";

const ProjectListScreen = () => {
  const { Text } = Typography;

  const [param, setParam] = useUrlQueryParam(["name", "personId"]);

  useDocumentTitle("项目列表", false);
  //自定义的hooks
  const debouncedValue = useDebounce(param, 2000);
  //ahooks的hooks
  // const debouncedValue = useDebounce(param, { wait: 2000 });
  const { isLoading, error, data: list } = useProject(debouncedValue);

  const { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? <Text type="danger">{error.message}</Text> : null}
      <List dataSource={list || []} users={users || []} loading={isLoading} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListScreen;
