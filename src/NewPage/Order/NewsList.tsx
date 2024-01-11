
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import * as S from '../SForm.styles';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';
import Tables from '../Tables';
import axios from 'axios';
import { Config } from '../../Database/Config';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import { Button, Input, Space, Table, InputRef, Popconfirm } from 'antd';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
var moment = require('jalali-moment');
import UserContext from '../UserContext';


import { useReactToPrint } from 'react-to-print';
 
interface DefinePostData {
  Id: string;
  Title: string;
  Code: string;
}
interface DataType {
  columns: []
}

type DataIndex = keyof DataType;
// let viewer = new Stimulsoft.Viewer.StiViewer(undefined, 'StiViewer', false);
// let report = new Stimulsoft.Report.StiReport();

export class ComponentToPrint1 extends React.PureComponent {
  render() {
    return (
      <table>
        <thead>
          <th>column 1</th>
          <th>column 2</th>
          <th>column 3</th>
        </thead>
        <tbody>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
        </tbody>
      </table>

      
       
      
    );
  }
}
 
const NewsList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);
  const [AllData, setAllData] = useState([]);
  const [Counter, setCounter] = useState(0);
  const [Id, setId] = useState(0);
  const [SelectedItem, setSelectedItem] = useState(1);
  const [Titles, setTitles] = useState('');
  const [Code, setCode] = useState('');
  const [form] = BaseForm.useForm();
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const componentRef = useRef();
  const { userData,setUserData } = React.useContext(UserContext);
  const[Prints,setPrints]= useState(false)
  const [DataPrint,setDataPrint] = useState({})
  const [RowDataPrint,setRowDataPrint] = useState([])
  const [SumCounts,setSumCounts] = useState(0)

  const handlePrint = useReactToPrint({
    
        content: () => componentRef.current,
      })
  
  
  // useReactToPrint({
    
  //   content: () => componentRef.current,
  // });
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };





  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`جستجو`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => {handleSearch(selectedKeys as string[], confirm, dataIndex)
            
                console.log('data')
            }}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            جستجو
          </Button>
          <Button
            onClick={() =>
              clearFilters && handleReset(clearFilters)
            }
            size="small"
            style={{ width: 90 }}
          >
            بازیابی
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            بستن
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        text
      ) : (
        text
      ),
  });

  

  const columns: ColumnsType<DataType> = [
    {
      title: 'شماره خبر',
      dataIndex: 'Id',
      key: 'Id',
      width: '10%',
      hidden: false,
      disaplay:1
    },
    {
      title: 'عنوان',
      dataIndex: 'Title',
      key: 'Title',
      width: '25%',
      hidden: false,
      ...getColumnSearchProps('Title'),
      disaplay:1
    },
    // {
    //   title: '',
    //   dataIndex: '',
    //   key: 'Action',
    //   width: '50%',
    //   hidden: false,
    //   disaplay:0,
    //   render: (text, record, index) => < div className="btn-wrap"
    //     style={
    //       {
    //         width: "300px",
    //       }
    //     } > < Button
    //       style={{ backgroundColor: 'green', color: 'white' }}
    //       onClick={e=>{
    //       } 
    //       } > ویرایش
    //     </Button>


    //     <Popconfirm title="آیا مطمئن هستید?" onConfirm={() => DeleteHtmlData(record.Id)}>
    //       < Button
    //         style={{ marginRight: 20, backgroundColor: 'red', color: 'white' }}
    //         onClick={() =>
    //           console.log('')

    //         }
    //       >حذف
    //       </Button>
    //     </Popconfirm>
    //   </div >
    // }

  ];





  let GetHTMLData = () => {


    axios.post(Config.URL +
      Config.Defination.GetHtmlData)
      .then((response) => {
        var datapush = [];
        if (response.data.data.length > 0) {
          for (let i = 0; i < response.data.data.length; i++) {
            datapush.push({
              Title: response.data.data[i].Title, Id: response.data.data[i].Id
            })
          }
        }
        setAllData(datapush)
      })
      .catch((error) => {
        console.log('Error data  : ', error)
      })


  }





  let DeleteHtmlData = (_id) => {

    var data = {
      "Id":_id

    }
    axios.post(Config.URL +
      Config.Defination.DeleteHtmlData, data)
      .then((response) => {
        console.log('response data : ', response.data.data)

        console.log('result Id : ', response.data)
        setCounter(Counter+1)
  
      })
      .catch((error) => {
        console.log('Error : ', error)
      })

  }





  useEffect(() => {
    GetHTMLData()
  }, [Counter])



  const handleSubmit = (values: DefinePostData) => {
  };

  let handleInputChange = (events) => {
    console.log('Titles : ', events.target.value)
    setTitles(events.target.value);
  }





  
  return (
    <div >


      <BaseForm layout="vertical" onFinish={handleSubmit} form={form}>

<div style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex' }}>


  <Auth.SubmitButton type="primary" loading={isLoading} style={{ marginRight: 10 }} onClick={() => {
    navigate('/HtmlEditor')
  }}>
    سند جدید
  </Auth.SubmitButton>

  <Auth.SubmitButton type="default" loading={isLoading} style={{ marginRight: 10 }} onClick={
    () => {
   setCounter(Counter+1)
    }
  }>
    بازیابی
  </Auth.SubmitButton>


</div>




</BaseForm>
    
{columns.length > 0 &&
       <div
       id='printitem'
       > 
         <Tables DataSource={AllData} columns={columns.filter(item => !item.hidden) }  />
       </div>
      
      }


      
    </div>
  );
};

export default NewsList;


