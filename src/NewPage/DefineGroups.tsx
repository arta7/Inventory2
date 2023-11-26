// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
// import { useAppDispatch } from '@app/hooks/reduxHooks';
// import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
// import * as S from './SForm.styles';
// import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
// import { Select, Option } from '@app/components/common/selects/Select/Select';
// import { ManOutlined, WomanOutlined } from '@ant-design/icons';
// import { Space } from 'antd';
// import  Tables  from './Tables';

// interface DefinePostData {
//   Title: string;
//   Code: string;
// }


//  const DefineGroups: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const [isLoading, setLoading] = useState(false);

//   const { t } = useTranslation();

//   const handleSubmit = (values: DefinePostData) => {
//   };

//   return (
//     <div >
//     <div style={{
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     }}>
//     <Auth.FormWrapper >
//       <BaseForm layout="vertical" onFinish={handleSubmit}  >
//         <S.Title>تعریف گروه </S.Title>
//         <Auth.FormItem
//           name="Title"
//           label="عنوان"
//           rules={[{ required: true, message: t('common.requiredField') }]}
//         >
//           <Auth.FormInput placeholder="عنوان" />
//         </Auth.FormItem>

//         <Auth.FormItem
//           label="کد "
//           name="Code"
//           rules={[{ required: true, message: t('common.requiredField') }]}
//         >
//           <Auth.FormInput placeholder="کد " />
//         </Auth.FormItem>
      
//         <BaseForm.Item noStyle>
//           <Auth.SubmitButton type="primary" htmlType="submit" loading={isLoading}>
//            ثبت
//           </Auth.SubmitButton>
//         </BaseForm.Item>
 
//       </BaseForm>
//     </Auth.FormWrapper>
//     </div>
//     <Tables />
//     </div>
//   );
// };

// export default DefineGroups;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
// import { useAppDispatch } from '@app/hooks/reduxHooks';
// import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
// import * as S from './SForm.styles';
// import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
// import { Select, Option } from '@app/components/common/selects/Select/Select';
// import { ManOutlined, WomanOutlined } from '@ant-design/icons';
// import { Space } from 'antd';
// import  Tables  from './Tables';

// interface DefinePostData {
//   Title: string;
//   Code: string;
// }


//  const DefinePost: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const [isLoading, setLoading] = useState(false);

//   const { t } = useTranslation();

//   const handleSubmit = (values: DefinePostData) => {
//   };

//   return (
//     <div >
//     <div style={{
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     }}>
//     <Auth.FormWrapper >
//       <BaseForm layout="vertical" onFinish={handleSubmit}  >
//         <S.Title>تعریف پست سازمانی</S.Title>
//         <Auth.FormItem
//           name="Title"
//           label="عنوان"
//           rules={[{ required: true, message: t('common.requiredField') }]}
//         >
//           <Auth.FormInput placeholder="عنوان" />
//         </Auth.FormItem>

//         <Auth.FormItem
//           label="کد "
//           name="Code"
//           rules={[{ required: true, message: t('common.requiredField') }]}
//         >
//           <Auth.FormInput placeholder="کد " />
//         </Auth.FormItem>
      
//         <BaseForm.Item noStyle>
//           <Auth.SubmitButton type="primary" htmlType="submit" loading={isLoading}>
//            ثبت
//           </Auth.SubmitButton>
//         </BaseForm.Item>
 
//       </BaseForm>
//     </Auth.FormWrapper>
//     </div>
//     <Tables />
//     </div>
//   );
// };

// export default DefinePost;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
// import { useAppDispatch } from '@app/hooks/reduxHooks';
// import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
// import * as S from './SForm.styles';
// import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
// import { Select, Option } from '@app/components/common/selects/Select/Select';
// import { ManOutlined, WomanOutlined } from '@ant-design/icons';
// import { Space } from 'antd';
// import  Tables  from './Tables';

// interface DefinePostData {
//   Title: string;
//   Code: string;
// }


//  const FiscalYears: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const [isLoading, setLoading] = useState(false);

//   const { t } = useTranslation();

//   const handleSubmit = (values: DefinePostData) => {
//   };

