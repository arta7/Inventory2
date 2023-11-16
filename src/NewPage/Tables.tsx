import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
// import Highlighter from 'react-highlight-words';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';

interface DataType {
 DataSource : [],
 columns :[]
}

type DataIndex = keyof DataType;



const  Tables: React.FC<DataType> = ({ DataSource=[],columns=[] }) => {
  

  useEffect(()=>{
    console.log('data resid : ',columns)
  },[])



  return <Table columns={columns} dataSource={DataSource} style={{marginTop:20,justifyContent:'center',alignItems:'center'}}/>;
};

export default Tables;