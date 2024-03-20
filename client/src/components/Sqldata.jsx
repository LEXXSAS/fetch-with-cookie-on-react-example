/* eslint-disable react/prop-types */
// @ts-nocheck

const Sqldata = ({users}) => {
  // const deferredList = useDeferredValue(teachers);
  
  return (
    <div className="ul-box">
      <ul>
      {users.map((user) => (
          <li className="list-item" key={user.id}>{user.name}</li>
          ))}
      </ul>
    </div>
  )
}

export default Sqldata
