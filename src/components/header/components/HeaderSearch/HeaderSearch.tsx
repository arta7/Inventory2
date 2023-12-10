import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { SearchDropdown } from '../searchDropdown/SearchDropdown';
import { Button } from '@app/components/common/buttons/Button/Button';
import { components as configComponents, Component } from '@app/constants/config/components';
import { categoriesList, CategoryType } from '@app/constants/categoriesList';
import { useResponsive } from '@app/hooks/useResponsive';
import * as S from './HeaderSearch.styles';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import {  Space } from 'antd';
import UserContext from './../../../../NewPage/UserContext';
import axios from 'axios';
import { Config } from '@app/Database/Config';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';

export interface CategoryComponents {
  category: CategoryType;
  components: Component[];
}



export const HeaderSearch: React.FC = () => {
  const { userData,setUserData } = React.useContext(UserContext);
    const[Items,setItems] = useState([])
    const[Counter,setCounter] = useState(1)
    const [form] = BaseForm.useForm();
    const[SelectedItem,setSelectedItem] = useState('')
  // const { pathname } = useLocation();

  // const [query, setQuery] = useState('');
  // const [components] = useState<Component[]>(configComponents);

  // const [isModalVisible, setModalVisible] = useState(false);
  // const [isOverlayVisible, setOverlayVisible] = useState(false);

  // const sortedResults = query
  //   ? categoriesList.reduce((acc, current) => {
  //       const searchResults = components.filter(
  //         (component) =>
  //           component.categories.includes(current.name) &&
  //           component.keywords.some((keyword) => keyword.includes(query)),
  //       );

  //       return searchResults.length > 0 ? acc.concat({ category: current.name, components: searchResults }) : acc;
  //     }, [] as CategoryComponents[])
  //   : null;

  // useEffect(() => {
  //   setModalVisible(false);
  //   setOverlayVisible(false);
  // }, [pathname]);


  const GetFiscalYear = () => {
    
    axios.post(Config.URL +
      Config.Defination.GetFiscalYear)
      .then((response) => {
        console.log('response data : ', response.data.data)
        var data1 = [];
        for (let i = 0; i < response.data.data.length; i++) {
          data1.push({ Id: response.data.data[i].Id.toString(), Title: response.data.data[i].Title, Code: response.data.data[i].Code })
        }
        console.log('data1 : ', data1)
        setItems(data1)
        console.log('user dat fiscal year search : ',userData[0].FiscalYearId.toString())
          setSelectedItem(userData[0].FiscalYearId.toString())
          form.setFieldsValue({
            FiscalYear : userData[0].FiscalYearId.toString()
          })
        

      })
      .catch((error) => {
        console.log('Error : ', error)
      })


  }


  useEffect(()=>{
    GetFiscalYear()
     

  },[])

  return (
    <BaseForm layout="horizontal"   form={form}>
    <BaseButtonsForm.Item name="FiscalYear" label="سال مالی" >
<Select
value={SelectedItem}
onChange={(value) => {
 console.log('seleted value : ',value)
  setSelectedItem(value.toString())
 localStorage.setItem("FiscalYearId",value.toString())

 const myNextList = [...userData];
 const artwork = myNextList;
 console.log('artwork fiscal year 2',artwork)
 artwork[0].FiscalYearId = value.toString();


 var findItem =  Items.find(a=>a.Id == value);
 console.log('findItem',findItem)
 if(findItem)
 {
  localStorage.setItem("FiscalYearTitle",findItem.Title.toString())
  artwork[0].FiscalYearTitle = findItem.Title.toString();
 }
 setUserData(myNextList);
 
 console.log('userdata 2',userData)
}}
>
 {
   Items.map((item,index)=>(
    
 <Option value={item.Id.toString()} >
   <Space align="center">
     {item.Title}
   </Space>
 </Option>
     
   ))
 }

 
</Select>


</BaseButtonsForm.Item>
</BaseForm>
     
    
  );
};
