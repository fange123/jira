import { IUsers } from "./List";

interface IProps {
  users: IUsers[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: IProps["param"]) => void;
}

const SearchPanel = (props: IProps) => {
  const { users, param, setParam } = props;

  return (
    <form action="">
      <input
        type="text"
        value={param.name}
        onChange={(e) => setParam({ ...param, name: e.target.value })}
      />
      <select
        value={param.personId}
        onChange={(e) => setParam({ ...param, personId: e.target.value })}
      >
        <option value="">负责人</option>
        {users.map((item) => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </form>
  );
};

export default SearchPanel;
