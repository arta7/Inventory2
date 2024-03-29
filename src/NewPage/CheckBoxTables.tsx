import React, { useState } from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  DataSource : [],
  columns :[],
  rowSelections: []
 }



const CheckBoxTables: React.FC<DataType> = ({ DataSource=[],columns=[],rowSelections}) => {
  // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // const [loading, setLoading] = useState(false);



  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        
        <span style={{ marginLeft: 8 }}>
          {/* {hasSelected ? ` ${selectedRowKeys.length} ` : ''} */}
        </span>
      </div>
      <Table rowSelection={rowSelections} columns={columns} dataSource={DataSource} style={{marginTop:20}} 
       rowKey="KeySearch"
       pagination={{ pageSize: 20 }}
       
       />
    </div>
  );
};

export default CheckBoxTables;