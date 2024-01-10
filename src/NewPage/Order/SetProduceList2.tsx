
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import * as S from './../SForm.styles';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';
import Tables from './../Tables';
import axios from 'axios';
import { Config } from './../../Database/Config';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import { Button, Input, Space, Table, InputRef, Popconfirm } from 'antd';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
var moment = require('jalali-moment');
import UserContext from './../UserContext';


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

const SetProduceList2: React.FC = () => {
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
          onPressEnter={() => {handleSearch(selectedKeys as string[], confirm, dataIndex)
            console.log('data',searchText)
          }}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => {handleSearch(selectedKeys as string[], confirm, dataIndex)
              console.log('data',searchText)
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
        // <Highlighter
        //   highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        //   searchWords={[searchText]}
        //   autoEscape
        //   textToHighlight={text ? text.toString() : ''}
        // />
        text
      ) : (
        text
      ),
  });

   let GetReport =async ()=>{


    // var viewer = new Stimulsoft.Viewer.StiViewer(null, 'StiViewer', false);
    // //  Stimulsoft.Base.StiFontCollection.addOpentypeFontFile();
		// 	console.log('Creating a new report instance');
 
		// 	var report = new Stimulsoft.Report.StiReport();
    //   // Stimulsoft.Base.StiLicense.Key = "6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHl2AD0gPVknKsaW0un+3PuM6TTcPMUAWEURKXNso0e5OFPaZYasFtsxNoDemsFOXbvf7SIcnyAkFX/4u37NTfx7g+0IqLXw6QIPolr1PvCSZz8Z5wjBNakeCVozGGOiuCOQDy60XNqfbgrOjxgQ5y/u54K4g7R/xuWmpdx5OMAbUbcy3WbhPCbJJYTI5Hg8C/gsbHSnC2EeOCuyA9ImrNyjsUHkLEh9y4WoRw7lRIc1x+dli8jSJxt9C+NYVUIqK7MEeCmmVyFEGN8mNnqZp4vTe98kxAr4dWSmhcQahHGuFBhKQLlVOdlJ/OT+WPX1zS2UmnkTrxun+FWpCC5bLDlwhlslxtyaN9pV3sRLO6KXM88ZkefRrH21DdR+4j79HA7VLTAsebI79t9nMgmXJ5hB1JKcJMUAgWpxT7C7JUGcWCPIG10NuCd9XQ7H4ykQ4Ve6J2LuNo9SbvP6jPwdfQJB6fJBnKg4mtNuLMlQ4pnXDc+wJmqgw25NfHpFmrZYACZOtLEJoPtMWxxwDzZEYYfT"
      
      
    //   //  Stimulsoft.Base.StiLicense.loadFromFile('./../Report/license.key');
		// 	console.log('Load report from url');
		// 	report.loadFile('./../Report/test.mrt');

    //   report.renderedPages.clear();
      
		// 	viewer.report = report;
    //   viewer.renderHtml();
    //   console.log('Rendering the viewer to selected element');
   }

     const  ComponentToPrint =()=> {

      return (
        
          <Tables DataSource={AllData} columns={columns.filter(item => !item.hidden && item.disaplay != '0')}   />
        
      );
    }
  

  const columns: ColumnsType<DataType> = [
    {
      title: 'شماره سند',
      dataIndex: 'Id',
      key: 'Id',
      width: '10%',
      hidden: false,
      disaplay:1
    },
    {
      title: 'نوع سند',
      dataIndex: 'StatesTitle',
      key: 'StatesTitle',
      width: '15%',
      hidden: false,

      ...getColumnSearchProps('StatesTitle'),
      disaplay:1
    },
    {
      title: 'StatesRef ',
      dataIndex: 'StatesRef',
      key: 'StatesRef',
      width: '0%',
      hidden: true,
      disaplay:0
    },
    {
      title: 'درخواست کننده',
      dataIndex: 'SecondUsername',
      key: 'SecondUsername',
      width: '20%',
      hidden: false,
      ...getColumnSearchProps('SecondUsername'),
      disaplay:1
    },
    {
      title: 'SecondUserRef ',
      dataIndex: 'SecondUserRef',
      key: 'SecondUserRef',
      width: '0%',
      hidden: true,
      disaplay:0
    },
    {
      title: 'سال مالی',
      dataIndex: 'FiscalTitle',
      key: 'FiscalTitle',
      width: '0%',
      hidden: true,
      disaplay:0
    },
    {
      title: 'FiscalYearRef ',
      dataIndex: 'FiscalYearRef',
      key: 'FiscalYearRef',
      width: '0%',
      hidden: true,
      disaplay:0
    },
    {
      title: 'تاریخ سند',
      dataIndex: 'Date',
      key: 'Date',
      width: '15%',
      hidden: false,
      disaplay:1
    },
    {
      title: 'تاریخ سند',
      dataIndex: 'Datevalue',
      key: 'Datevalue',
      width: '20%',
      hidden: true,
      disaplay:0
    },
    {
      title: 'ثبت کننده ',
      dataIndex: 'Username',
      key: 'Username',
      width: '15%',
      hidden: false,
      disaplay:1
    },
    {
      title: 'UserRef ',
      dataIndex: 'UserRef',
      key: 'UserRef',
      width: '0%',
      hidden: true,
      disaplay:0
    },
    {
      title: '',
      dataIndex: '',
      key: 'Action',
      width: '50%',
      hidden: false,
      disaplay:0,
      render: (text, record, index) => < div className="btn-wrap"
        style={
          {
            width: "300px",
          }
        } > < Button
          style={{ backgroundColor: 'green', color: 'white' }}
          onClick={e=>{
           
            const myNextList = [...userData];
            const artwork = myNextList;
            console.log('artwork change selected product Id : ',artwork)
            artwork[0].selectedProductId = record.Id;
            setUserData(myNextList);
            navigate('/SetProduce')
          } 
          } > ویرایش
        </Button>


        <Popconfirm title="آیا مطمئن هستید?" onConfirm={() => DeleteDocuments(record.Id)}>
          < Button
            style={{ marginRight: 20, backgroundColor: 'red', color: 'white' }}
            onClick={() =>
              console.log('')

            }
          >حذف
          </Button>
        </Popconfirm>

        < Button
          style={{ marginRight: 20, backgroundColor: 'Yellow', color: 'black' }}
          onClick={e=>{
            setDataPrint({"Id":record.Id,"StatesTitle":record.StatesTitle,"SecondUsername":record.SecondUsername,"Date":record.Date })
           GetProductDocumentData(record.Id)
          }
        }
          >چاپ
          </Button>


      </div >
    }

  ];



  let GetProductDocumentData = (_Id) => {

    var data = {
      "DocumentsRef": _Id
    }

    axios.post(Config.URL +
      Config.Defination.GetProductDocumentData, data)
      .then((response) => {
        var datapush = [];
        var id = 0;
        var Counters = 0;
        if (response.data.data.length > 0) {
          for (let i = 0; i < response.data.data.length; i++) {
            id = i + 1;
            datapush.push({
              Code: response.data.data[i].ProductCode
              , Name: response.data.data[i].ProductTitle, ProductId: response.data.data[i].ProductId
              , Units: response.data.data[i].UnitTitle, UnitsRef: response.data.data[i].UnitRef, Counts: response.data.data[i].Counts
              , Details: response.data.data[i].Details, Id: id
            })
            Counters = Counters + response.data.data[i].Counts
          }
        }
        setSumCounts(Counters)
        setRowDataPrint(datapush)
        console.log('datapush',datapush)
        setTimeout(() => {
          printdiv("printItem2")
          window.location.reload();
         }, 200);
      })
      .catch((error) => {
        console.log('Error data document GetProductDocumentData : ', error)
      })


  }


  let DeleteDocuments = (_id) => {

    var data = {
      "Id":_id

    }
    axios.post(Config.URL +
      Config.Defination.DeleteDocumentControls, data)
      .then((response) => {
        console.log('response data : ', response.data.data)

        console.log('result Id : ', response.data)
        setCounter(Counter+1)
  
      })
      .catch((error) => {
        console.log('Error : ', error)
      })

  }



  let GetProductsDocuments = (_fiscal) => {

    var data = {
      "FiscalYearRef": _fiscal,
      "CollectionId":2
    }

    axios.post(Config.URL +
      Config.Defination.GetProductsDocuments, data)
      .then((response) => {
        console.log('response data : ', response.data.data)
        var data1 = [];
        for (let i = 0; i < response.data.data.length; i++) {
          data1.push({
            Id: response.data.data[i].Id.toString(), StatesTitle: response.data.data[i].StatesTitle,
            StatesRef: response.data.data[i].StatesRef
            , FiscalYearRef: response.data.data[i].FiscalYearRef,
            FiscalTitle: response.data.data[i].FiscalTitle
            , UserRef: response.data.data[i].UserRef,
            Username: response.data.data[i].Username
            , SecondUserRef: response.data.data[i].SecondUserRef,
            SecondUsername: response.data.data[i].SecondUsername,
            Date: moment(response.data.data[i].Date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'),
            Datevalue: response.data.data[i].Date
          })
        }
        console.log('data1 : ', data1)
        setAllData(data1)
      })
      .catch((error) => {
        console.log('Error : ', error)
      })


  }

  useEffect(() => {

    GetProductsDocuments(userData[0].FiscalYearId.toString())
  }, [Counter])



  const handleSubmit = (values: DefinePostData) => {
  };

  let handleInputChange = (events) => {
    console.log('Titles : ', events.target.value)
    setTitles(events.target.value);
  }




  function printdiv(elem) {
    var header_str = '<html><head><title>تست</title></head><body>';
    var footer_str = '</body></html>';
    var new_str = document.getElementById(elem).innerHTML;
    var old_str = document.body.innerHTML;
    document.body.innerHTML = header_str + new_str + footer_str;
    window.print();
    document.body.innerHTML = old_str;
    setPrints(false)
    return false;
  }



  
  return (
    <div >

     

      <BaseForm layout="vertical" onFinish={handleSubmit} form={form}>

<div style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex' }}>


  <Auth.SubmitButton type="primary" loading={isLoading} style={{ marginRight: 10 }} onClick={() => {
    navigate('/setProduce2')
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

  <Auth.SubmitButton type="default" loading={isLoading} style={{ marginRight: 10 }} onClick={
    () => {
      setPrints(true)
      setTimeout(() => {
        printdiv("printitem")
        window.location.reload();
      }, 500);
      
     
     
    }
  }>
    چاپ
  </Auth.SubmitButton>

</div>




</BaseForm>
    
      {columns.length > 0 &&
       <div
     
       id='printitem'
       > 
         <Tables DataSource={AllData} columns={ Prints == false  ?  columns.filter(item => !item.hidden) : columns.filter(item => !item.hidden && item.disaplay!=0)}  />
       </div>
      
      }

{
      <div style={{display:'none'}}  id='printItem2'>
        <div style={{borderWidth:1,borderColor:'black',borderStyle:'solid',width:'80vw',height:100,borderRadius:5,justifyContent:'center',alignItems:'center',padding:5,marginTop:10,marginRight:20}}>
        <div style={{flexDirection:'row',justifyContent:'space-between',display:'flex',margin:20}}>
          <div style={{flexDirection:'row',justifyContent:'space-between',display:'flex'}}>
            <label >شماره سند  :  </label>
            <label >{DataPrint?.Id}</label>
            </div>

            <div style={{flexDirection:'row',justifyContent:'space-between',display:'flex'}}>
            <label >نوع سند  :  </label>
            <label >{DataPrint?.StatesTitle}</label>
            </div>
        </div>

        <div style={{flexDirection:'row',justifyContent:'space-between',display:'flex',margin:20}}>
          <div style={{flexDirection:'row',justifyContent:'space-between',display:'flex'}}>
            <label > درخواست کننده  :  </label>
            <label >{DataPrint?.SecondUsername}</label>
            </div>

            <div style={{flexDirection:'row',justifyContent:'space-between',display:'flex'}}>
            <label >تاریخ  :  </label>
            <label >{DataPrint?.Date}</label>
            </div>
        </div>
      </div>
      <table style={{borderWidth:1,borderStyle:'solid',width:'90vw',marginTop:20,justifyContent:'center',alignItems:'center'}}>
        <thead style={{height:70}}>
          <th style={{borderWidth:1,borderStyle:'solid'}}>ردیف</th>
          <th style={{borderWidth:1,borderStyle:'solid'}}>نام </th>
          <th style={{borderWidth:1,borderStyle:'solid'}}>کد</th>
          <th style={{borderWidth:1,borderStyle:'solid'}}>واحد </th>
          <th style={{borderWidth:1,borderStyle:'solid'}}>تعداد</th>
          <th style={{borderWidth:1,borderStyle:'solid'}}>توضیحات</th>
        </thead>
        <tbody>
{RowDataPrint.map((item,index)=>
   <tr style={{textAlign:'center',height:70}}>
   <td style={{borderWidth:1,borderStyle:'solid',width:'10vw'}}>{index+1}</td>
   <td style={{borderWidth:1,borderStyle:'solid',width:'20vw'}}>{item.Name}</td>
   <td style={{borderWidth:1,borderStyle:'solid',width:'20vw'}}>{item.Code}</td>
   <td style={{borderWidth:1,borderStyle:'solid',width:'15vw'}}>{item.Units}</td>
   <td style={{borderWidth:1,borderStyle:'solid',width:'20vw'}}>{item.Counts}</td>
   <td style={{borderWidth:1,borderStyle:'solid',width:'30vw'}}>{item.Details}</td>
 </tr>
)
       
}
<tr style={{textAlign:'center',height:70}}>
<td ></td>
   <td style={{borderWidth:1,borderStyle:'solid',width:'15vw'}}>جمع کل </td>
   <td ></td>
   <td ></td>
   <td style={{width:'20vw'}}>{SumCounts}</td>
   <td ></td>
</tr>

        </tbody>
      </table>
</div>
}

      
    </div>
  );
};

export default SetProduceList2;


