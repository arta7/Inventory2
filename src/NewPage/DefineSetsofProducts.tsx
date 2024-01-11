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

interface DefinePostData {
  Title: string;
  Code: string;

}
interface DataType {
  columns: []
}

let DataProduct = [];

type DataIndex = keyof DataType;

const DefineSetsofProducts: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [Counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [SetsData, setSetsData] = useState([]);
  const [SetsSelectedItem, setSetsSelectedItem] = useState('');
  const [AllData, setAllData] = useState([]);
  const [SetofProductData, setSetofProductData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const [DataPrint,setDataPrint] = useState({})
  const [RowDataPrint,setRowDataPrint] = useState([])
  const [SumCounts,setSumCounts] = useState(0)


  const { t } = useTranslation();
  const [form] = BaseForm.useForm();

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
      title: 'واحد ابزار',
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
        } >
        <Auth.FormInput placeholder="عدد"
          type="number"
          value={record.Counts}
          style={{ textAlign: 'center' }}

          onChange={(v) => {

            
            const myNextList = [...AllData];
            const artwork = myNextList.find(
              a => a.Id == record.Id.toString()
            );
            artwork.Counts = v.target.value;
            setAllData(myNextList);



            if (DataProduct.filter(item1 => item1.SetsRef == SetsSelectedItem && item1.ProductRef == record.Id).length == 0) {
              console.log('selectedRowKeys',selectedRowKeys)
              if(selectedRowKeys.filter(a=>a == record.Id).length>0)
              DataProduct.push({ "SetsRef": SetsSelectedItem, "ProductRef": record.Id, "Counts": v.target.value.toString() })
              console.log('text : ', DataProduct)
            }

            else {
              DataProduct = DataProduct.map(item1 => {
                if (item1.SetsRef == SetsSelectedItem && item1.ProductRef == record.Id) {
                  return { ...item1, "Counts": v.target.value.toString() };
                }
                return item1;
              })
              

              console.log('text : ', DataProduct)

            }

            // setCounter(Counter+1)
          }}
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
    // DataProduct = DataProduct.map(item1 => {
    //   if (item1.SetsRef == SetsSelectedItem && item1.ProductRef == record.Id) {
    //     return { ...item1, "Counts": ''};
    //   }
    //   return item1;
    // })
    if (SetsSelectedItem != "")
      setSelectedRowKeys(newSelectedRowKeys);
    else
      alert('Error')
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

  let GetSetsofP = (_v) => {
    const myNextList = [...AllData];
      for(let j=0;j<AllData.length;j++)
      {
      
        const artwork = myNextList[j];
        console.log('artwork : ', artwork)
        artwork.Counts = "";
       
      }
      setAllData(myNextList);

    var data = {
      "SetsRef": _v
    }
    axios.post(Config.URL +
      Config.Defination.GetSetsOfProducts, data)
      .then((response) => {
        console.log('response data Sets : ', response.data.data)
        // setSetofProductData(response.data.data)
        var x = [];
        DataProduct = [];
        var Counters = 0;
        for (let i = 0; i < response.data.data.length; i++) {

          x.push(response.data.data[i].ProductRef.toString())
          DataProduct.push({
            "SetsRef": response.data.data[i].SetsRef.toString(),
            "ProductRef": response.data.data[i].ProductRef.toString(), "Counts": response.data.data[i].Counts.toString()
          })
          //  for(let j=0;j<AllData.length;j++)
          //  {
          if (AllData.filter(item1 => item1.Id == response.data.data[i].ProductRef).length > 0) {

            const myNextList = [...AllData];
            const artwork = myNextList.find(
              a => a.Id == response.data.data[i].ProductRef.toString()
            )

            console.log('artwork : ', artwork)
            artwork.Counts = response.data.data[i].Counts.toString();
            setAllData(myNextList);
          }
          Counters = Counters + response.data.data[i].Counts
          console.log('x : ', x)
        }
        // console.log('newdata : ',newdata)
        setSelectedRowKeys(x)





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
          data1.push({
            KeySearch: response.data.data[i].Id.toString(), Id: response.data.data[i].Id.toString(), Title: response.data.data[i].Title,
            Code: response.data.data[i].Code, UnitRef: response.data.data[i].UnitRef,
            UnitTitle: response.data.data[i].UnitTitle, Counts: ""
          })
        }
        console.log('data1 : ', data1)
        setAllData(data1)
      })
      .catch((error) => {
        console.log('Error : ', error)
      })
  }





  let GetPrint = (_v) => {
    var data = {
      "SetsRef": _v
    }
    axios.post(Config.URL +
      Config.Defination.GetSetsOfProducts, data)
      .then((response) => {
        console.log('response data Sets : ', response.data.data)
        // setSetofProductData(response.data.data)
        var x = [];

        var Counters = 0;
        for (let i = 0; i < response.data.data.length; i++) {

          x.push({
            "SetsRef": response.data.data[i].SetsRef,
            "ProductRef": response.data.data[i].ProductRef,
            "ProductTitle": response.data.data[i].ProductTitle,
            "Code":response.data.data[i].Code.toString(), "Counts": response.data.data[i].Counts,"UnitTitle" : response.data.data[i].UnitTitle
          })

          Counters = Counters + response.data.data[i].Counts
     
        }
        setSumCounts(Counters)
        setRowDataPrint(x)
        setTimeout(() => {
          printdiv("printItem2")
          window.location.reload();
         }, 200);
       
      })
      .catch((error) => {
        console.log('Error : ', error)
      })
  }




  let AddSetsOfProduct = () => {

    

      for(let i =0;i<DataProduct.length;i++)
      {
        if(selectedRowKeys.filter(a=>a == DataProduct[i].ProductRef).length == 0)
        {
          DataProduct = DataProduct.filter(item => item.ProductRef != DataProduct[i].ProductRef);
        }
      }
      console.log('DataProduct', JSON.stringify(DataProduct))
    var data = {
      'jsonData': JSON.stringify(DataProduct)
    }
    // console.log('@jsonData : ',data)
    axios.post(Config.URL +
      Config.Defination.AddSetsOfProduct, data)
      .then((response) => {
        console.log('response data product : ', response.data.data)
        form.setFieldsValue({
          Sets: ''
        })
        setSetsSelectedItem('')
        setLoading(false)
        setCounter(Counter+1)
        setSelectedRowKeys([])
        DataProduct = [];
        alert(' اطلاعات با موفقیت ثبت شد')

      })
      .catch((error) => {
        console.log('Error : ', error)
        setLoading(false)
      })


  }



  let DeleteSetsOfProduct = () => {
    setLoading(true)
    var data = {
      'SetsRef': SetsSelectedItem
    }
    axios.post(Config.URL +
      Config.Defination.DeleteSetsOfProduct, data)
      .then((response) => {
        console.log('response data : ', response.data.data)
        AddSetsOfProduct()
      })
      .catch((error) => {
        console.log('Error : ', error)
        setLoading(false)
      })
  }

  function printdiv(elem) {
    var header_str = '<html><head><title>تست</title></head><body>';
    var footer_str = '</body></html>';
    var new_str = document.getElementById(elem).innerHTML;
    var old_str = document.body.innerHTML;
    document.body.innerHTML = header_str + new_str + footer_str;
    window.print();
    document.body.innerHTML = old_str;
    return false;
  }


  useEffect(() => {
    GetProducts()
    GetSets()

  }, [Counter])

  return (
    <div >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Auth.FormWrapper >
          <BaseForm layout="vertical" onFinish={handleSubmit} form={form}>
            <S.Title>ابزار هر سِت </S.Title>

            <BaseButtonsForm.Item name="Sets" label="نام ست"
              rules={[{ required: true }]}
            >
              <Select
                onChange={(v) => {
                  setSelectedRowKeys([])
                  setSetsSelectedItem(v)
                

                  GetSetsofP(v)
                }}
              >

                {
                  SetsData.map((item, index) => (

                    <Option value={item.Id.toString()}>
                      <Space align="center">
                        {item.Title}
                      </Space>
                    </Option>

                  ))
                }

              </Select>


            </BaseButtonsForm.Item>


            <div style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex' }}>
              <Auth.SubmitButton type="primary" htmlType="submit" loading={isLoading} style={{ marginLeft: 10 }}

                onClick={() => {
                  console.log('test')
                  if (SetsSelectedItem != '') {
                    DeleteSetsOfProduct()
                  }

                  else {
                    alert('لطفا اطلاعات را کامل پر کنید.')
                  }
                }}
              >
                ثبت
              </Auth.SubmitButton>

              <Auth.SubmitButton type="default"  loading={isLoading}

onClick={() => {
  console.log('test',SetsSelectedItem)
  GetPrint(SetsSelectedItem)
 
}}
>
چاپ
</Auth.SubmitButton>
            </div>

          </BaseForm>
        </Auth.FormWrapper>
      </div>
      <CheckBoxTables DataSource={AllData} columns={columns.filter(item => !item.hidden)}
        rowSelections={rowSelection}

      />

{
      <div style={{display:'none'}}  id='printItem2'>
        <div style={{borderWidth:1,width:'85vw',justifyContent:'center',alignItems:'center',height:70,borderRadius:5,padding:5,marginTop:20,marginRight:20}}>
        
          <div style={{justifyContent:'center',alignItems:'center',display:'flex'}}>
           
            <label style={{fontSize:25}}>{SetsData.filter(items=>items.Id == SetsSelectedItem).length > 0 ? SetsData.filter(items=>items.Id == SetsSelectedItem)[0].Title : ''}</label>
            </div>

      </div>
      <table style={{borderWidth:1,borderStyle:'solid',width:'90vw',marginTop:20,justifyContent:'center',alignItems:'center',borderRadius:5}}>
        <thead style={{height:70}}>
          <th style={{borderWidth:1,borderStyle:'solid'}}>ردیف</th>
          <th style={{borderWidth:1,borderStyle:'solid'}}>عنوان </th>
          <th style={{borderWidth:1,borderStyle:'solid'}}>کد</th>
          <th style={{borderWidth:1,borderStyle:'solid'}}>واحد </th>
          <th style={{borderWidth:1,borderStyle:'solid'}}>تعداد</th>
        </thead>
        <tbody>
{RowDataPrint.map((item,index)=>
   <tr style={{textAlign:'center',height:70}}>
   <td style={{borderWidth:1,borderStyle:'solid',width:'10vw'}}>{index+1}</td>
   <td style={{borderWidth:1,borderStyle:'solid',width:'20vw'}}>{item.ProductTitle}</td>
   <td style={{borderWidth:1,borderStyle:'solid',width:'20vw'}}>{item.Code}</td>
   <td style={{borderWidth:1,borderStyle:'solid',width:'15vw'}}>{item.UnitTitle}</td>
   <td style={{borderWidth:1,borderStyle:'solid',width:'20vw'}}>{item.Counts}</td>
 </tr>
)
       
}
<tr style={{textAlign:'center',height:70}}>
<td ></td>
   <td style={{borderWidth:1,borderStyle:'solid',width:'15vw'}}>جمع کل </td>
   <td ></td> 
   <td ></td>
   <td style={{width:'20vw'}}>{SumCounts}</td>
 
</tr>

        </tbody>
      </table>
</div>
}




    </div>
  );
};

export default DefineSetsofProducts;
