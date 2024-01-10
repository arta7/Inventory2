import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
// import Highlighter from 'react-highlight-words';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';

interface DataType {
 DataSource : [],
 columns :[],
 ref:null
}

type DataIndex = keyof DataType;



const  Tables: React.FC<DataType> = ({ DataSource=[],columns=[],ref }) => {
  

  useEffect(()=>{
    console.log('data resid : ',filteredData)
  },[])
  const [filteredData, setFilteredData] = useState([])
  const handleChange = (pagination, filters, sorter, extra) => {
    if (extra.action === "filter" || extra.action === "sort") {
      setFilteredData(extra.currentDataSource)
    }
  }


  return <Table columns={columns} dataSource={DataSource} style={{marginTop:20,justifyContent:'center',alignItems:'center'}} bordered
  ref={ref}
  onChange={handleChange}
  />;
};

export default Tables;