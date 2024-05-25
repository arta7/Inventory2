
import React, { useEffect, useState,useRef } from 'react';
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
import { Space,Button, Table,InputRef,Input  } from 'antd';
import CheckBoxTables from './../CheckBoxTables';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { Config } from './../../Database/Config';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import UserContext from './../UserContext';
interface DefinePostData {
  Title: string;
  Code: string;

}
interface DataType {
  columns: []
}

let DataProduct = [];
type DataIndex = keyof DataType;

 const MovesWarehouse: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [SetsData, setSetsData] = useState([]);
  const [GroupsSelectedItem, setGroupsSelectedItem] = useState('');
  const [CollectionItemSelected, setCollectionItemSelected] = useState('');
  const [AllData, setAllData] = useState([]);
  const [SecondItems,setSecondItems] = useState([{Id:3,value:'تجهیزات پزشکی'},{Id:4,value:'تجهیزات CSR'}])
  const [SecondValue,setSecondValue] = useState(0)
  const [FirstValue,setFirstValue] = useState(0)
  const [setsValue,setsetsValue] = useState(0)
  const [AmountValue,setAmountValue] = useState(0)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const { t } = useTranslation();
  const [form] = BaseForm.useForm();

  const { userData, setUserData } = React.useContext(UserContext);

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
      width: '40%',
      hidden: false,
      
      ...getColumnSearchProps('Title'),


    },
    {
      title: 'کد ',
      dataIndex: 'Code',
      key: 'Code',
      width: '30%',
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
    // {
    //   title: 'تعداد',
    //   dataIndex: 'Count',
    //   key: 'Count',
    //   width: '20%',
    //   hidden: false,
    //   render: (text, record, index) => < div className="btn-wrap"
    //     style={
    //       {
    //         width: "100px",
    //       }
    //     } >     <Auth.FormInput placeholder="عدد"
    //     type="number"
    //      value={record.Count}
    //     style={{ textAlign: 'center' }}
    //     // onChange={(v) => {

          

    //     // }}
    //   />

    //   </div >
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
    // console.log('selectedRowKeys changed: ', newItem);
    setSelectedRowKeys(newSelectedRowKeys);

    // const myNextList = [...AllData];
    // const artwork = myNextList.find(
    //   a => a.Id == record.Id
    // );
    // artwork.Count = v.target.value;
    // setAllData(myNextList);
    DataProduct=[];
        for(let i =0 ;i<newSelectedRowKeys.length;i++)
      DataProduct.push({ "SetsRef": newSelectedRowKeys[i].toString(), "GroupRef":GroupsSelectedItem ,
    "CollectionId":CollectionItemSelected, "Count": "1" })
      
      console.log('DataProduce : ',DataProduct)

   
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    // onselect:(record) => {
    
    // }

  };


  let GetGroups = () => {

    axios.post(Config.URL +
      Config.Defination.GetProducts)
      .then((response) => {
        console.log('response data : ', response.data.data)
        setSetsData(response.data.data)
      })
      .catch((error) => {
        console.log('Error : ', error)
      })


  }


  let AddDocumentControls = (_code, _type, _userRef, _fiscalYearRef,_collectionRef,_stateRef,_setsRef,_amount) => {
    setLoading(true)
  var data = {
    "Code": _code,
    "Type": _type,
    "UserRef": _userRef,
    "SecondUserRef": '22',
    "FiscalYearRef": _fiscalYearRef,
    "StatesRef": _stateRef,
    "CurrentState": 1,
    "RegisterDate":
      new Date().toJSON().slice(0, 10).replace(/-/g, '/').toString(),
      "Date":  new Date().toJSON().slice(0, 10).replace(/-/g, '/').toString(),
      "CollectionId":_collectionRef
  }
  axios.post(Config.URL +
    Config.Defination.AddDocumentControlsCollection, data)
    .then((response) => {
      console.log('response data : ', response.data.data)
      console.log('result Id : ', response.data.data)
      AddSetsDocuments(response.data.data[0].Id,_setsRef,_amount)

    })
    .catch((error) => {
      console.log('Error : ', error)
      setLoading(false)
    })
}





