

import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import * as S from './SForm.styles';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';
import Tables from './Tables';
import axios from 'axios';
import { Config } from './../Database/Config';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import { Button, Input, Space, Table, InputRef, Popconfirm } from 'antd';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';



interface DefinePostData {
  Id: string;
  Title: string;
  Code: string;
}
interface DataType {
  columns: []
}

type DataIndex = keyof DataType;


const DefineSets: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);
  const [AllData, setAllData] = useState([]);
  const [Counter, setCounter] = useState(0);
  const [Id, setId] = useState(0);
  const [Titles, setTitles] = useState('');
  const [Code, setCode] = useState('');
  const [Details, setDetails] = useState('');
  const [form] = BaseForm.useForm();
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

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
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            فیلتر
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
      title: 'عنوان',
      dataIndex: 'Title',
      key: 'Title',
      width: '30%',
      hidden: false,
      
      ...getColumnSearchProps('Title'),


    },
    {
      title: 'کد ',
      dataIndex: 'Code',
      key: 'Code',
      width: '20%',
      hidden: false,
      ...getColumnSearchProps('Code'),
    },
    {
      title: 'توضیحات ',
      dataIndex: 'Details',
      key: 'Details',
      width: '20%',
      hidden: false,
      ...getColumnSearchProps('Details'),
    },
    {
      title: 'Id',
      dataIndex: 'Id',
      key: 'Id',
      width: '0%',
      hidden: true
      // ...getColumnSearchProps('age'),
    },
    {
      title: '',
      dataIndex: '',
      key: 'Action',
      width: '40%',
      hidden: false,
      render: (text, record, index) => < div className="btn-wrap"
        style={
          {
            width: "200px",
          }
        } > < Button
          style={{ backgroundColor: 'green', color: 'white' }}
          onClick={
            (e) => {
              form.setFieldsValue({
                Title: record.Title.toString(),
                Code: record.Code.toString(),
                Details: record.Details.toString()

              })
              setTitles(record.Title.toString())
              setCode(record.Code.toString())
              setId(record.Id.toString())

            }
          } > ویرایش
        </Button>

        < Button
          style={{ marginRight: 20, backgroundColor: 'red', color: 'white' }}
          onClick={()=>
             DeleteSets(record.Id)
            // (e) => {
            //   <Popconfirm title="Sure to delete?" onConfirm={() => DeleteUnits(record.Id)}>
            //     <a></a>
            //   </Popconfirm>

            // }
          } > حذف
        </Button>
      </div >
    }

  ];


  let AddSets = () => {
    console.log('Id : ', Id,"Titles : ",Titles,"Code :",Code)

    var data = {

      "Id": Id,
      "Title": Titles,
      "Code": "000"+Id.toString(),
      "Details":Details

    }

    axios.post(Config.URL +
      Config.Defination.AddSets, data)
      .then((response) => {
        console.log('response data : ', response.data.data)
        setCounter(Counter+1)
      })
      .catch((error) => {
        console.log('Error : ', error)
      })


  }


  let DeleteSets = (_id) => {

    var data = {

      "Id": _id

    }

    axios.post(Config.URL +
      Config.Defination.DeleteSets, data)
      .then((response) => {
        console.log('response data : ', response.data.data)
        setCounter(Counter+1)
      })
      .catch((error) => {
        console.log('Error : ', error)
      })


  }



  let GetSets = () => {

    var axiosConfig = {
      headers: {
        Accept: 'application/json',
        Content_Type: 'application/json'
      }
    }
    axios.post(Config.URL +
      Config.Defination.GetSets)
      .then((response) => {
        console.log('response data : ', response.data.data)
        var data1 = [];
        for (let i = 0; i < response.data.data.length; i++) {
          data1.push({ Id: response.data.data[i].Id.toString(), Title: response.data.data[i].Title,
             Code: response.data.data[i].Code,
            Details:response.data.data[i].Details
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
    form.setFieldsValue({
      Title: "",
      Code: "",
      Details:""
    })
    setId(0)
    setTitles("")
    setCode("")
    setDetails("")
    GetSets()
  }, [Counter])



  const handleSubmit = (values: DefinePostData) => {
  };

  let handleInputChange = (events) => {
    console.log('Titles : ', events.target.value)
    setTitles(events.target.value);
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
            <S.Title>تعریف  سِت</S.Title>
            <Auth.FormItem
              name="Title"
              label="عنوان"
              rules={[{ required: true, message: t('common.requiredField') }]}
            >
              <Auth.FormInput placeholder="عنوان" value={Titles} onChange={(e) => { setTitles(e.target.value) }} />
            </Auth.FormItem>

            <Auth.FormItem
              label="کد "
              name="Code"

            // rules={[{ required: true, message: t('common.requiredField') }]}
            >
              <Auth.FormInput readOnly={true} placeholder="کد "
                value={Code} onChange={(e) => { setCode(e.target.value) }}
                style={{ backgroundColor: 'grey', borderColor: 'grey' }} color='red' />
            </Auth.FormItem>

                     <Auth.FormItem
          label="توضیحات "
          name="Details"
        >
          <Auth.FormInputTextArea placeholder="توضیحات " value={Details} onChange={(e) => { setDetails(e.target.value) }}  />
        </Auth.FormItem>




            <div style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex' }}>


              <Auth.SubmitButton type="primary" loading={isLoading} style={{ marginRight: 10 }} onClick={() => {
                console.log('test')
                if (Titles.toString().trim().length > 0)
                  AddSets()
                else
                {

                }
              }}>
                ثبت
              </Auth.SubmitButton>





              <Auth.SubmitButton type="default" loading={isLoading} style={{ marginRight: 10 }} onClick={
                () => {
                  form.setFieldsValue({
                    Title: "",
                    Code: "",
                    Details:""

                  })
                  setId(0)
                  setTitles("")
                  setCode("")
                  setDetails("")

                }
              }>
                بازیابی
              </Auth.SubmitButton>

            </div>




          </BaseForm>
        </Auth.FormWrapper>
      </div>
      {columns.length > 0 &&
        <Tables DataSource={AllData} columns={columns.filter(item => !item.hidden)} />
      }
    </div>
  );
};

export default DefineSets;

