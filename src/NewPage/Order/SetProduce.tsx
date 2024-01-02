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
// import {
//   DatePicker
// } from "react-advance-jalaali-datepicker";
import Tables from './../Tables';
import axios from 'axios';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import { Button, Input, Space, Table, InputRef, Popconfirm, Col, Row } from 'antd';
import Searchinput from '../Searchinput';
import { DataUsers } from '../DataUsers';
import UserContext from './../UserContext';
import { DateInput } from 'react-hichestan-datetimepicker';

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
  const [Code, setCode] = useState('')
  const [query, setQuery] = useState('');
  const [selectedStates, setselectedStates] = useState('');
  const [selectedGroups, setselectedGroups] = useState('');
  const [ControlId, setControlId] = useState(0)
  const [date, setDate] = useState(new Date());
  const [components] = useState<Component[]>(configComponents);
  const [ProductName, setProductName] = useState({})
  const [isModalVisible, setModalVisible] = useState(false);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [form] = BaseForm.useForm();
  const { userData, setUserData } = React.useContext(UserContext);
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
      title: 'نام ابزار ',
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

        <Searchinput list={ProductData} PlaceHolder="نام ابزار" value={record.Name}
          CurrentId={record.Id}
          setAllData={setAllData}
          AllData={AllData}

        />
      </div>
    },
    {
      title: 'کد ابزار',
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
        <Auth.FormInput placeholder="کد ابزار"
          value={record.Code}
          readOnly={true}
          style={{ textAlign: 'center' }}

          onChange={(v) => {

            const myNextList = [...AllData];
            const artwork = myNextList.find(
              a => a.Id == record.Id
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
      title: 'واحد ابزار ',
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
        <Auth.FormInput placeholder="واحد ابزار"
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
      title: 'واحد ابزار ',
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
              a => a.Id == record.Id
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
              a => a.Id == record.Id
            );
            console.log('details :', artwork)
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

  let GetProductDocumentData = (_Id) => {

    var data = {
      "DocumentsRef": _Id
    }

    console.log('Data GetProductDocumentData : ', data)
    axios.post(Config.URL +
      Config.Defination.GetProductDocumentData, data)
      .then((response) => {
        console.log('response   GetProductDocumentData : ', response.data.data)
        var datapush = [];
        var id = 0;
        if (response.data.data.length > 0) {
          for (let i = 0; i < response.data.data.length; i++) {
            id = i + 1;
            datapush.push({
              Code: response.data.data[i].ProductCode
              , Name: response.data.data[i].ProductTitle, ProductId: response.data.data[i].ProductId
              , Units: response.data.data[i].UnitTitle, UnitsRef: response.data.data[i].UnitRef, Counts: response.data.data[i].Counts
              , Details: response.data.data[i].Details, Id: id
            })
          }
          id = id + 3;
          setControlId(id)
          setAllData(datapush)
        }

      })
      .catch((error) => {
        console.log('Error data document GetProductDocumentData : ', error)
      })


  }



  let GetDocumentData = (_fisc, _Id) => {

    var data = {
      "Id": _Id,
      "FiscalYearRef": _fisc
    }

    console.log('Data ProductDocuments : ', data)
    axios.post(Config.URL +
      Config.Defination.GetProductsDocumentsWithId, data)
      .then((response) => {
        console.log('response data  documents product : ', response.data.data)

        if (response.data.data.length > 0) {
          form.setFieldsValue({
            Code: response.data.data[0].Id.toString(),
            DocumentType: response.data.data[0].StatesRef.toString(),
            DocumentSecond: response.data.data[0].SecondUserRef.toString(),
              Dates:response.data.data[0].Date

          })
          setCode(response.data.data[0].Id.toString())
          setselectedGroups(response.data.data[0].SecondUserRef.toString())
          setselectedStates(response.data.data[0].StatesRef.toString())
          GetProductDocumentData(_Id)
          setDate(response.data.data[0].Date)

          console.log('set data')
        }

      })
      .catch((error) => {
        console.log('Error data document product id : ', error)
      })
  }

  let toEnglishDigits = (str) => {

    var e = '۰'.charCodeAt(0);
    str = str.replace(/[۰-۹]/g, function (t) {
      return t.charCodeAt(0) - e;
    });

    // convert arabic indic digits [٠١٢٣٤٥٦٧٨٩]
    e = '٠'.charCodeAt(0);
    str = str.replace(/[٠-٩]/g, function (t) {
      return t.charCodeAt(0) - e;
    });
    return str;
  }


  let GetDataUser = () => {
    console.log('UserData test : ', userData[0].selectedProductId.toString())
    if (userData[0].selectedProductId.toString() != "") {
      GetDocumentData(userData[0].FiscalYearId.toString(), userData[0].selectedProductId.toString())
    }
    else {
      form.setFieldsValue({
        Code: '',
        DocumentType: '',
        DocumentSecond: '',
      })
      setCode('')
      setselectedGroups('')
      setselectedStates('')
      setAllData([])
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      Dates:new Date()
    })
    setDate(new Date())
    GetProducts()
    GetStates()
    GetGroups()
   




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

  let GetGroups = () => {
    var Data={
      "CollectionId":1
    }
    axios.post(Config.URL +
      Config.Defination.GetGroupsData,Data)
      .then((response) => {
        console.log('response data : ', response.data.data)

        setGroupsData(response.data.data)
        GetDataUser()
      })
      .catch((error) => {
        console.log('Error : ', error)
      })


  }

  let AddDocumentControls = (_code, _type, _userRef, _fiscalYearRef) => {
    setLoading(true)
    var data = {
      "Code": _code,
      "Type": _type,
      "StatesRef": selectedStates,
      "SecondUserRef": selectedGroups,
      "CurrentState": 1,
      "RegisterDate":
        new Date().toJSON().slice(0, 10).replace(/-/g, '/').toString(),
      "Date":  new Date(date).toLocaleDateString('zh-Hans-CN'),
      "UserRef": _userRef,
      "FiscalYearRef": _fiscalYearRef,
      "CollectionId":1
    }
    axios.post(Config.URL +
      Config.Defination.AddDocumentControlsCollection, data)
      .then((response) => {
        console.log('response data : ', response.data.data)
        console.log('result Id : ', response.data.data)
        AddProductDocuments(response.data.data[0].Id)

      })
      .catch((error) => {
        console.log('Error : ', error)
        setLoading(false)
      })
  }

  let UpdateDocumentControls = (_code, _type, _userRef, _fiscalYearRef, _id) => {
    setLoading(true)
    var data = {
      "Code": _code,
      "Type": _type,
      "StatesRef": selectedStates,
      "SecondUserRef": selectedGroups,
      "CurrentState": 1,
      "RegisterDate": new Date().toJSON().slice(0, 10).replace(/-/g, '/').toString(),
      "Date": new Date(date).toLocaleDateString('zh-Hans-CN'),
      "UserRef": _userRef,
      "FiscalYearRef": _fiscalYearRef,
      "Id": _id


    }

    console.log('data : ', data)
    axios.post(Config.URL +
      Config.Defination.UpdateDocumentControls, data)
      .then((response) => {

        DeleteDocumentControlsProduct(_id)

      })
      .catch((error) => {
        console.log('Error : ', error)
        setLoading(false)
      })
  }

  let DeleteDocumentControlsProduct = (_id) => {

    var data = {
      "Id": _id

    }
    axios.post(Config.URL +
      Config.Defination.DeleteDocumentControlsProduct, data)
      .then((response) => {

        AddProductDocuments(_id)

      })
      .catch((error) => {
        console.log('Error : ', error)
        setLoading(false)
      })
  }




  let AddProductDocuments = (_id) => {

      setLoading(true)
    var dataPush = [];
    for (let i = 0; i < AllData.length; i++) {

      dataPush.push({ "ProductRef": AllData[i].ProductId.toString(), "Counts": AllData[i].Counts.toString(), "Details": AllData[i].Details.toString(), "DocumentsRef": _id.toString() })
    }
    var data = {
      "jsonData": JSON.stringify(dataPush)
    }
    axios.post(Config.URL +
      Config.Defination.AddProductDocuments, data)
      .then((response) => {
        console.log('response data : ', response.data.data)

        console.log('result Id : ', response.data)
        setLoading(false)
        setselectedGroups('')
        setselectedStates('')
        form.setFieldsValue({
          Code: '',
          DocumentType: '',
          DocumentSecond: '',
        })
        setCode('')
        setselectedGroups('')
        setselectedStates('')
        setAllData([])
        alert(' اطلاعات با موفقیت ثبت شد')
      })
      .catch((error) => {
        console.log('Error : ', error)
        setLoading(false)
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
      <BaseForm layout="horizontal" form={form}>

        <S.Title>سند انبار</S.Title>

        <Row gutter={{ xs: 10, md: 15, xl: 30 }}
        >
          <Col xs={24} md={8}>
            <Auth.FormItem
              label="شماره سند "
              name="Code"
            // rules={[{ required: true, message: t('common.requiredField') }]}

            >

              <Auth.FormInput placeholder="شماره سند "
                readOnly={true}
                value={Code}
                onChange={(e) => {
                  setCode(e.target.value)
                }} />
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



          <Col xs={20} md={6}>
            <Auth.FormItem
              label="تاریخ سند "
              name="Dates"
              rules={[{ required: true, message: t('common.requiredField') }]}
            >
              {/* <DatePicker

                placeholder="انتخاب تاریخ"
                format="jYYYY/jMM/jDD"
                onChange={(v, formatValue) => {
                  console.log('date : ', v)
                  console.log('date 2 : ', formatValue)
                  setDate(formatValue)
                }}
                id="datePicker"
                preSelected={date}
                 controlValue={true}
                inputTextAlign='center'
              />
               */}

              <DateInput
                value={date}
                name={'datePicker'}
                onChange={(event) => { 
                  console.log('date : ',new Date(event.target.value).toLocaleDateString('zh-Hans-CN'))
                  setDate((event.target.value))
                  }}
                />
            </Auth.FormItem>
          </Col>




          <BaseForm.Item noStyle>


            <Auth.SubmitButton type="primary" htmlType="submit" loading={isLoading}
              onClick={() => {
                if (date != '' && selectedGroups != "" && selectedStates != "") {
                  console.log("All dta ", AllData.length.toString(), AllData.filter(a => a.Name != "" && a.ProductId != "" && a.Counts != "").length.toString())
                  if (AllData.filter(a => a.Name != "" && a.ProductId != "" && a.Counts != "").length.toString() == AllData.length.toString() && AllData.length > 0) {
                    if (userData[0].FiscalYearTitle.toString() == 
                    toEnglishDigits(new Date(date).toLocaleDateString('fa').substring(0, 4))) {
                      if (userData[0].selectedProductId == '')
                        AddDocumentControls("", "1", userData[0].UserId.toString(), userData[0].FiscalYearId.toString())
                      else
                        UpdateDocumentControls("", "1", userData[0].UserId.toString(), userData[0].FiscalYearId.toString(), userData[0].selectedProductId.toString())
                    }
                    else {
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
            console.log('ControlID : ', ControlId)

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
