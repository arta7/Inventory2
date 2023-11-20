import React, { useState } from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  DataSource : [],
  columns :[],
  rowSelections: [],
  getRow:null
 }



const CheckBoxTables: React.FC<DataType> = ({ DataSource=[],columns=[],rowSelections,getRow}) => {
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
       onRow={getRow}
       
       />
    </div>
  );
};

export default CheckBoxTables;