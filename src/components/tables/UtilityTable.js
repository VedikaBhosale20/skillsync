import React from 'react';
import { Table } from 'antd';

const UtilityTable = ({columns, data}) => {
return (
    <div style={{ padding: '20px' }}>
        <Table 
            columns={columns} 
            dataSource={data} 
            pagination={false} 
            bordered
          />
    </div>
)}

export default UtilityTable;