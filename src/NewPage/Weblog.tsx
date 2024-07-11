import React, { useState, useEffect } from 'react';
import { dashboardNews } from '@app/constants/dashboardNews';
import { DashboardCard } from './DashboardCard';
import * as S from './NewsCard.styles';
import { useTranslation } from 'react-i18next';
import { ArticleCard } from 'components/common/ArticleCard/ArticleCard';
import axios from 'axios';
import { Col, Row } from 'antd';
import { Config } from '@app/Database/Config';
import { useNavigate } from 'react-router-dom';
 const Weblog: React.FC = () => {
  const { t } = useTranslation();
  const [datahtml, setdatahtml] = useState([])
  const navigate = useNavigate();

  let GetHtmlData = () => {
   
    axios.post(Config.URL +
      Config.Defination.GetHtmlData)
      .then((response) => {
        setdatahtml(response.data.data)
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
    console.log('test')
    GetHtmlData()
  }, [])
  return (
    <DashboardCard title='خبر روز' style={{marginTop:30,marginRight:30}}>

      <S.Wrapper >
      <Row justify="space-between" align="middle" wrap={true} >
        {datahtml?.map((item, index) => (
          <ArticleCard
            key={index}
            imgUrl={item.ImageLocation != null ? blobToBase64(item.ImageLocation) : ''}
            title={item.Title}
            wrapstyle={{marginRight:10,marginLeft:10,height:250,width:400,marginBottom:20}}
            imageStyle={{height:180,width:400}}
            // description={<div dangerouslySetInnerHTML={{ __html: `<div>` + item.Context + `</div>` }}></div>}
            id={item.Id}
            
            
          />
        ))}
        </Row>
      </S.Wrapper>
    </DashboardCard>
  );
};
export default Weblog;