//   return (
//     <div >
//     <div style={{
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     }}>
//     <Auth.FormWrapper >
//       <BaseForm layout="vertical" onFinish={handleSubmit}  >
//         <S.Title>تعریف  سال مالی</S.Title>
//         <Auth.FormItem
//           name="Title"
//           label="عنوان"
//           rules={[{ required: true, message: t('common.requiredField') }]}
//         >
//           <Auth.FormInput placeholder="عنوان" />
//         </Auth.FormItem>

//         <Auth.FormItem
//           label="سال "
//           name="Code"
//           rules={[{ required: true, message: t('common.requiredField') }]}
//         >
//           <Auth.FormInput placeholder="سال" />
//         </Auth.FormItem>
      
//         <BaseForm.Item noStyle>
//           <Auth.SubmitButton type="primary" htmlType="submit" loading={isLoading}>
//            ثبت
//           </Auth.SubmitButton>
//         </BaseForm.Item>
 
//       </BaseForm>
//     </Auth.FormWrapper>
//     </div>
//     <Tables />
//     </div>
//   );
// };

// export default FiscalYears;


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


const DefineGroups: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);
  const [AllData, setAllData] = useState([]);
  const [Counter, setCounter] = useState(0);
  const [Id, setId] = useState(0);
  const [Titles, setTitles] = useState('');
  const [Code, setCode] = useState('');
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
                Code: record.Code.toString()

              })
              console.log('Code : ',record.Code.toString())
              setTitles(record.Title.toString())
              setCode(record.Code.toString())
              setId(record.Id.toString())

            }
          } > ویرایش
        </Button>

         <Popconfirm title="آیا مطمئن هستید?" onConfirm={() =>  DeleteGroups(record.Id)}>
            < Button
          style={{ marginRight: 20, backgroundColor: 'red', color: 'white' }}
          onClick={()=>
            console.log('')
          }
          >حذف
          </Button>
          </Popconfirm>
      </div >
    }

  ];


  let AddGroups = () => {
    console.log('Id : ', Id,"Titles : ",Titles,"Code :",Code)

    var data = {

      "Id": Id,
      "Title": Titles.toString(),
      "Code": Code.toString()

    }

    axios.post(Config.URL +
      Config.Defination.AddGroups, data)
      .then((response) => {
        console.log('response data : ', response.data.data)
        setCounter(Counter+1)
      })
      .catch((error) => {
        console.log('Error : ', error)
      })


  }


  let DeleteGroups = (_id) => {

    var data = {

      "Id": _id

    }

    axios.post(Config.URL +
      Config.Defination.DeleteGroups, data)
      .then((response) => {
        console.log('response data : ', response.data.data)
        setCounter(Counter+1)
      })
      .catch((error) => {
        console.log('Error : ', error)
      })


  }



  let GetGroups = () => {

    axios.post(Config.URL +
      Config.Defination.GetGroups)
      .then((response) => {
        console.log('response data : ', response.data.data)
        var data1 = [];
        for (let i = 0; i < response.data.data.length; i++) {
          data1.push({ Id: response.data.data[i].Id.toString(), Title: response.data.data[i].Title, Code: response.data.data[i].Code })
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
      Code: ""
    })
    setId(0)
    setTitles("")
    setCode("")
    GetGroups()
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
            <S.Title>تعریف گروه ابزار</S.Title>
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
              <Auth.FormInput  placeholder="کد "
                value={Code} onChange={(e) => { setCode(e.target.value) }}
                />
            </Auth.FormItem>

            <div style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex' }}>


              <Auth.SubmitButton type="primary" loading={isLoading} style={{ marginRight: 10 }} onClick={() => {
                console.log('test : ',Titles)
                if (Titles.toString().trim().length > 0 )
                AddGroups()
                else
                {
               alert('error')
                }
              }}>
                ثبت
              </Auth.SubmitButton>





              <Auth.SubmitButton type="default" loading={isLoading} style={{ marginRight: 10 }} onClick={
                () => {
                  form.setFieldsValue({
                    Title: "",
                    Code: ""

                  })
                  setId(0)
                  setTitles("")
                  setCode("")

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

export default DefineGroups;


