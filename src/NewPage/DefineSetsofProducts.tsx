import React, { useEffect, useState,useRef } from 'react';
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
import { Space,Button, Table,InputRef,Input  } from 'antd';
import CheckBoxTables from './CheckBoxTables';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { Config } from './../Database/Config';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';

interface DefinePostData {
  Title: string;
  Code: string;

}
interface DataType {
  columns: []
}

type DataIndex = keyof DataType;

 const DefineSetsofProducts: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [SetsData, setSetsData] = useState([]);
  const [AllData, setAllData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const { t } = useTranslation();

  const handleSubmit = (values: DefinePostData) => {

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
      width: '30%',
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
      dataIndex: 'UnitRef',
      key: 'StateType',
      width: '0%',
      hidden: true,
      // ...getColumnSearchProps('StateType'),
    },
    {
      title: 'واحد کالا',
      dataIndex: 'UnitTitle',
      key: 'UnitTitle',
      width: '20%',
      hidden: false,
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
      title: 'تعداد',
      dataIndex: 'Counts',
      key: 'Counts',
      width: '20%',
      hidden: false,
      render: (text, record, index) => < div className="btn-wrap"
        style={
          {
            width: "100px",
          }
        } >   <Auth.FormInput  placeholder=""
        style={{textAlign:'center'}}
        // value={Code} onChange={(e) => { setCode(e.target.value) }}
        />

      </div >
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


  let GetSets = () => {

    axios.post(Config.URL +
      Config.Defination.GetSets)
      .then((response) => {
        console.log('response data : ', response.data.data)
        setSetsData(response.data.data)
      })
      .catch((error) => {
        console.log('Error : ', error)
      })


  }

  let GetProducts = () => {

 
    axios.post(Config.URL +
      Config.Defination.GetProducts)
      .then((response) => {
        console.log('response data : ', response.data.data)
        var data1 = [];
        for (let i = 0; i < response.data.data.length; i++) {
          data1.push({KeySearch : response.data.data[i].Id.toString(), Id: response.data.data[i].Id.toString(), Title: response.data.data[i].Title,
             Code: response.data.data[i].Code,UnitRef:response.data.data[i].UnitRef,
             UnitTitle: response.data.data[i].UnitTitle})
        }
        console.log('data1 : ', data1)
        setAllData(data1)
      })
      .catch((error) => {
        console.log('Error : ', error)
      })
  }

  useEffect(()=>{
    GetSets()
    GetProducts()
  },[])

  return (
    <div >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
    <Auth.FormWrapper >
      <BaseForm layout="vertical" onFinish={handleSubmit}  >
        <S.Title>محصولات هر سِت </S.Title>
      
        <BaseButtonsForm.Item name="Sets" label="نام ست"
           rules={[{ required: true}]}
        >
      <Select>

        {
          SetsData.map((item,index)=>(
           
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
          <Auth.SubmitButton type="primary" htmlType="submit" loading={isLoading}>
           ثبت
          </Auth.SubmitButton>
        </BaseForm.Item>
        
      </BaseForm>
    </Auth.FormWrapper>
    </div>
     <CheckBoxTables DataSource={AllData} columns={columns.filter(item => !item.hidden)}
     rowSelections={rowSelection}
      />

     
     </div>
  );
};

export default DefineSetsofProducts;
