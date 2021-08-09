import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";

export interface IUsers {
  id: number;
  name: string;
  token: string;
}
export interface IList {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: string;
}
interface IProps {
  users: IUsers[];
  list: IList[];
}
const List = (props: IProps) => {
  const { list, users } = props;
  const columns: ColumnsType<IList> = [
    {
      title: "名称",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "负责人",
      render(_, record) {
        return (
          <span>
            {users.find((item) => item.id === record.personId)?.name || "无"}
          </span>
        );
      },
    },
  ];

  return <Table columns={columns} dataSource={list} pagination={false} />;
};

export default List;
