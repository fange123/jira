import { Table } from "antd";
import { ColumnsType, TableProps } from "antd/lib/table";
import dayjs from "dayjs";

export interface IUsers {
  id: number;
  name: string;
  token: string;
}
export interface IList {
  id: number;
  key: number;
  name: string;
  personId: number;
  organization: string;
  created: string;
}
interface IProps extends TableProps<IList> {
  users: IUsers[];
}
const List = (props: IProps) => {
  const { users, ...param } = props;

  const columns: ColumnsType<IList> = [
    {
      title: "名称",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "部门",
      dataIndex: "organization",
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
    {
      title: "创建时间",
      render(_, record) {
        return (
          <span>
            {record.created ? dayjs(record.created).format("YYYY-MM-DD") : "无"}
          </span>
        );
      },
    },
  ];

  return <Table columns={columns} pagination={false} {...param} rowKey="id" />;
};

export default List;
