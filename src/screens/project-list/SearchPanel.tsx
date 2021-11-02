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
    <Form action="" layout="inline" style={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input
          placeholder="项目名称"
          type="text"
          value={param.name}
          onChange={(e) => setParam({ ...param, name: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
        >
          <Select.Option value="">负责人</Select.Option>
          {users.map((item) => (
            <Select.Option value={String(item.id)} key={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default SearchPanel;
