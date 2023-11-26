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

let PostDataAccess=[]

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
  const [PostSelected,setPostSelected] = useState('')
  const [UserAccessPart, setUserAccessPart] = useState([]);

  const [AccessPost, setAccessPost] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
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
      title: 'دسترسی ها',
      dataIndex: 'TypeAccess',
      key: 'TypeAccess',
      width: '60%',
      hidden: false,
      render: (text, record, index) =>
        options.map((item, index) => (
          <Checkbox  onChange={(ee) => {
            if (ee.target.checked)
            {
              PostDataAccess.push({"PostRef":PostSelected,"PartRef":record.Id,"TypeAccess":item.value})
               console.log('PostDataAccess : ', PostDataAccess)    
            }
            else
            {
                for(let j=0;j<PostDataAccess.length;j++)
                {
                  if( PostDataAccess[j].PartRef == record.Id && PostDataAccess[j].TypeAccess == item.value)
                  {
                    var xx =  PostDataAccess.splice(j,1)

                    console.log('xx : ', xx)
                  }
                }

              console.log('x : ', PostDataAccess)
            }
           
          }} value={item.value} >{item.label}</Checkbox>
        ))

    }
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
            Code: response.data.data[i].Code, Active: response.data.data[i].Active,Shower:0,Edit:0,Adds:0,Prints:0,Deletes:0
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
        for(let i =0;i<response.data.data.length;i++)
        {
          x.push(response.data.data[i].PostRef.toString())
        }
        setSelectedRowKeys(x)

      })
      .catch((error) => {
        console.log('Error : ', error)
      })
  }


  let AddUsersAccessParts = () => {

    // var data = JSON.stringify(PostDataAccess)
    var data = {
      'jsonData': JSON.stringify(PostDataAccess)
    }
   // console.log('@jsonData : ',data)
    axios.post(Config.URL +
      Config.Defination.AddUsersAccessParts, data)
      .then((response) => {
        console.log('response data : ', response.data.data)
      })
      .catch((error) => {
        console.log('Error : ', error)
      })
  }

  let DeleteUsersAccessParts = () => {

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
      })
  }

  useEffect(() => {
    GetParts()
    GetPosts()
  }, [])

  return (
    <div >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Auth.FormWrapper >
          <BaseForm layout="vertical" onFinish={handleSubmit}  >
            <S.Title>دسترسی گروه به بخش ها</S.Title>

            <BaseButtonsForm.Item name="Groups" label="گروه کاربری"
              rules={[{ required: true }]}

            >
              <Select onChange={(v) => {
                console.log('v : ', v)
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
                  if (PostSelected != '')
                  {
                    
                      DeleteUsersAccessParts()
                  
                  alert('sucess')
                  }
                  
                  else
                  {
  
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
