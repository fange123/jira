import { Dropdown, Menu, Table } from "antd";
import { ColumnsType, TableProps } from "antd/lib/table";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Pin from "components/pin";
import { useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal } from "./utils";

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
  pin: boolean;
}
interface IProps extends TableProps<IList> {
  users: IUsers[];
}
const List = (props: IProps) => {
  const { users, ...param } = props;

  const { mutate } = useEditProject();
  const { open } = useProjectModal();

  //~这种写法叫做函数柯里化，在调用前期就知道的参数是id,在调用时知道的参数是pin
  const handleEdit = (id: number) => (pin: boolean) => mutate({ id, pin });

  const columns: ColumnsType<IList> = [
    {
      title: <Pin checked={true} disabled={true} />,
      render: (_, record) => {
        //bug:由于数据返回乱码问题，暂时这样处理
        const pin = (record as any)["14"] === "t" ? true : false;

        return <Pin checked={pin} onCheckedChange={handleEdit(record.id)} />;
      },
    },
    {
      title: "名称",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name, record) => {
        return <Link to={String(record.id)}>{name}</Link>;
      },
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
    {
      render: () => {
        return (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="edit">
                  <ButtonNoPadding type="link" onClick={open}>
                    编辑项目
                  </ButtonNoPadding>
                </Menu.Item>
              </Menu>
            }
          >
            <ButtonNoPadding type="link">...</ButtonNoPadding>
          </Dropdown>
        );
      },
    },
  ];

  return <Table columns={columns} pagination={false} {...param} rowKey="id" />;
};

export default List;
