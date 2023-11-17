import React, { useState } from 'react';
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
import { Space } from 'antd';
import { categoriesList, CategoryType } from '@app/constants/categoriesList';
import { SearchDropdown } from '@app/components/header/components/searchDropdown/SearchDropdown';
import { components as configComponents, Component } from '@app/constants/config/components';
import { Btn, InputSearch } from '@app/components/header/components/HeaderSearch/HeaderSearch.styles';
import { BirthdayItem } from '@app/components/profile/profileCard/profileFormNav/nav/PersonalInfo/BirthdayItem/BirthdayItem';
import { Col, Row } from 'antd';

import {
  DatePicker
} from "react-advance-jalaali-datepicker";

// import { Calendar, DatePicker } from 'react-persian-datepicker';
// import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
interface DefinePostData {
  Title: string;
  Code: string;
}



export interface CategoryComponents {
  category: CategoryType;
  components: Component[];
}

const SetProduce: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);

  const [query, setQuery] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString('fa-IR'));
  const [components] = useState<Component[]>(configComponents);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isOverlayVisible, setOverlayVisible] = useState(false);

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

  const handleSubmit = (values: DefinePostData) => {
  };

  return (
    <div >
      <div style={{
        width:'100%',backgroundColor:'white',height:250,padding:20,borderRadius:5
      }}>
      
       
         
            <S.Title>سند انبار</S.Title>

            <Row gutter={{ xs: 10, md: 15, xl: 30 }}
         >
              <Col xs={24} md={8}>
            <Auth.FormItem
          label="شماره سند "
          name="Number"
          rules={[{ required: true, message: t('common.requiredField') }]}
        >

         <Auth.FormInput placeholder="شمار سند " />
          </Auth.FormItem>
          </Col>
       
            <Col xs={24} md={8}>
            <BaseButtonsForm.Item name="DocumentType" label="نوع سند"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="1">
                  <Space align="center">
                    {/* <ManOutlined /> */}
                    خرید
                  </Space>
                </Option>
                <Option value="2">
                  <Space align="center">
                    {/* <WomanOutlined /> */}
                    مصرف
                  </Space>
                </Option>
                <Option value="3">
                  <Space align="center">
                    {/* <WomanOutlined /> */}
                    ضایعات
                  </Space>
                </Option>
              </Select>
            </BaseButtonsForm.Item>
            </Col>


            <Col xs={24} md={8}>
            <BaseButtonsForm.Item name="DocumentSecond" label="درخواست کننده"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="1">
                  <Space align="center">
                    {/* <ManOutlined /> */}
                    رادیولوژی
                  </Space>
                </Option>
                <Option value="2">
                  <Space align="center">
                    {/* <WomanOutlined /> */}
                    مغز و اعصاب
                  </Space>
                </Option>
                <Option value="3">
                  <Space align="center">
                    {/* <WomanOutlined /> */}
                    اورتوپد
                  </Space>
                </Option>
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
          onChange={(v)=>{setDate(v)}}
          id="datePicker"
          preSelected={date}
          inputTextAlign='center'
        />
        </Auth.FormItem>
            </Col>




            <BaseForm.Item noStyle>


              <Auth.SubmitButton type="primary" htmlType="submit" loading={isLoading}>
                ثبت
              </Auth.SubmitButton>
            </BaseForm.Item>

          </Row>

       
      </div>
      {/* <Tables /> */}
    </div>
  );
};

export default SetProduce;
