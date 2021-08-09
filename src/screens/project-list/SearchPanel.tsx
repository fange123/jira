import { Form, Input, Select } from "antd";
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
    <Form action="">
      <Input
        type="text"
        value={param.name}
        onChange={(e) => setParam({ ...param, name: e.target.value })}
      />
      <Select
        value={param.personId}
        onChange={(value) => setParam({ ...param, personId: value })}
      >
        <Select.Option value="">负责人</Select.Option>
        {users.map((item) => (
          <Select.Option value={item.id} key={item.id}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Form>
  );
};

export default SearchPanel;
