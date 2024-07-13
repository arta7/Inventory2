
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
import UserContext from '../UserContext';
import Searchinput from '../Searchinput';
import SearchinputKardex from '../SearchinputKardex';
import { DateInput } from 'react-hichestan-datetimepicker';
var moment = require('jalali-moment');
import { Modal } from '@app/components/common/Modal/Modal';

interface DefinePostData {
  Id: string;
  Title: string;
  Code: string;
}
interface DataType {
  columns: []
}

type DataIndex = keyof DataType;


const KardexUpdateSets: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);
  const [AllData, setAllData] = useState([]);
  const [ModalData, setModalData] = useState([]);
  const [Counter, setCounter] = useState(0);
  const [Id, setId] = useState(0);
  const [SelectedItem, setSelectedItem] = useState(1);
  const [Titles, setTitles] = useState('');
  const [Code, setCode] = useState('');
  const [form] = BaseForm.useForm();
  const { t } = useTranslation();
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [ProductData, setProductData] = useState([]);
  const [selectedProductId, setselectedProductId] = useState(0)
  const [selectedProductTitle, setselectedProductTitle] = useState('')
  const { userData, setUserData } = React.useContext(UserContext);
  const [ShowModal, setShowModal] = useState(false)
  const [Prints, setPrints] = useState(false)
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
      hidden: true,
      disaplay: 1
    },
    {
      title: 'نام سِت',
      dataIndex: 'Title',
      key: 'Title',
      width: '15%',
      hidden: false,

      ...getColumnSearchProps('Title'),
      disaplay: 1
    },
    {
      title: 'کد',
      dataIndex: 'Code',
      key: 'Code',
      width: '10%',
      hidden: false,
      disaplay: 1
    },

    {
      title: 'توضیحات',
      dataIndex: 'LastText',
      key: 'LastText',
      width: '10%',
      hidden: false,
    },
    {
      title: 'جزییات',
      dataIndex: '',
      key: '',
      width: '25%',
      hidden: false,
      disaplay: 0,
      render: (text, record, index) =>
        < Button
          style={{ backgroundColor: 'green', color: 'white' }}
          onClick={
            (e) => {
              setShowModal(true)
            }
          } > نمایش جزییات
        </Button>

    }



  ];

  let GetUpdateSets = () => {

    setLoading(true)

    axios.post(Config.URL +
      Config.Defination.GetUpdateSets)
      .then((response) => {
        console.log('response data update sets : ', response.data.data)
        var data1 = [];
        for (let i = 0; i < response.data.data.length; i++) {
          data1.push({
            Id: response.data.data[i].Id.toString(), Title: response.data.data[i].Title,
            Code: response.data.data[i].Code
            , LastText: response.data.data[i].LastText

          })
        }
        console.log('data1 : ', data1)
        setAllData(data1)
        setLoading(false)
      })
      .catch((error) => {
        console.log('Error : ', error)
        setLoading(false)
      })


  }


  let GetUpdateSetsListId = (_Id) => {

    setLoading(true)
   var data = {
     "Ids":_Id
   }
    axios.post(Config.URL +
      Config.Defination.GetUpdateSetsListId,data)
      .then((response) => {
        console.log('response data update sets : ', response.data.data)
        var data1 = [];
        for (let i = 0; i < response.data.data.length; i++) {
          data1.push({
            Id: response.data.data[i].Id.toString(), Title: response.data.data[i].Title,
            Code: response.data.data[i].Code
            , LastText: response.data.data[i].LastText,PTitle:response.data.data[i].PTitle,Counts:response.data.data[i].Counts

          })
        }
        console.log('data1 : ', data1)
        setAllData(data1)
        setLoading(false)
      })
      .catch((error) => {
        console.log('Error : ', error)
        setLoading(false)
      })


  }

  useEffect(() => {
    GetUpdateSets()

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

            <div style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex' }}>


              <Auth.SubmitButton type="primary" loading={isLoading} style={{ marginRight: 10 }} onClick={() => {
                GetUpdateSets()
              }}>
                جستجو
              </Auth.SubmitButton>





              <Auth.SubmitButton type="default" loading={isLoading} style={{ marginRight: 10 }} onClick={
                () => {

                  setAllData([])
                }
              }>
                بازیابی
              </Auth.SubmitButton>

              <Auth.SubmitButton type="default" loading={isLoading} style={{ marginRight: 10 }} onClick={
                () => {

                  setPrints(true)
                  setTimeout(() => {
                    printdiv("printelement")
                    window.location.reload();
                  }, 500);
                }
              }>
                چاپ
              </Auth.SubmitButton>

            </div>

            <Modal
              title={"لیست جزییات سِت"}
              centered
              visible={ShowModal}
              onCancel={() => {
                setShowModal(false)
              }}
              onOk={() => {
                setShowModal(false)
              }}

              size="large"
            >

            </Modal>


          </BaseForm>
        </Auth.FormWrapper>
      </div>

      <div id="printelement">

        {columns.length > 0 &&
          <Tables DataSource={AllData} columns={Prints == false ? columns.filter(item => !item.hidden) : columns.filter(item => !item.hidden && item.disaplay != 0)} />
        }
      </div>





    </div>
  );
};

export default KardexUpdateSets;