let AddSetsDocuments = (_id,_setsRef,_amount) => {

  setLoading(true)
  var dataPush = [];
    dataPush.push({ "ProductRef": _setsRef, "Counts": _amount, "Details": "", "DocumentsRef": _id.toString() })
  

  var data = {
    "jsonData": JSON.stringify(dataPush)
  }
  console.log('data push for add database : ', data)
  axios.post(Config.URL +
    Config.Defination.AddProductDocuments, data)
    .then((response) => {
      console.log('response data : ', response.data.data)

      console.log('result Id : ', response.data)
      setLoading(false)
      // alert(' اطلاعات با موفقیت ثبت شد')
    })
    .catch((error) => {
      setLoading(false)
      console.log('Error : ', error)
    })
}



  let GetKardex = (_productRef, _fiscal,_collectionRef) => {
    setLoading(true)
    var data = {
      "ProductRef": _productRef,
      "FiscalYearRef": _fiscal,
      "CollectionId":_collectionRef
    }

    axios.post(Config.URL +
      Config.Defination.GetKardex, data)
      .then((response) => {
        console.log('response data : ', response.data.data)
        var data1 = [];
        for (let i = 0; i < response.data.data.length; i++) {
          data1.push({
            InsertValue: response.data.data[i].InsertValue,
            ExitValue: response.data.data[i].ExitValue
          })
        }

        let insertvalue=0;
        let exitvalue=0;

          for(let k=0;k<data1.length;k++)
          {
            console.log('insertvalue 2',insertvalue)
              insertvalue += data1[k].InsertValue;
              exitvalue += data1[k].ExitValue;

              console.log('insertvalue 3',insertvalue)
          }

          setAmountValue(insertvalue-exitvalue)
          form.setFieldsValue({Amount: insertvalue-exitvalue})
        console.log('data1 : ', data1)
       // setAllData(data1)
        setLoading(false)
      })
      .catch((error) => {
        console.log('Error : ', error)
        setLoading(false)
      })


  }

  let GetSets = () => {

 
    axios.post(Config.URL +
      Config.Defination.GetProducts)
      .then((response) => {
        console.log('response data : ', response.data.data)
        var data1 = [];
        for (let i = 0; i < response.data.data.length; i++) {
          data1.push({KeySearch : response.data.data[i].Id.toString(), Id: response.data.data[i].Id.toString(), Title: response.data.data[i].Title,
             Code: response.data.data[i].Code,"Count":"1"})
        }
        console.log('data1 sets : ', data1)
        setAllData(data1)
      })
      .catch((error) => {
        console.log('Error : ', error)
      })
  }


  // let AddGroupOfSets = () => {

  //   for(let i =0;i<DataProduct.length;i++)
  //   {
  //     if(selectedRowKeys.filter(a=>a == DataProduct[i].SetsRef).length == 0)
  //     {
  //       DataProduct = DataProduct.filter(item => item.SetsRef != DataProduct[i].SetsRef && item.CollectionId !=DataProduct[i].CollectionId );
  //     }
  //   }

  //   console.log('DataProduct', JSON.stringify(DataProduct))
  //   var data = {
  //     'jsonData': JSON.stringify(DataProduct)
  //   }
  //   axios.post(Config.URL +
  //     Config.Defination.AddGroupOfSets, data)
  //     .then((response) => {
  //       console.log('response data product : ', response.data.data)
  //       setLoading(false)
  //       form.setFieldsValue({
  //         Groups: ''
  //       })
  //       setGroupsSelectedItem('')
  //       setSelectedRowKeys([])
  //       DataProduct = [];
  //       alert(' اطلاعات با موفقیت ثبت شد')
  //     })
  //     .catch((error) => {
  //       console.log('Error : ', error)
  //       setLoading(false)
  //     })
  // }



  let AddMovesWareHouses = (_firstwarehouseId,_secondwarehouseId,_setsId,_amount) => {

    var data = {
      'FirstWareHouseId': _firstwarehouseId,
      "SecondWareHouseId":_secondwarehouseId,
      "SetsId": _setsId,
      "Amount":_amount
    }
    axios.post(Config.URL +
      Config.Defination.AddMovesWareHouse, data)
      .then((response) => {
        console.log('response data product : ', response.data.data)
        setLoading(false)
        form.setFieldsValue({
          Amount: 0,
          FirstWareHouse:'',
          SecondWarehouse : '',
          Sets:''
        })
       
       if(FirstValue == 1)
       {
        AddDocumentControls("","1","5",userData[0].FiscalYearId.toString(),1,"16",setsValue,AmountValue)
        AddDocumentControls("","1","5",userData[0].FiscalYearId.toString(),2,"15",setsValue,AmountValue)
        setAmountValue(0)
        setFirstValue(0)
        setSecondValue(0)
       }
       else if(FirstValue ==2)
       {
        AddDocumentControls("","1","5",userData[0].FiscalYearId.toString(),2,"16",setsValue,AmountValue)
        AddDocumentControls("","1","5",userData[0].FiscalYearId.toString(),1,"15",setsValue,AmountValue)
        setAmountValue(0)
        setFirstValue(0)
        setSecondValue(0)
       }

        alert(' اطلاعات با موفقیت ثبت شد')
      })
      .catch((error) => {
        console.log('Error : ', error)
        setLoading(false)
      })
  }

  let DeleteGroupOfSets = () => {
    setLoading(true)
    var data = {
      'GroupRef': GroupsSelectedItem,
      "CollectionId":CollectionItemSelected
    }
    axios.post(Config.URL +
      Config.Defination.DeleteGroupOfSetsCollection, data)
      .then((response) => {
        console.log('response data : ', response.data.data)
        // AddGroupOfSets()
      })
      .catch((error) => {
        console.log('Error : ', error)
        setLoading(false)
      })
  }

  let GetGroupOfS = (_v,_v2) => {

    var data = {
      "GroupRef": _v,
      "CollectionId":_v2
    }
    console.log('data : ',data)
    axios.post(Config.URL +
      Config.Defination.GetGroupOfSetsCollection, data)
      .then((response) => {
        console.log('response data Groups : ', response.data.data)
        // setGroupsData(response.data.data)
        var x = [];
         DataProduct = [];
        for (let i = 0; i < response.data.data.length; i++) {

          x.push(response.data.data[i].SetsRef.toString())
          DataProduct.push({ "SetsRef": response.data.data[i].SetsRef.toString(), 
          "GroupRef": response.data.data[i].GroupRef.toString(),"CollectionId":response.data.data[i].CollectionId.toString(), "Count": "1" })
        }
        // console.log('newdata : ',newdata)
        setSelectedRowKeys(x)
        // setCounter(Counter+1)
      

      })
      .catch((error) => {
        console.log('Error : ', error)
      })
  }



  useEffect(()=>{
    GetSets()
    GetGroups()
  },[])

  return (
    <div >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
    <Auth.FormWrapper >
      <BaseForm layout="vertical" onFinish={handleSubmit}  form={form} >
        <S.Title>گروه  جراحی</S.Title>
      
        <BaseButtonsForm.Item name="FirstWareHouse" label="نام انبار جاری"
           rules={[{ required: true}]}
        >
      <Select
       onChange={(v) => {
         console.log('v',v)
         setFirstValue(v)
         if(v == 1)
         {

          setSecondValue(4)
          form.setFieldsValue({SecondWarehouse: 4})
         }
         else if(v==2)
         {
          setSecondValue(3)
          form.setFieldsValue({SecondWarehouse: 3})
         }

      }}
      >
        
        <Option value={1}>
          <Space align="center">
          تجهیزات پزشکی
          </Space>
        </Option>
           
        <Option value={2}>
          <Space align="center">
          تجهیزات CSR
          </Space>
        </Option>
          
        
      </Select>
    </BaseButtonsForm.Item>


       
        <BaseButtonsForm.Item name="SecondWarehouse" label="نام انبار ثانویه"
           rules={[{ required: true}]}
        >
   <Select
       onChange={(v) => {
        console.log('v2',v)
      }}
        disabled={true}
       value ={SecondValue}
      >
        
        {
          SecondItems.map((item,index)=>(
           
        <Option value={item.Id}>
          <Space align="center">
            {item.value}
          </Space>
        </Option>
            
          ))
        }
          
        
      </Select>
        
    </BaseButtonsForm.Item>


    <BaseButtonsForm.Item name="Sets" label="نام محصول"
           rules={[{ required: true}]}
        >
      <Select
       onChange={(v) => {
        setsetsValue(v)
        console.log('sets v',v)
        GetKardex(v,userData[0].FiscalYearId.toString(),FirstValue)
      }}
      
      >
        {
          SetsData.map((item,index)=>(
           
        <Option value={item.Id}>
          <Space align="center">
            {item.Title}
          </Space>
        </Option>
            
          ))
        }
      </Select>
    </BaseButtonsForm.Item>


    <Auth.FormItem
              name="Amount"
              label="تعداد ست های جاری"
              rules={[{ required: true, message: t('common.requiredField') }]}
             
            >
              <Auth.FormInput placeholder="تعداد ست" min={0}  value={AmountValue} defaultValue={AmountValue} onChange={(e) => { setAmountValue(e.target.value) }} type='number'/>
            </Auth.FormItem>


    <BaseForm.Item noStyle>
          <Auth.SubmitButton type="primary" htmlType="submit" loading={isLoading}
          
          onClick={() => {
            console.log('test')
            if (FirstValue != 0 && SecondValue!=0 && setsValue!=0) {
              if(AmountValue>0)
              AddMovesWareHouses(FirstValue,SecondValue,setsValue,AmountValue)
            else
       alert('میزان محصول جاری منفی می باشد،لطفا ابتدا نوع سندها را چک کنید.')
            }

            else {
                alert('لطفا اطلاعات را کامل پر کنید.')
            }
          }}
          >
           ثبت
          </Auth.SubmitButton>
        </BaseForm.Item>
        
      </BaseForm>
    </Auth.FormWrapper>
    </div>
     {/* <CheckBoxTables DataSource={AllData} columns={columns.filter(item => !item.hidden)}
     rowSelections={rowSelection}  
     
     
      /> */}

     
     </div>
  );
};

export default MovesWarehouse;
