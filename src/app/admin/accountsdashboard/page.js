'use client';
import UtilityTable from '@/components/tables/UtilityTable';
import { UnAssignedUsersColumns } from '@/components/tables/columns';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { GetUnAssignedUsers } from '@/lib/features/auth/AuthSlice';

const Accounts = () => {
  const [userData, setUserData] = React.useState(null);
  const dispatch = useDispatch();
  const unAssignedUsers = useSelector((state) => state.auth.unAssignedUsers);
  const loading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);

  React.useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("userData"));
      setUserData(data);
    } catch(err) {
      console.error("Error Parsing user data:", err);
    }
  }, []);
  React.useEffect(() => {
    if(userData !== null)
    {
      dispatch(GetUnAssignedUsers({
        userid: userData.tokenid,
        token: userData.token,
        rolename: userData.rolename
      }))
    }
  }, [userData, dispatch]);
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{color: 'red'}}>Error: {error}</p>}
      <UtilityTable 
        columns={UnAssignedUsersColumns} 
        data={unAssignedUsers || []} 
      />
    </div>
  )
}

export default Accounts
