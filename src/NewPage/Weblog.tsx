import React, { useState, useEffect } from 'react';
import { dashboardNews } from '@app/constants/dashboardNews';
import { DashboardCard } from '../DashboardCard/DashboardCard';
import * as S from './NewsCard.styles';
import { useTranslation } from 'react-i18next';
import { ArticleCard } from 'components/common/ArticleCard/ArticleCard';
import axios from 'axios';
import { Col, Row } from 'antd';
import { Config } from '@app/Database/Config';
import { useNavigate } from 'react-router-dom';
export const Weblog: React.FC = () => {
  const { t } = useTranslation();
  const [datahtml, setdatahtml] = useState([])
  const navigate = useNavigate();

  let Weblog = () => {

    axios.post(Config.URL +
      Config.Defination.GetHtmlData)
      .then((response) => {
        if(response.data.data.length<=3)
        setdatahtml(response.data.data)
      else
      {
          var data = [];
          for(let i =0;i<4;i++)
          {
            data.push(response.data.data[i])
          }
          setdatahtml(data) 
      }
      })
      .catch((error) => {
        console.log('Error : ', error)
      })
  }


  const blobToBase64 = blob => {
    const atob =  Buffer.from(blob, 'base64').toString('ascii');
    return atob;
    //  
  };

  useEffect(() => {
    GetHtmlData()
  }, [])
  return (
    <DashboardCard title='وبلاگ' style={{marginTop:30,marginRight:30}}>

      <S.Wrapper >
      <Row justify="space-between" align="middle" wrap={false} >
        {datahtml?.map((item, index) => (
          <ArticleCard
            key={index}
            imgUrl={item.ImageLocation != null ? blobToBase64(item.ImageLocation) : ''}
            title={item.Title}
            // description={<div dangerouslySetInnerHTML={{ __html: `<div>` + item.Context + `</div>` }}></div>}
            id={item.Id}
            
            
          />
        ))}
        </Row>
      </S.Wrapper>
    </DashboardCard>
  );
};
