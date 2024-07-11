
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
import UserContext from './../UserContext';
import Searchinput from '../Searchinput';
import SearchinputKardex from '../SearchinputKardex';
import { DateInput } from 'react-hichestan-datetimepicker';
var moment = require('jalali-moment');


interface DefinePostData {
  Id: string;
  Title: string;
  Code: string;
}
interface DataType {
  columns: []
}

type DataIndex = keyof DataType;


const KardexSets2: React.FC = () => {
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
  const [ProductData, setProductData] = useState([]);
  const [selectedProductId, setselectedProductId] = useState(0)
  const [selectedProductTitle, setselectedProductTitle] = useState('')
  const { userData, setUserData } = React.useContext(UserContext);
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
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
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
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

  const columns: ColumnsType<DataType> = [
    {
      title: 'شماره سند',
      dataIndex: 'Id',
      key: 'Id',
      width: '10%',
      hidden: false
    },
    {
      title: 'نوع سند',
      dataIndex: 'StatesTitle',
      key: 'StatesTitle',
      width: '15%',
      hidden: false,

      ...getColumnSearchProps('StatesTitle'),
    },
    {
      title: 'StatesRef ',
      dataIndex: 'StatesRef',
      key: 'StatesRef',
      width: '0%',
      hidden: true,
    },
    {
      title: 'درخواست کننده',
      dataIndex: 'SecondUsername',
      key: 'SecondUsername',
      width: '15%',
      hidden: false,
    },
    {
      title: 'SecondUserRef ',
      dataIndex: 'SecondUserRef',
      key: 'SecondUserRef',
      width: '0%',
      hidden: true,
    },
    {
      title: 'سال مالی',
      dataIndex: 'FiscalTitle',
      key: 'FiscalTitle',
      width: '0%',
      hidden: true,
    },
    {
      title: 'FiscalYearRef ',
      dataIndex: 'FiscalYearRef',
      key: 'FiscalYearRef',
      width: '0%',
      hidden: true,
    },
    {
      title: 'نام ست ',
      dataIndex: 'SetsTitle',
      key: 'SetsTitle',
      width: '20%',
      hidden: false,
    },
    {
      title: 'تاریخ سند',
      dataIndex: 'Date',
      key: 'Date',
      width: '15%',
      hidden: false,
    },
    {
      title: 'تاریخ سند',
      dataIndex: 'Datevalue',
      key: 'Datevalue',
      width: '0%',
      hidden: true,
    },
    {
      title: 'سند ورودی',
      dataIndex: 'InsertValue',
      key: 'InsertValue',
      width: '15%',
      hidden: false,
    },
    {
      title: 'سند خروجی',
      dataIndex: 'ExitValue',
      key: 'ExitValue',
      width: '15%',
      hidden: false,
    },

    {
      title: 'مانده موجودی',
      dataIndex: 'Deposit',
      key: 'Deposit',
      width: '15%',
      hidden: false,
      render: (text, record, index) =>

        < div className="btn-wrap"
          style={
            {
              width: "100px",
            }
          } >

          {
            index > 0 ? record.InsertValue - record.ExitValue + SumData(index, AllData) : record.InsertValue - record.ExitValue
          }
        </div >
      ,

    },


  ];


  let SumData = (index, Data) => {
    var datasum = 0;
    for (let i = 0; i < index; i++) {
      datasum += Data[i].InsertValue - Data[i].ExitValue
    }
    return datasum;
  }

  let DeleteParts = (_id) => {




  }

  let GetSets = () => {

    axios.post(Config.URL +
      Config.Defination.GetSets)
      .then((response) => {
        console.log('response data : ', response.data.data)
        setProductData(response.data.data)
      })
      .catch((error) => {
        console.log('Error : ', error)
      })
  }


  let GetKardex = (_sets, _fiscal) => {
    setLoading(true)
    var data = {
      "SetsRef": _sets,
      "FiscalYearRef": _fiscal,
      "CollectionId":2
    }

    axios.post(Config.URL +
      Config.Defination.GetKardexSets, data)
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
            Datevalue: response.data.data[i].Date, InsertValue: response.data.data[i].InsertValue,
            ExitValue: response.data.data[i].ExitValue, SetsTitle: response.data.data[i].SetsTitle
          })
        }
        console.log('data1 : ', data1)
        setAllData(data1.filter(a=>a.Datevalue >= startDate && a.Datevalue <=endDate).sort(function(a, b) {
          var c = new Date(a.Datevalue);
          var d = new Date(b.Datevalue);
          return c-d;
      }))
        setLoading(false)
      })
      .catch((error) => {
        console.log('Error : ', error)
        setLoading(false)
      })


  }

  useEffect(() => {
    GetSets()


  }, [Counter])



  const handleSubmit = (values: DefinePostData) => {
  };

  let handleInputChange = (events) => {
    console.log('Titles : ', events.target.value)
    // setTitles(events.target.value);
  }

  function printdiv(elem) {
    var header_str = '<html><head><title>تست</title></head><body>';
    var footer_str = '</body></html>';
    var new_str = document.getElementById(elem).innerHTML;
    var old_str = document.body.innerHTML;
    document.body.innerHTML = new_str + footer_str;
    window.print();
    document.body.innerHTML = old_str;

    return false;
  }

  return (
    <div >



      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Auth.FormWrapper >
          <BaseForm layout="vertical" onFinish={handleSubmit} form={form}>
            <SearchinputKardex list={ProductData} PlaceHolder="نام ست ابزار"
              // onChange={(e)=>{setselectedProductTitle(e)}}
              setvalue={setselectedProductTitle}
              setId={setselectedProductId}
              value={selectedProductTitle}
              setAllData={setAllData}
            />

<div style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex' }}>
            <Auth.FormItem
              label="از تاریخ"
              name="StartDate"
              // rules={[{ required: true, message: t('common.requiredField') }]}
              style={{width:'40%'}}
            >

              <DateInput
                value={startDate}
                name={'datePicker'}
                onChange={(event) => {
                  console.log('date : ', new Date(event.target.value).toLocaleDateString('zh-Hans-CN'))
                  setstartDate((event.target.value))
                }}
              />
            </Auth.FormItem>

            <Auth.FormItem
              label="تا تاریخ"
              name="EndDate"
              // rules={[{ required: true, message: t('common.requiredField') }]}
              style={{width:'40%'}}
            >
            
              <DateInput
                value={endDate}
                name={'datePicker2'}
                onChange={(event) => {
                  console.log('end date : ', new Date(startDate).toLocaleDateString('zh-Hans-CN'))
                  if( new Date(event.target.value).toLocaleDateString('zh-Hans-CN') >= new Date(startDate).toLocaleDateString('zh-Hans-CN'))
                  setendDate((event.target.value))
                else
                  {
                       alert('لطفا تاریخ بزرگ تر یا مساوی تاریخ شروع را انتخاب کنید') 
                       form.setFieldsValue({
                        EndDate:''
                       })
                     //  setendDate(new Date())
                  }
                }}
              />
            </Auth.FormItem>
            </div>

            <div style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex' }}>


              <Auth.SubmitButton type="primary" loading={isLoading} style={{ marginRight: 10 }} onClick={() => {
                console.log('userData[0].FiscalYearId.toString() : ', userData[0].FiscalYearId.toString())
                GetKardex(selectedProductId, userData[0].FiscalYearId.toString())
              }}>
                جستجو
              </Auth.SubmitButton>





              <Auth.SubmitButton type="default" loading={isLoading} style={{ marginRight: 10 }} onClick={
                () => {

                  setAllData([])
                  setselectedProductTitle('')
                  setselectedProductId('')
                }
              }>
                بازیابی
              </Auth.SubmitButton>

              <Auth.SubmitButton type="default" loading={isLoading} style={{ marginRight: 10 }} onClick={
                () => {

                  printdiv("printelement")
                  window.location.reload();
                }
              }>
                چاپ
              </Auth.SubmitButton>

            </div>




          </BaseForm>
        </Auth.FormWrapper>
      </div>



      <div id="printelement">

        {columns.length > 0 &&
          <Tables DataSource={AllData} columns={columns.filter(item => !item.hidden)} />
        }
      </div>
    </div>
  );
};

export default KardexSets2;


