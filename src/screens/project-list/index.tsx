import { useState, useEffect } from "react";
import List from "./List";
import SearchPanel from "./SearchPanel";
import qs from "qs";
// import { useDebounce } from "ahooks";
import { cleanObj, useDebounce, useMount } from "../../utils/index";

const apiUrl = process.env.REACT_APP_API_URL;

const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  //自定义的hooks
  const debouncedValue = useDebounce(param, 2000);
  //ahooks的hooks
  // const debouncedValue = useDebounce(param, { wait: 2000 });

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObj(debouncedValue))}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject("something went wrong!");
        }
      })
      .then((data) => setList(data));
  }, [debouncedValue]);

  useMount(() => {
    fetch(`${apiUrl}/users`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject("something went wrong!");
        }
      })
      .then((data) => setUsers(data));
  });
  return (
    <>
      <List list={list} users={users} />
      <SearchPanel users={users} param={param} setParam={setParam} />
    </>
  );
};

export default ProjectListScreen;
