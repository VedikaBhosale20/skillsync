import React from 'react';
import { Table } from 'antd';

const UtilityTable = ({columns, data}) => {
return (
<Table columns={columns} dataSource={data} />
)};

export default UtilityTable;