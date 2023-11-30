import React, { useEffect, useState } from 'react';
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
import { categoriesList, CategoryType } from '@app/constants/categoriesList';
import { SearchDropdown } from '@app/components/header/components/searchDropdown/SearchDropdown';
import { components as configComponents, Component } from '@app/constants/config/components';
import { Btn, InputSearch } from '@app/components/header/components/HeaderSearch/HeaderSearch.styles';
import { BirthdayItem } from '@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/BirthdayItem/BirthdayItem';
import { Config } from './../../Database/Config';
import {
  DatePicker
} from "react-advance-jalaali-datepicker";
import Tables from './../Tables';
import axios from 'axios';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import { Button, Input, Space, Table, InputRef, Popconfirm, Col, Row } from 'antd';
import Searchinput from '../Searchinput';
import { DataUsers } from '../DataUsers';
import UserContext from './../UserContext';


interface DataType {
  columns: []
}

// interface SearchOverlayProps {
//   data: CategoryComponents[] | null;
//   isFilterVisible: boolean;
// }

type DataIndex = keyof DataType;

export interface CategoryComponents {
  category: CategoryType;
  components: Component[];
}

const SetProduce: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);
  const [AllData, setAllData] = useState([]);
  const [ProductData, setProductData] = useState([]);
  const [StatesData, setStatesData] = useState([]);
  const [GroupsData, setGroupsData] = useState([])
  const [query, setQuery] = useState('');
  const [selectedStates, setselectedStates] = useState('');
  const [selectedGroups, setselectedGroups] = useState('');
  const [ControlId, setControlId] = useState(0)
  const [date, setDate] = useState('');
  const [components] = useState<Component[]>(configComponents);
  const [ProductName, setProductName] = useState({})
  const [isModalVisible, setModalVisible] = useState(false);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const { userData,setUserData } = React.useContext(UserContext);
  var moment = require('jalali-moment');
  const sortedResults = query
    ? categoriesList.reduce((acc, current) => {
      const searchResults = components.filter(
        (component) =>
          component.categories.includes(current.name) &&
          component.keywords.some((keyword) => keyword.includes(query)),
      );

      return searchResults.length > 0 ? acc.concat({ category: current.name, components: searchResults }) : acc;
    }, [] as CategoryComponents[])
    : null;

  const { t } = useTranslation();


  const columns: ColumnsType<DataType> = [
    {
      title: 'نام کالا ',
      dataIndex: 'Name',
      key: 'Name',
      width: '30%',
      hidden: false,
      render: (text, record, index) => < div className="btn-wrap"
        style={
          {
            width: "100%",
          }
        } >

        <Searchinput list={ProductData} PlaceHolder="نام کالا" value={record.Name}
          CurrentId={record.Id}
          setAllData={setAllData}
          AllData={AllData}

        />
      </div>
    },
    {
      title: 'کد کالا',
      dataIndex: 'Code',
      key: 'Code',
      width: '20%',
      hidden: false,
      render: (text, record, index) => < div className="btn-wrap"
        style={
          {
            width: "100%",
          }
        } >
        <Auth.FormInput placeholder="کد کالا"
          value={record.Code}
          readOnly={true}
          style={{ textAlign: 'center' }}

          onChange={(v) => {

            const myNextList = [...AllData];
            const artwork = myNextList.find(
              a => a.Id === record.Id
            );
            artwork.Code = v.target.value;
            setAllData(myNextList);

          }


          }



        />
      </div>
    },
    {
      title: 'ProductId',
      dataIndex: 'ProductId',
      key: 'ProductId',
      width: '0%',
      hidden: true,
    },

    {
      title: 'واحد کالا ',
      dataIndex: 'Units',
      key: 'Units',
      width: '15%',
      hidden: false,
      render: (text, record, index) => < div className="btn-wrap"
        style={
          {
            width: "100%",
          }
        } >
        <Auth.FormInput placeholder="واحد کالا"
          value={record.Units}
          style={{ textAlign: 'center' }}

          onChange={(v) => {

            console.log('v', v)

          }


          }
          readOnly={true}
        />

      </div>
    },
    {
      title: 'واحد کالا ',
      dataIndex: 'UnitsRef',
      key: 'UnitsRef',
      width: '0%',
      hidden: true,
    },
    {
      title: 'تعداد',
      dataIndex: 'Counts',
      key: 'Counts',
      width: '15%',
      hidden: false,
      render: (text, record, index) => < div className="btn-wrap"
        style={
          {
            width: "100%",
          }
        } >
        <Auth.FormInput placeholder="عدد"
          value={record.Counts}
          style={{ textAlign: 'center' }}

          onChange={(v) => {

            const myNextList = [...AllData];
            const artwork = myNextList.find(
              a => a.Id === record.Id
            );
            artwork.Counts = v.target.value;
            setAllData(myNextList);

          }


          }
          type='number'
        />
      </div>
    },
    {
      title: 'توضیحات',
      dataIndex: 'Details',
      key: 'Details',
      width: '30%',
      hidden: false,
      render: (text, record, index) => < div className="btn-wrap"
        style={
          {
            width: "100%",
          }
        } >
        <Auth.FormInput placeholder="توضیحات"
          value={record.Details}
          style={{ textAlign: 'center' }}

          onChange={(v) => {

            const myNextList = [...AllData];
            const artwork = myNextList.find(
              a => a.Id === record.Id
            );
            artwork.Details = v.target.value;
            setAllData(myNextList);

          }


          }
        />
      </div>
    },
    {
      title: 'Id',
      dataIndex: 'Id',
      key: 'Id',
      width: '0%',
      hidden: true,
    },
    {
      title: 'وضعیت',
      dataIndex: '',
      key: 'Action',
      width: '20%',
      hidden: false,
      render: (text, record, index) => < div className="btn-wrap"
        style={
          {
            width: "100px",
          }
        } >

        < Button
          style={{ marginRight: 20, backgroundColor: 'red', color: 'white' }}
          onClick={() =>
            removeData(record.Id)
          } > حذف
        </Button>
      </div >
    }

  ]


    let  GetDataUser=()=>{
      console.log('UserData test : ',userData[0].UserId.toString())
    }

  useEffect(() => {
    console.log('userData test barnameh :',userData)
    GetProducts()
    GetStates()
    GetGroups()
    GetDataUser()

  }, [])



  let GetStates = () => {


    axios.post(Config.URL +
      Config.Defination.GetStates)
      .then((response) => {
        console.log('response data : ', response.data.data)

        setStatesData(response.data.data)
      })
      .catch((error) => {
        console.log('Error : ', error)
      })
  }


  let AddDocumentControls = (_code, _type, _userRef, _fiscalYearRef) => {

    var data = {
      "Code": _code,
      "Type": _type,
      "StatesRef": selectedStates,
      "SecondUserRef": selectedGroups,
      "CurrentState": 1,
      "RegisterDate":
        new Date().toJSON().slice(0, 10).replace(/-/g, '/').toString(),
      "Date": moment.from(date, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD').toString(),
      "UserRef": _userRef,
      "FiscalYearRef": _fiscalYearRef


    }
    axios.post(Config.URL +
      Config.Defination.AddDocumentControls, data)
      .then((response) => {
        console.log('response data : ', response.data.data)
        console.log('result Id : ', response.data.data)
        AddProductDocuments(response.data.data[0].Id)
      
      })
      .catch((error) => {
        console.log('Error : ', error)
      })
  }

  let AddProductDocuments = (_id) => {


    var dataPush = [];
    for (let i = 0; i < AllData.length; i++) {

      dataPush.push({"ProductRef":AllData[i].ProductId.toString(),"Counts":AllData[i].Counts.toString(),"Details":AllData[i].Details.toString(),"DocumentsRef":_id.toString()})
    }


    var data = {
      "jsonData": JSON.stringify(dataPush)


    }
    axios.post(Config.URL +
      Config.Defination.AddProductDocuments, data)
      .then((response) => {
        console.log('response data : ', response.data.data)

        console.log('result Id : ', response.data)

        setAllData([])
        setDate('')
        setselectedGroups('')
        setselectedStates('')
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

        setGroupsData(response.data.data)
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
        setProductData(response.data.data)
      })
      .catch((error) => {
        console.log('Error : ', error)
      })
  }

  let removeData = (_id) => {
    console.log("Id : ", _id)
    let filteredArray = AllData.filter(item => item.Id !== _id)
    console.log("filteredArray : ", filteredArray)
    setAllData(filteredArray)
  }


  return (
    <div >
      {/* <div style={{
        width:'100%',backgroundColor:'white',height:250,padding:20,borderRadius:5
      }}> */}

      {/* <Auth.FormWrapper style={{ width: '100%' }}> */}
      <BaseForm layout="horizontal"  >

        <S.Title>سند انبار</S.Title>

        <Row gutter={{ xs: 10, md: 15, xl: 30 }}
        >
          <Col xs={24} md={8}>
            <Auth.FormItem
              label="شماره سند "
              name="Number"
            // rules={[{ required: true, message: t('common.requiredField') }]}

            >

              <Auth.FormInput placeholder="شمار سند " readOnly={true} />
            </Auth.FormItem>
          </Col>

          <Col xs={24} md={8}>
            <BaseButtonsForm.Item name="DocumentType" label="نوع سند"
              rules={[{ required: true }]}
            >
              <Select
                value={selectedStates}
                onChange={(value) => {
                  console.log('seleted value : ', value)
                  setselectedStates(value)
                }}
              >
                {
                  StatesData.map((item, index) => (

                    <Option value={item.Id.toString()}>
                      <Space align="center">
                        {item.Title}
                      </Space>
                    </Option>

                  ))
                }


              </Select>
            </BaseButtonsForm.Item>
          </Col>


          <Col xs={24} md={8}>
            <BaseButtonsForm.Item name="DocumentSecond" label="درخواست کننده"
              rules={[{ required: true }]}
            >
              <Select
                value={selectedGroups}
                onChange={(value) => {
                  console.log('seleted value : ', value)
                  setselectedGroups(value)
                }}
              >
                {
                  GroupsData.map((item, index) => (

                    <Option value={item.Id.toString()}>
                      <Space align="center">
                        {item.Title}
                      </Space>
                    </Option>

                  ))
                }
              </Select>
            </BaseButtonsForm.Item>
          </Col>



          <Col xs={24} md={8}>
            <Auth.FormItem
              label="تاریخ سند "
              name="Dates"
              rules={[{ required: true, message: t('common.requiredField') }]}
            >
              <DatePicker

                placeholder="انتخاب تاریخ"
                format="jYYYY/jMM/jDD"
                onChange={(v, formatValue) => {
                  console.log('date : ', v)
                  console.log('date 2 : ', formatValue)
                  setDate(formatValue)
                }}
                id="datePicker"
                // preSelected={date}
                inputTextAlign='center'
              />
            </Auth.FormItem>
          </Col>




          <BaseForm.Item noStyle>


            <Auth.SubmitButton type="primary" htmlType="submit" loading={isLoading}
              onClick={() => {
                if (date != '' && selectedGroups != "" && selectedStates != "")
                {
                  console.log("All dta ",AllData.length.toString(), AllData.filter(a=>a.Name !="" && a.ProductId != "" && a.Counts!="" ).length.toString())
                  if(AllData.filter(a=>a.Name !="" && a.ProductId != "" && a.Counts!="" ).length.toString() == AllData.length.toString() && AllData.length > 0)
                  {
                    console.log('userData[0].FiscalYearTitle.toString()',userData[0].FiscalYearTitle.toString(),'date.substring(0,4) : ',date.substring(0,4))
                    if(userData[0].FiscalYearTitle.toString() ==  date.substring(0,4))
                    {
                      AddDocumentControls("", "1", userData[0].UserId.toString(), userData[0].FiscalYearId.toString())
                    }
                    else
                    {
                      alert('سال انتخاب شده در محدوده سال مالی نمی باشد.')
                    }
                  }
                 
                else
                alert('لطفا داده ها پایین صفحه را کامل پر کنید')
                }
                
              }}
            >
              ثبت
            </Auth.SubmitButton>
          </BaseForm.Item>

        </Row>


        {/* </div> */}

      </BaseForm>
      {/* </Auth.FormWrapper> */}

      <div style={{ width: '100px', marginTop: 20, textAlign: 'center' }}>
        <Auth.SubmitButton loading={isLoading}
          onClick={() => {
            // setAllData([{Code:"",Name:"",ProductId:"",Units:"",UnitsRef:"",Counts:"",Details:""}])
            setAllData([...AllData, { Code: "", Name: "", ProductId: "", Units: "", UnitsRef: "", Counts: "", Details: "", Id: ControlId }]);
            setControlId(ControlId + 1)
          }}
        >
          افزودن
        </Auth.SubmitButton>
      </div>


      {columns.length > 0 &&
        <Tables DataSource={AllData} columns={columns.filter(item => !item.hidden)} />
      }



    </div>
  );
};

export default SetProduce;
