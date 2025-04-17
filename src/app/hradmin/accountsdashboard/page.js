'use client';
import UtilityTable from '@/components/tables/UtilityTable';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Space } from 'antd';
import { GetOrganizationUsers } from '@/lib/features/OrganizationSlice/OrgSlice';


const HrAdminDashboardAccounts = () => {
  const [userData, setUserData] = React.useState(null);
  const dispatch = useDispatch();
  const orgUsers = useSelector((state) => state.organization.orgUsers)
  const isloading = useSelector((state) => state.organization.isLoading);
  const error = useSelector((state) => state.organization.error);
//   const router = useRouter();

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
        dispatch(GetOrganizationUsers({
            token :  userData.token,
            organizationid : userData.organizationid
        }))
    }
  },[userData, dispatch])

    const OrgUserColumns = [
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
                <a>
                  View Details
                </a>
          </Space>
        ),
      },
    ];

  return (
    <>
      <div>
        {isloading && <p>Loading...</p>}
        {error && <p style={{color: 'red'}}>Error: {error}</p>}
        <h3 style={{textAlign: 'center', fontSize: '24px', marginBottom: '20px'}}>Organization Users</h3>
        <UtilityTable 
          columns={OrgUserColumns} 
          data={orgUsers || []} 
        />
      </div>
      {/* <div>
        {isloading && <p>Loading...</p>}
        {error && <p style={{color: 'red'}}>Error: {error}</p>}
        <h3 style={{textAlign: 'center', fontSize: '24px', marginBottom: '20px'}}>Approved Users</h3>
        <UtilityTable 
          columns={UnAssignedUsersColumns} 
          data={approvedUsers || []} 
        />
      </div> */}
    </>
  )
}

export default HrAdminDashboardAccounts
