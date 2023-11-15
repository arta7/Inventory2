import React, { useState } from 'react';
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
import CheckBoxTables from './CheckBoxTables';
interface DefinePostData {
  Title: string;
  Code: string;

}


 const DefineUserAccess: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);

  const { t } = useTranslation();

  const handleSubmit = (values: DefinePostData) => {
    // setLoading(true);
    // dispatch(doSignUp(values))
    //   .unwrap()
    //   .then(() => {
    //     notificationController.success({
    //       message: t('auth.signUpSuccessMessage'),
    //       description: t('auth.signUpSuccessDescription'),
    //     });
    //     navigate('/auth/login');
    //   })
    //   .catch((err) => {
    //     notificationController.error({ message: err.message });
    //     setLoading(false);
    //   });
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
        <S.Title>دسترسی کاربران</S.Title>
      
        <BaseButtonsForm.Item name="Users" label="کاربران"
           rules={[{ required: true}]}
        >
      <Select>
        <Option value="1">
          <Space align="center">
            {/* <ManOutlined /> */}
            کاربر1
          </Space>
        </Option>
        <Option value="2">
          <Space align="center">
            {/* <WomanOutlined /> */}
             کاربر 2 
          </Space>
        </Option>
        <Option value="3">
          <Space align="center">
            {/* <WomanOutlined /> */}
             کاربر 3 
          </Space>
        </Option>
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
     <CheckBoxTables />

     
     </div>
  );
};

export default DefineUserAccess;
