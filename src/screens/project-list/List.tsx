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
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((list) => {
          return (
            <tr key={list.id}>
              <td>{list.name}</td>
              <td>
                {users.find((item) => item.id === list.personId)?.name || "无"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default List;
