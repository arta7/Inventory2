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
import bcrypt from 'bcryptjs'


interface DefinePostData {
  Id: string;
  Title: string;
  Code: string;
}
interface DataType {
  columns: []
}

type DataIndex = keyof DataType;


const DefineUsers: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);
  const [AllData, setAllData] = useState([]);
  const [Posts, setPosts] = useState([]);
  const [Counter, setCounter] = useState(0);
  const [Id, setId] = useState(0);
  const [Username, setUsername] = useState('');
  const [PostRef, setPostRef] = useState('');
  const [Active, setActive] = useState('');
  const [form] = BaseForm.useForm();
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync("123", '$2a$10$CwTycUXWue0Thq9StjUM0u')
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
          placeholder={`جستجو `}
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
      title: 'نام کاربری',
      dataIndex: 'Username',
      key: 'Username',
      width: '30%',
      hidden: false,
      ...getColumnSearchProps('Username'),
    },
    {
      title: 'گروه کاربری',
      dataIndex: 'PostRef',
      key: 'PostRef',
      width: '0%',
      hidden: true
    },
    {
      title: 'گروه کاربری',
      dataIndex: 'PostTitle',
      key: 'PostTitle',
      width: '20%',
      hidden: false,
      ...getColumnSearchProps('PostTitle')
    },
    {
      title: 'وضعیت',
      dataIndex: 'Active',
      key: 'Active',
      width: '20%',
      hidden: true,
      ...getColumnSearchProps('Active')
    },
    {
      title: 'وضعیت',
      dataIndex: 'ActiveTitle',
      key: 'ActiveTitle',
      width: '20%',
      hidden: false,
      ...getColumnSearchProps('Active')
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
      width: '70%',
      hidden: false,
      render: (text, record, index) => < div className="btn-wrap"
        style={
          {
            width: "400px",
          }
        } > < Button
          style={{ backgroundColor: 'green', color: 'white' }}
          onClick={
            (e) => {
              console.log('username',record.Username.toString())
              form.setFieldsValue({
                Username: record.Username.toString(),
                State: record.Active.toString(),
                Groups: record.PostRef.toString()
              })

    
              setUsername(record.Username.toString())
              setActive(record.Active.toString())
              setPostRef(record.PostRef.toString())
              setId(record.Id.toString())

            }
          } > ویرایش
        </Button>

        < Button
          style={{ marginRight: 20, backgroundColor: 'red', color: 'white' }}
          onClick={() =>
            DeleteUsersWithUsername(record.Username.toString())
          } > حذف
        </Button>

        < Button
          style={{ marginRight: 20, backgroundColor: 'yellow', color: 'black' }}
          onClick={() =>
            ResetPassword(record.Username.toString(),hashedPassword)
          } > بازیابی رمز عبور
        </Button>
      </div >
    }

  ];


  let AddUsers = () => {

    var data = {

      "Id": Id,
      "Username": Username,
      "Password": hashedPassword,
      "PostRef": PostRef,
      "Active": Active

    }

    axios.post(Config.URL +
      Config.Defination.AddUsers, data)
      .then((response) => {
        console.log('response data : ', response.data.data)
        setCounter(Counter + 1)
      })
      .catch((error) => {
        console.log('Error : ', error)
      })


  }


  let  DeleteUsersWithUsername= (_username) => {

    var data = {

      "Username": _username

    }

    axios.post(Config.URL +
      Config.Defination.DeleteUsersWithUsername, data)
      .then((response) => {
        console.log('response data : ', response.data.data)
        setCounter(Counter + 1)
      })
      .catch((error) => {
        console.log('Error : ', error)
      })


  }


  let  ResetPassword= (_username,_pass) => {

    var data = {

      "Username": _username,
      "Password":_pass

    }

    axios.post(Config.URL +
      Config.Defination.ResetPassword, data)
      .then((response) => {
        console.log('response data : ', response.data.data)
        setCounter(Counter + 1)
      })
      .catch((error) => {
        console.log('Error : ', error)
      })


  }

  let GetAllUsers = () => {


    axios.post(Config.URL +
      Config.Defination.GetAllUsers)
      .then((response) => {
        console.log('response data : ', response.data.data)
        var data1 = [];
        for (let i = 0; i < response.data.data.length; i++) {
          data1.push({
            Id: response.data.data[i].Id.toString(), Username: response.data.data[i].Username,
            PostRef: response.data.data[i].PostRef,
            PostTitle: response.data.data[i].PostTitle,
            Active: response.data.data[i].Active,
            ActiveTitle: response.data.data[i].Active == 1 ? "فعال" : "غیرفعال"
          })
        }
        console.log('data1 : ', data1)
        setAllData(data1)
      })
      .catch((error) => {
        console.log('Error : ', error)
      })


  }



  let GetPosts = () => {

    axios.post(Config.URL +
      Config.Defination.GetPosts)
      .then((response) => {
        console.log('response data : ', response.data.data)

        setPosts(response.data.data)
      })
      .catch((error) => {
        console.log('Error : ', error)
      })
  }

  useEffect(() => {
    form.setFieldsValue({
      Username: "",
      Groups: "",
      Satte: "",
    })
    setId(0)
    setUsername("")
    setActive('')
    setPostRef('')
    GetPosts()
    GetAllUsers()
    console.log("Hash Password", hashedPassword);
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
        <Auth.FormWrapper>
          <BaseForm layout="vertical" onFinish={handleSubmit} form={form} >
            <S.Title>ثبت نام</S.Title>
            <Auth.FormItem
              name="Username"
              label="نام کاربری"
              rules={[{ required: true, message: t('common.requiredField') }]}
             
            >
              <Auth.FormInput placeholder="نام کاربری"   value={Username} onChange={(e) => { setUsername(e.target.value) }}/>
            </Auth.FormItem>




            <BaseButtonsForm.Item name="Groups" label="گروه کاربری"
              rules={[{ required: true }]}
            >
               <Select
                onChange={(value) => {
                  console.log('seleted value : ', value)
                   setPostRef(value)
                }}
              >
                {
                  Posts.map((item, index) => (

                    <Option value={item.Id.toString()}>
                      <Space align="center">
                        {item.Title}
                      </Space>
                    </Option>

                  ))
                }
              </Select>
            </BaseButtonsForm.Item>



            <BaseButtonsForm.Item name="State" label="وضعیت"
              rules={[{ required: true }]}>
              <Select
                onChange={(value) => {
                  console.log('seleted value : ', value)
                   setActive(value)
                }}
              >
                <Option value="1">
                  <Space align="center">
                    {/* <ManOutlined /> */}
                    فعال
                  </Space>
                </Option>
                <Option value="2">
                  <Space align="center">
                    {/* <WomanOutlined /> */}
                    غیرفعال
                  </Space>
                </Option>
              </Select>


            </BaseButtonsForm.Item>




            <div style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex' }}>


              <Auth.SubmitButton type="primary" loading={isLoading} style={{ marginRight: 10 }} onClick={() => {
                console.log('test')
                if (Username.toString().trim().length > 0)
                  AddUsers()
                else {

                }
              }}>
                ثبت
              </Auth.SubmitButton>





              <Auth.SubmitButton type="default" loading={isLoading} style={{ marginRight: 10 }} onClick={
                () => {
                  form.setFieldsValue({
                    Title: "",
                    Code: "",
                    Details: ""

                  })
                  setId(0)
                  setUsername("")
                  setActive("")
                  setActive("")

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

export default DefineUsers;

