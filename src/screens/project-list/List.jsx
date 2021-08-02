
 const List = props => {
  const {list,users} = props
  return(
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {
          list.map(list => {
            return(
              <tr key={list.id}>
                <td>{list.name}</td>
                <td>{users.find(item=> item.id === list.personId)?.name || '无'}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default List
