import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { doSignUp } from '@app/store/slices/authSlice';
import { notificationController } from '@app/controllers/notificationController';
import { ReactComponent as GoogleIcon } from '@app/assets/icons/google.svg';
import { ReactComponent as FacebookIcon } from '@app/assets/icons/facebook.svg';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import * as S from './SignUpForm.styles';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';
import { Space } from 'antd';

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const initValues = {
  firstName: 'Chris',
  lastName: 'Johnson',
  email: 'chris.johnson@altence.com',
  password: 'test-pass',
  confirmPassword: 'test-pass',
  termOfUse: true,
};

export const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);

  const { t } = useTranslation();

  const handleSubmit = (values: SignUpFormData) => {
    setLoading(true);
    dispatch(doSignUp(values))
      .unwrap()
      .then(() => {
        notificationController.success({
          message: t('auth.signUpSuccessMessage'),
          description: t('auth.signUpSuccessDescription'),
        });
        navigate('/auth/login');
      })
      .catch((err) => {
        notificationController.error({ message: err.message });
        setLoading(false);
      });
  };

  return (
    <Auth.FormWrapper>
      <BaseForm layout="vertical" onFinish={handleSubmit}  initialValues={initValues}>
        <S.Title>ثبت نام</S.Title>
        <Auth.FormItem
          name="firstName"
          label="نام کاربری"
          rules={[{ required: true, message: t('common.requiredField') }]}
        >
          <Auth.FormInput placeholder={t('common.firstName')} />
        </Auth.FormItem>

        <Auth.FormItem
          label="رمز عبور"
          name="password"
          rules={[{ required: true, message: t('common.requiredField') }]}
        >
          <Auth.FormInputPassword placeholder={t('common.password')} />
        </Auth.FormItem>
        <Auth.FormItem
          label="تکرار رمز عبور"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: t('common.requiredField') },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t('common.confirmPasswordError')));
              },
            }),
          ]}
        >
          <Auth.FormInputPassword placeholder={t('common.confirmPassword')} />
        </Auth.FormItem>
       

        <BaseButtonsForm.Item name="Groups" label="گروه کاربری"
           rules={[{ required: true}]}
        >
      <Select>
        <Option value="male">
          <Space align="center">
            {/* <ManOutlined /> */}
            {t('profile.nav.personalInfo.male')}
          </Space>
        </Option>
        <Option value="female">
          <Space align="center">
            {/* <WomanOutlined /> */}
            {t('profile.nav.personalInfo.female')}
          </Space>
        </Option>
      </Select>
    </BaseButtonsForm.Item>




        <BaseForm.Item noStyle>
          <Auth.SubmitButton type="primary" htmlType="submit" loading={isLoading}>
           ثبت نام
          </Auth.SubmitButton>
        </BaseForm.Item>
 
      </BaseForm>
    </Auth.FormWrapper>
  );
};
