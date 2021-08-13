import { useState, useEffect } from "react";
import List from "./List";
import SearchPanel from "./SearchPanel";
// import { useDebounce } from "ahooks";
import { cleanObj, useDebounce, useMount } from "../../utils/index";
import { useHttp } from "../../utils/http";
import styled from "styled-components";

const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const client = useHttp();

  //自定义的hooks
  const debouncedValue = useDebounce(param, 2000);
  //ahooks的hooks
  // const debouncedValue = useDebounce(param, { wait: 2000 });

  useEffect(() => {
    client("projects", { data: cleanObj(param) }).then(setList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  useMount(() => {
    client("users").then(setUsers);
  });
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListScreen;
