import React, { useEffect, useState } from 'react';
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
import { Space } from 'antd';
import  Tables  from './Tables';
import axios from 'axios';
import {Config} from './../Database/Config';



interface DefinePostData {
  Id:string;
  Title: string;
  Code: string;
}






 const DefineUnit: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);
  const [AllData, setAllData] = useState([]);
  const { t } = useTranslation();


   let GetUnits=()=>{

    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }
    axios.post(Config.URL +
      Config.Defination.GetUnit)
   .then((response)=> {
    console.log('response data : ',response.data.data)  
var data1 = [];
    for(let i=0;i<response.data.data.length;i++)
    {
      data1.push({Id:response.data.data[i].Id.toString(),Title:response.data.data[i].Title,Code:response.data.data[i].Code})
    }
    console.log('data1 : ',data1)
    setAllData(data1)
   })
   .catch( (error)=> {
    console.log('Error : ',error)  
  })


   }

    useEffect(()=>{
      GetUnits()
    },[])



  const handleSubmit = (values: DefinePostData) => {
  };

  return (
    <div >
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
    <Auth.FormWrapper >
      <BaseForm layout="vertical" onFinish={handleSubmit}  >
        <S.Title>تعریف واحد کالا</S.Title>
        <Auth.FormItem
          name="Title"
          label="عنوان"
          rules={[{ required: true, message: t('common.requiredField') }]}
        >
          <Auth.FormInput placeholder="عنوان" />
        </Auth.FormItem>

        <Auth.FormItem
          label="کد "
          name="Code"
          rules={[{ required: true, message: t('common.requiredField') }]}
        >
          <Auth.FormInput placeholder="کد " />
        </Auth.FormItem>
      
        <BaseForm.Item noStyle>
          <Auth.SubmitButton type="primary" htmlType="submit" loading={isLoading}>
           ثبت
          </Auth.SubmitButton>
        </BaseForm.Item>
 
      </BaseForm>
    </Auth.FormWrapper>
    </div>
    {AllData.length > 0 &&
    <Tables    DataSource={AllData}/>
    }
    </div>
  );
};

export default DefineUnit;
