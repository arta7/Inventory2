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
import { Space, Button, Table, InputRef, Input } from 'antd';
import CheckBoxTables from './CheckBoxTables';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { Config } from './../Database/Config';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

interface DefinePostData {
  Title: string;
  Code: string;

}
interface DataType {
  columns: []
}

let PostDataAccess = []

type DataIndex = keyof DataType;


const options = [
  { label: 'افزودن ', value: '1' },
  { label: 'حذف ', value: '2' },
  { label: 'ویرایش', value: '3' },
  { label: 'پرینت', value: '4' },
  { label: 'نمایش', value: '5' },
];

const DefineSetsofProducts: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [PostData, setPostData] = useState([]);
  const [AllData, setAllData] = useState([]);
  const [PostSelected, setPostSelected] = useState('')
  const [UserAccessPart, setUserAccessPart] = useState([]);
  const [Counter, setCounter] = useState(1);
  const [AccessPost, setAccessPost] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [form] = BaseForm.useForm();
  const { t } = useTranslation();
  const handleSubmit = (values: DefinePostData) => {

  };

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.value}`);
  };




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

      title: 'عنوان',
      dataIndex: 'Title',
      key: 'Title',
      width: '25%',
      hidden: false,

      ...getColumnSearchProps('Title'),


    },
    {
      title: 'کد ',
      dataIndex: 'Code',
      key: 'Code',
      width: '10%',
      hidden: false,
      ...getColumnSearchProps('Code'),
    },
    {
      title: 'نوع ',
      dataIndex: 'Active',
      key: 'Active',
      width: '0%',
      hidden: true,
      // ...getColumnSearchProps('StateType'),
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
      title: 'همه',
      dataIndex: 'Shower',
      key: 'Shower',
      width: '5%',
      hidden: false,
      render: (text, record, index) =>


        <Checkbox onChange={(ee) => {

          const myNextList = [...AllData];
          const artwork = myNextList.find(
            a => a.Id == record.Id.toString()
          );
          if (ee.target.checked) {
            artwork.Shower = 1;
            artwork.Adds = 1;
            artwork.Deletes = 1;
            artwork.Prints = 1;
          }
          else {
            artwork.Shower = 0;
            artwork.Adds = 0;
            artwork.Deletes = 0;
            artwork.Prints = 0;

          }
          setAllData(myNextList);
        }}
          checked={record.Shower} />
    },
    {
      title: 'افزودن',
      dataIndex: 'Adds',
      key: 'Adds',
      width: '5%',
      hidden: false,
      render: (text, record, index) =>
        <Checkbox onChange={(ee) => {

          const myNextList = [...AllData];
          const artwork = myNextList.find(
            a => a.Id == record.Id.toString()
          );
          if (ee.target.checked) {
            artwork.Adds = 1
            setAllData(myNextList);
          }
          else {
            artwork.Adds = 0;
            setAllData(myNextList);
          }
        }}
          value={'1'} checked={record.Adds} />
    },
    // {
    //   title: 'ویرایش',
    //   dataIndex: 'Edit',
    //   key: 'Edit',
    //   width: '5%',
    //   hidden: false,
    //   render: (text, record, index) =>
    //   <Checkbox    onChange={(ee) => {

    //     const myNextList = [...AllData];
    //     const artwork = myNextList.find(
    //       a => a.Id == record.Id.toString()
    //     );
    //     if(ee.target.checked)
    //     {
    //        artwork.Edit = 1
    //       setAllData(myNextList);
    //     }
    //     else
    //     {
    //       artwork.Edit = 0;
    //       setAllData(myNextList);
    //     } 
    //   }}
    //    checked={record.Edit} />
    // },
    {
      title: 'حذف',
      dataIndex: 'Deletes',
      key: 'Deletes',
      width: '5%',
      hidden: false,
      render: (text, record, index) =>
        <Checkbox onChange={(ee) => {

          const myNextList = [...AllData];
          const artwork = myNextList.find(
            a => a.Id == record.Id.toString()
          );
          if (ee.target.checked) {
            artwork.Deletes = 1
            setAllData(myNextList);
          }
          else {
            artwork.Deletes = 0;
            setAllData(myNextList);
          }
        }}
          value={'2'} checked={record.Deletes} />
    },
    {
      title: 'چاپ',
      dataIndex: 'Prints',
      key: 'Prints',
      width: '5%',
      hidden: false,
      render: (text, record, index) =>
        <Checkbox onChange={(ee) => {

          const myNextList = [...AllData];
          const artwork = myNextList.find(
            a => a.Id == record.Id.toString()
          );
          if (ee.target.checked) {
            artwork.Prints = 1
            setAllData(myNextList);
          }
          else {
            artwork.Prints = 0;
            setAllData(myNextList);
          }
        }}
          value={'4'} checked={record.Prints} />
    }
    //   {
    //     title: 'دسترسی ها',
    //     dataIndex: 'TypeAccess',
    //     key: 'TypeAccess',
    //     width: '60%',
    //     hidden: false,
    //     render: (text, record, index) =>

    //     // selectedRowKeys.includes(record.Id)
    //     // ?

    //       options.map((item, index) => (

    //         item.value == '1' ?

    //         <Checkbox    onChange={(ee) => {

    //           const myNextList = [...AllData];
    //           const artwork = myNextList.find(
    //             a => a.Id == record.Id.toString()
    //           );
    //           if(ee.target.checked)
    //           {


    //             switch (item.value) {
    //               case '1':
    //                 artwork.Adds = 1;
    //                 break;
    //                 case '2':
    //                   artwork.Deletes = 1;
    //                 break;
    //                 case '3':
    //                   artwork.Edit = 1;
    //                 break;
    //                 case '4':
    //                   artwork.Prints = 1;
    //                 break;
    //                 case '5':
    //                   artwork.Shower = 1;
    //                 break;

    //             }

    //             setAllData(myNextList);
    //           }
    //           else
    //           {

    //             switch (item.value) {
    //               case '1':
    //                 artwork.Adds = 0;

    //                 break;
    //                 case '2':
    //                   artwork.Deletes = 0;
    //                 break;
    //                 case '3':
    //                   artwork.Edit = 0;
    //                 break;
    //                 case '4':
    //                   artwork.Prints = 0;
    //                 break;
    //                 case '5':
    //                   artwork.Shower = 0;
    //                 break;
    //             }
    //             setAllData(myNextList);
    //           } 
    //         }}
    //         value={item.value}  checked={record.Adds}>{item.label}</Checkbox>

    //         : item.value == '2'  ?
    //         <Checkbox    onChange={(ee) => {

    //           const myNextList = [...AllData];
    //           const artwork = myNextList.find(
    //             a => a.Id == record.Id.toString()
    //           );
    //           if(ee.target.checked)
    //           {


    //             switch (item.value) {
    //               case '1':
    //                 artwork.Adds = 1;
    //                 break;
    //                 case '2':
    //                   artwork.Deletes = 1;
    //                 break;
    //                 case '3':
    //                   artwork.Edit = 1;
    //                 break;
    //                 case '4':
    //                   artwork.Prints = 1;
    //                 break;
    //                 case '5':
    //                   artwork.Shower = 1;
    //                 break;

    //             }

    //             setAllData(myNextList);
    //           }
    //           else
    //           {

    //             switch (item.value) {
    //               case '1':
    //                 artwork.Adds = 0;

    //                 break;
    //                 case '2':
    //                   artwork.Deletes = 0;
    //                 break;
    //                 case '3':
    //                   artwork.Edit = 0;
    //                 break;
    //                 case '4':
    //                   artwork.Prints = 0;
    //                 break;
    //                 case '5':
    //                   artwork.Shower = 0;
    //                 break;
    //             }
    //             setAllData(myNextList);
    //           } 
    //         }}
    //         value={item.value}  checked={record.Deletes}>{item.label}</Checkbox>
    //             : item.value =='3'  ?    <Checkbox    onChange={(ee) => {

    //               const myNextList = [...AllData];
    //               const artwork = myNextList.find(
    //                 a => a.Id == record.Id.toString()
    //               );
    //               if(ee.target.checked)
    //               {


    //                 switch (item.value) {
    //                   case '1':
    //                     artwork.Adds = 1;
    //                     break;
    //                     case '2':
    //                       artwork.Deletes = 1;
    //                     break;
    //                     case '3':
    //                       artwork.Edit = 1;
    //                     break;
    //                     case '4':
    //                       artwork.Prints = 1;
    //                     break;
    //                     case '5':
    //                       artwork.Shower = 1;
    //                     break;

    //                 }

    //                 setAllData(myNextList);
    //               }
    //               else
    //               {

    //                 switch (item.value) {
    //                   case '1':
    //                     artwork.Adds = 0;

    //                     break;
    //                     case '2':
    //                       artwork.Deletes = 0;
    //                     break;
    //                     case '3':
    //                       artwork.Edit = 0;
    //                     break;
    //                     case '4':
    //                       artwork.Prints = 0;
    //                     break;
    //                     case '5':
    //                       artwork.Shower = 0;
    //                     break;
    //                 }
    //                 setAllData(myNextList);
    //               } 
    //             }}
    //             value={item.value}  checked={Boolean(record.Edit)}>{item.label}</Checkbox>
    //                : item.value =='4' ?    <Checkbox    onChange={(ee) => {

    //                 const myNextList = [...AllData];
    //                 const artwork = myNextList.find(
    //                   a => a.Id == record.Id.toString()
    //                 );
    //                 if(ee.target.checked)
    //                 {


    //                   switch (item.value) {
    //                     case '1':
    //                       artwork.Adds = 1;
    //                       break;
    //                       case '2':
    //                         artwork.Deletes = 1;
    //                       break;
    //                       case '3':
    //                         artwork.Edit = 1;
    //                       break;
    //                       case '4':
    //                         artwork.Prints = 1;
    //                       break;
    //                       case '5':
    //                         artwork.Shower = 1;
    //                       break;

    //                   }

    //                   setAllData(myNextList);
    //                 }
    //                 else
    //                 {

    //                   switch (item.value) {
    //                     case '1':
    //                       artwork.Adds = 0;

    //                       break;
    //                       case '2':
    //                         artwork.Deletes = 0;
    //                       break;
    //                       case '3':
    //                         artwork.Edit = 0;
    //                       break;
    //                       case '4':
    //                         artwork.Prints = 0;
    //                       break;
    //                       case '5':
    //                         artwork.Shower = 0;
    //                       break;
    //                   }
    //                   setAllData(myNextList);
    //                 } 
    //               }}
    //               value={item.value}  checked={record.Prints}>{item.label}</Checkbox>
    //                  : item.value =='5' ? 
    //                  <Checkbox    onChange={(ee) => {

    //                   const myNextList = [...AllData];
    //                   const artwork = myNextList.find(
    //                     a => a.Id == record.Id.toString()
    //                   );
    //                   if(ee.target.checked)
    //                   {


    //                     switch (item.value) {
    //                       case '1':
    //                         artwork.Adds = 1;
    //                         break;
    //                         case '2':
    //                           artwork.Deletes = 1;
    //                         break;
    //                         case '3':
    //                           artwork.Edit = 1;
    //                         break;
    //                         case '4':
    //                           artwork.Prints = 1;
    //                         break;
    //                         case '5':
    //                           artwork.Shower = 1;
    //                         break;

    //                     }

    //                     setAllData(myNextList);
    //                   }
    //                   else
    //                   {

    //                     switch (item.value) {
    //                       case '1':
    //                         artwork.Adds = 0;

    //                         break;
    //                         case '2':
    //                           artwork.Deletes = 0;
    //                         break;
    //                         case '3':
    //                           artwork.Edit = 0;
    //                         break;
    //                         case '4':
    //                           artwork.Prints = 0;
    //                         break;
    //                         case '5':
    //                           artwork.Shower = 0;
    //                         break;
    //                     }
    //                     setAllData(myNextList);
    //                   } 
    //                 }}
    //                 value={item.value}  checked={record.Shower}>{item.label}</Checkbox>
    //                    : '0'
    //         // <Checkbox    onChange={(ee) => {

    //         //   const myNextList = [...AllData];
    //         //   const artwork = myNextList.find(
    //         //     a => a.Id == record.Id.toString()
    //         //   );
    //         //   if(ee.target.checked)
    //         //   {


    //         //     switch (item.value) {
    //         //       case '1':
    //         //         artwork.Adds = 1;
    //         //         break;
    //         //         case '2':
    //         //           artwork.Deletes = 1;
    //         //         break;
    //         //         case '3':
    //         //           artwork.Edit = 1;
    //         //         break;
    //         //         case '4':
    //         //           artwork.Prints = 1;
    //         //         break;
    //         //         case '5':
    //         //           artwork.Shower = 1;
    //         //         break;

    //         //     }

    //         //     setAllData(myNextList);
    //         //   }
    //         //   else
    //         //   {

    //         //     switch (item.value) {
    //         //       case '1':
    //         //         artwork.Adds = 0;

    //         //         break;
    //         //         case '2':
    //         //           artwork.Deletes = 0;
    //         //         break;
    //         //         case '3':
    //         //           artwork.Edit = 0;
    //         //         break;
    //         //         case '4':
    //         //           artwork.Prints = 0;
    //         //         break;
    //         //         case '5':
    //         //           artwork.Shower = 0;
    //         //         break;
    //         //     }
    //         //     setAllData(myNextList);
    //         //   } 
    //         // }}
    //         // value={item.value}  checked={record.Shower}>{item.label}</Checkbox>
    //           )

    //       ) 
    //       //: null

    // }
  ];



  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);

    // const myNextList = [...AllData];
    // const artwork = myNextList.find(
    //   a => a.Id == newSelectedRowKeys
    // );

    // artwork.Adds = 1
    // artwork.Deletes = 1
    // artwork.Prints = 1
    // setAllData(myNextList);

  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };


  let GetPosts = () => {

    axios.post(Config.URL +
      Config.Defination.GetPosts)
      .then((response) => {
        console.log('response data : ', response.data.data)
        setPostData(response.data.data)
      })
      .catch((error) => {
        console.log('Error : ', error)
      })


  }

  let GetParts = () => {


    axios.post(Config.URL +
      Config.Defination.GetParts)
      .then((response) => {
        console.log('response data : ', response.data.data)
        var data1 = [];
        for (let i = 0; i < response.data.data.length; i++) {
          data1.push({
            KeySearch: response.data.data[i].Id.toString(), Id: response.data.data[i].Id.toString(), Title: response.data.data[i].Title,
            Code: response.data.data[i].Code, Active: response.data.data[i].Active, Shower: 0, Edit: 0, Adds: 0, Prints: 0, Deletes: 0
          })
        }
        console.log('data1 : ', data1)
        setAllData(data1)
      })
      .catch((error) => {
        console.log('Error : ', error)
      })
  }


  let GetPostsAccessParts = (_PostRef) => {





    var data = {
      "PostRef": _PostRef
    }
    axios.post(Config.URL +
      Config.Defination.GetPostsAccessParts, data)
      .then((response) => {
        console.log('response data post access : ', response.data.data)
        setUserAccessPart(response.data.data)
        var x = []
        for (let i = 0; i < response.data.data.length; i++) {
          x.push(response.data.data[i].PartRef.toString())
          const myNextList = [...AllData];
          const artwork = myNextList.find(
            a => a.Id == response.data.data[i].PartRef.toString()
          );

          console.log('artwork', artwork)
          artwork.Adds = response.data.data[i].Adds;
          artwork.Deletes = response.data.data[i].Deletes;

          artwork.Edit = response.data.data[i].Edit;
          artwork.Prints = response.data.data[i].Prints;
          artwork.Shower = response.data.data[i].Shower;
          setAllData(myNextList);
          console.log('myNextList', myNextList)
        }

        setSelectedRowKeys(x)

      })
      .catch((error) => {
        console.log('Error : ', error)
      })
  }


  let AddUsersAccessParts = () => {

    console.log('AllData', AllData)
    PostDataAccess = [];
    for (let i = 0; i < AllData.length; i++) {
      var dataFind = selectedRowKeys.includes(AllData[i].Id.toString())
      console.log('datafind : ', dataFind)

      if (dataFind) {
        PostDataAccess.push({
          "PostRef": PostSelected, "PartRef": AllData[i].Id.toString(), "Shower": AllData[i].Shower.toString(), "Edit": AllData[i].Edit.toString()
          , "Adds": AllData[i].Adds.toString(), "Prints": AllData[i].Prints.toString(), "Deletes": AllData[i].Deletes.toString()
        })

      }
    }

    console.log('Postdata  : ', PostDataAccess)


    var data = {
      'jsonData': JSON.stringify(PostDataAccess)
    }
    // console.log('@jsonData : ',data)
    axios.post(Config.URL +
      Config.Defination.AddUsersAccessParts, data)
      .then((response) => {
        console.log('response data : ', response.data.data)
        setLoading(false)
        setCounter(Counter + 1)
        form.setFieldsValue({
          Groups: '',
        })

      })

      .catch((error) => {
        console.log('Error : ', error)
        setLoading(false)
      })
  }

  let DeleteUsersAccessParts = () => {
    setLoading(true)
    var data = {
      'PostRef': PostSelected
    }
    axios.post(Config.URL +
      Config.Defination.DeleteUsersAccessParts, data)
      .then((response) => {
        console.log('response data : ', response.data.data)
        AddUsersAccessParts()
      })
      .catch((error) => {
        console.log('Error : ', error)
        setLoading(false)
      })
  }

  useEffect(() => {
    GetParts()
    GetPosts()

    setPostSelected('')
    setSelectedRowKeys([])

  }, [Counter])

  return (
    <div >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Auth.FormWrapper >
          <BaseForm layout="vertical" onFinish={handleSubmit} form={form} >
            <S.Title>دسترسی گروه به بخش ها</S.Title>

            <BaseButtonsForm.Item name="Groups" label="گروه کاربری"
              rules={[{ required: true }]}

            >
              <Select onChange={(v) => {
                console.log('v : ', v)
                setCounter(Counter + 1)
                setPostSelected(v)
                GetPostsAccessParts(v)

              }}>

                {
                  PostData.map((item, index) => (

                    <Option value={item.Id.toString()}>
                      <Space align="center">
                        {item.Title}
                      </Space>
                    </Option>

                  ))
                }

              </Select>


            </BaseButtonsForm.Item>


            <BaseForm.Item noStyle>
              <Auth.SubmitButton type="primary" htmlType="submit" loading={isLoading}
                onClick={() => {
                  console.log('test')
                  if (PostSelected != '') {
                    // AddUsersAccessParts()
                    DeleteUsersAccessParts()

                    // alert('sucess')
                  }

                  else {
                    alert('لطفا اطلاعات را کامل پر کنید')
                  }
                }}
              >
                ثبت
              </Auth.SubmitButton>
            </BaseForm.Item>

          </BaseForm>
        </Auth.FormWrapper>
      </div>
      <CheckBoxTables DataSource={AllData.filter(item => item.Active == 1)} columns={columns.filter(item => !item.hidden)}
        rowSelections={rowSelection} key={"table"}

      />


    </div>
  );
};

export default DefineSetsofProducts;
