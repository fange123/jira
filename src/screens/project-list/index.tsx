import { useState, useEffect } from "react";
import List from "./List";
import SearchPanel from "./SearchPanel";
// import { useDebounce } from "ahooks";
import { cleanObj, useDebounce, useMount } from "../../utils/index";
import { useHttp } from "../../utils/http";

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
  }, [debouncedValue]);

  useMount(() => {
    client("users").then(setUsers);
  });
  return (
    <>
      <List list={list} users={users} />
      <SearchPanel users={users} param={param} setParam={setParam} />
    </>
  );
};

export default ProjectListScreen;
