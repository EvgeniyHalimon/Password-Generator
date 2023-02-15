import { useState, useEffect } from 'react';

import { GET_ALL_USERS } from '../../constants/backendConstants';
import useAxios from '../../hooks/useAxios';
import { uid } from '../../utils/uniqueId';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const { getDataFromBackend } = useAxios();

  const getUsers = async () => {
    const data = await getDataFromBackend(GET_ALL_USERS);
    console.log('🚀 ~ file: Dashboard.tsx:12 ~ getUsers ~ data', data.data);
    setUsers(data.data);
  };

  useEffect(() => {
    getUsers();
  },[]);

  return(
    <>
      <h1>Dashboard</h1>
      {/* <button onClick={getUsers}>Get all users</button> */}
      {users.map((user:any) => 
        <p key={uid()}>{user.username}</p>,
      )}
    </>
  );
};
  
export { Dashboard };