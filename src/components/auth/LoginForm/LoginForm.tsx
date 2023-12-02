import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { doLogin } from '@app/store/slices/authSlice';
import { notificationController } from '@app/controllers/notificationController';
import { ReactComponent as FacebookIcon } from '@app/assets/icons/facebook.svg';
import { ReactComponent as GoogleIcon } from '@app/assets/icons/google.svg';
import * as S from './LoginForm.styles';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import { Config } from './../../../Database/Config';
import bcrypt from 'bcryptjs';
import UserContext from './../../../NewPage/UserContext';
import axios from 'axios';
import { DataUsers } from '@app/NewPage/DataUsers';
interface LoginFormData {
  username: string;
  password: string;
}

export const initValues: LoginFormData = {
  username: '',
  password: '',
};
const salt = bcrypt.genSaltSync(10)
// const hashedPassword = bcrypt.hashSync("123", '$2a$10$CwTycUXWue0Thq9StjUM0u')
export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { userData,setUserData } = React.useContext(UserContext);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (values: LoginFormData) => {
    // console.log('data START : ',values.username.toString(),values.password.toString())
     setLoading(true);
    // dispatch(GetLoginData(values.username.toString(),values.password.toString()))
    //   .unwrap()
    //   .then(() => navigate('/'))
    //   .catch((err) => {
    //     notificationController.error({ message: err.message });
    //     setLoading(false);
    //   });
     GetLoginData(values.username.toString(),values.password.toString())
  };



   let GetLoginData=(_username,_pass)=>{
    
   var pass = bcrypt.hashSync(_pass.toString(), '$2a$10$CwTycUXWue0Thq9StjUM0u')
    var data={
      "Username":_username.toString(),
      "PassWord": pass.toString()
    }

    console.log('data var : ',data)
    axios.post(Config.URL +
      Config.Defination.GetUsersWithUsernameandPass,data)
      .then((response) => {
        if(response.data.data.length>0)
        {
          DataUsers.UserId = response.data.data[0].Id.toString();
          DataUsers.Username = response.data.data[0].Username.toString();
          localStorage.setItem('Username', response.data.data[0].Username);
          localStorage.setItem('UserId', response.data.data[0].Id);
          

          const myNextList = [...userData];
          const artwork = myNextList;
          console.log('login 2',artwork)
          artwork[0].UserId = response.data.data[0].Id;
          artwork[0].Username = response.data.data[0].Username;
          setUserData(myNextList)
          navigate('/')
        }
        else
        {
          navigate('/')
        }
        setLoading(false);
        console.log('response data : ', response.data.data)
      })
      .catch((error) => {
        console.log('Error : ', error)
        setLoading(false);
      })
  }

  // let removeData = (_id) => {
  //   console.log("Id : ", _id)
  //   let filteredArray = AllData.filter(item => item.Id !== _id)
  //   console.log("filteredArray : ", filteredArray)
  //   setAllData(filteredArray)
  //  }

  return (
    <Auth.FormWrapper >
      <BaseForm layout="vertical" onFinish={handleSubmit}  initialValues={initValues}  >
        <Auth.FormTitle >صفحه ورود</Auth.FormTitle>
        {/* <S.LoginDescription>{t('login.loginInfo')}</S.LoginDescription> */}
        <Auth.FormItem
        
          name="username"
          label="نام کاربری"
          rules={[
            { required: true, message: t('common.requiredField') },
            
          ]}

        >
          <Auth.FormInput placeholder="نام کاربری" />
        </Auth.FormItem>
        <Auth.FormItem
          label="رمز عبور"
          name="password"
          rules={[{ required: true, message: t('common.requiredField') }]}
        >
          <Auth.FormInputPassword placeholder="رمز عبور" />
        </Auth.FormItem>
        <Auth.ActionsWrapper>
          <BaseForm.Item name="rememberMe" valuePropName="checked" noStyle>
            <Auth.FormCheckbox>
              <S.RememberMeText>ذخیره اطلاعات</S.RememberMeText>
            </Auth.FormCheckbox>
          </BaseForm.Item>
          {/* <Link to="/auth/forgot-password">
            <S.ForgotPasswordText>{t('common.forgotPass')}</S.ForgotPasswordText>
          </Link> */}
        </Auth.ActionsWrapper>
        <BaseForm.Item noStyle>
          <Auth.SubmitButton type="primary" htmlType="submit" loading={isLoading}
          onClick={()=>GetLoginData}
          >
          ورود
          </Auth.SubmitButton>
        </BaseForm.Item>

   
        {/* <Auth.FooterWrapper>
          <Auth.Text>
            {t('login.noAccount')}{' '}
            <Link to="/auth/sign-up">
              <Auth.LinkText>{t('common.here')}</Auth.LinkText>
            </Link>
          </Auth.Text>
        </Auth.FooterWrapper> */}
      </BaseForm>
    </Auth.FormWrapper>
  );
};
