'use client';
import UtilityTable from '@/components/tables/UtilityTable';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ApproveUnAssignedUsers, GetApprovedUsers, GetUnAssignedUsers } from '@/lib/features/auth/AuthSlice';
import { Space, Select } from 'antd';
import MasterHook from '@/lib/masters';

const Accounts = () => {
  const [userData, setUserData] = React.useState(null);
  const [selectedRoles, setSelectedRoles] = React.useState(0);
  const dispatch = useDispatch();
  const unAssignedUsers = useSelector((state) => state.auth.unAssignedUsers);
  const approvedUsers = useSelector((state) => state.auth.approvedUsers);
  const isloading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const router = useRouter();
  const { roles, loading } = MasterHook();


  const UnAssignedUsersColumns = [
    {
      title: 'Name',
      key: 'name',
      render: (_, record) => (
        <span>{record.firstname} {record.lastname}</span>
      ),
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {
            record.isactive == 0 ?
            (
              <>
                <Select
                  style={{ width: 120 }}
                  placeholder="Select role"
                  onChange={(role) => setSelectedRoles(role.value)}
                  options={roles}
                  loading={loading}
                />
                <a onClick={() => {
                  if (selectedRoles === 0) {
                    alert('Please select a role first');
                    return;
                  }
                  
                  dispatch(ApproveUnAssignedUsers({
                    userid: userData.tokenid,
                    rolename: userData.rolename,
                    token: userData.token,
                    approvalid: record.code,
                    roletypeid: selectedRoles,
                  }));
                  //Fetch the UnAssignedUsers again
                  dispatch(GetUnAssignedUsers({
                    userid: userData.tokenid,
                    token: userData.token,
                    rolename: userData.rolename
                  }));
                  //Fetch the ApprovedUsers again
                  dispatch(GetApprovedUsers({
                    userid: userData.tokenid,
                    token: userData.token,
                    rolename: userData.rolename
                  }));
                  router.push("/admin/accountsdashboard");
                }}>Invite</a>
              </>
            )
            :
            (
              <a>
                View Details
              </a>
            )
          }
        </Space>
      ),
    },
  ];

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
      }));
      dispatch(GetApprovedUsers({
        userid: userData.tokenid,
        token: userData.token,
        rolename: userData.rolename
      }));
    }
  }, [userData, dispatch]);
  
  return (
    <>
      <div>
        {isloading && <p>Loading...</p>}
        {error && <p style={{color: 'red'}}>Error: {error}</p>}
        <h3 style={{textAlign: 'center', fontSize: '24px', marginBottom: '20px'}}>Unassigned Users</h3>
        <UtilityTable 
          columns={UnAssignedUsersColumns} 
          data={unAssignedUsers || []} 
        />
      </div>
      <div>
        {isloading && <p>Loading...</p>}
        {error && <p style={{color: 'red'}}>Error: {error}</p>}
        <h3 style={{textAlign: 'center', fontSize: '24px', marginBottom: '20px'}}>Approved Users</h3>
        <UtilityTable 
          columns={UnAssignedUsersColumns} 
          data={approvedUsers || []} 
        />
      </div>
    </>
  )
}

export default Accounts