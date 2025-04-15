import { Space, Tag } from 'antd';

export const UnAssignedUsersColumns = [
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
          <a>Invite {record.username}</a>
          <a>Delete</a>
        </Space>
      ),
    },
];