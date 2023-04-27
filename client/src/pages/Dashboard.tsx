import { useState, useEffect } from 'react';

import { GET_ALL_USERS } from '../constants/backendConstants';
import useAxios from '../hooks/useAxios';
import { uid } from '../utils/uniqueId';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const { get } = useAxios();

  const getUsers = async () => {
    const data = await get(GET_ALL_USERS);
    setUsers(data.data);
  };

  useEffect(() => {
    getUsers();
  },[]);

  return(
    <>
      <h1>Dashboard</h1>
      {users.map((user:any) => 
        <p key={uid()}>{user.username}</p>,
      )}
    </>
  );
};
  
export { Dashboard };