import { Form, Input } from "antd";
import { IList, IUsers } from "./List";
import UserSelect from "components/user-select";

interface IProps {
  users: IUsers[];
  param: Partial<Pick<IList, "name" | "personId">>;
  setParam: (param: IProps["param"]) => void;
}

const SearchPanel = (props: IProps) => {
  const { param, setParam } = props;

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
        <UserSelect
          defaultOptionName="负责人"
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
        />
      </Form.Item>
    </Form>
  );
};

export default SearchPanel;
