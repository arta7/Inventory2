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
import  Tables  from './Tables';

interface DefinePostData {
  Title: string;
  Code: string;
}


 const DefineGroups: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);

  const { t } = useTranslation();

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
        <S.Title>تعریف گروه </S.Title>
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
    <Tables />
    </div>
  );
};

export default DefineGroups;
