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
export const NewsCard: React.FC = (activeMobile:boolean) => {
  const { t } = useTranslation();
  const [datahtml, setdatahtml] = useState([])
  const [active, setactive] = useState(false)
  const navigate = useNavigate();

  let GetHtmlData = () => {

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
    console.log('activemobile',activeMobile.activeMobile)
    setactive(activeMobile.activeMobile)
    GetHtmlData()

   
  }, [])
  return (
    <DashboardCard title='وبلاگ' style={{marginTop:30,marginRight:30}}>

      <S.Wrapper >
        {active ? 
       <Row justify="space-between" align="middle" wrap={false} >
        {datahtml?.map((item, index) => (
          <ArticleCard
            key={index}
            imgUrl={item.ImageLocation != null ? blobToBase64(item.ImageLocation) : ''}
            title={item.Title}
            wrapstyle={{marginRight:10,marginLeft:10,height:200,width:330}}
            imageStyle={{height:120,width:'100%'}}
            // description={<div dangerouslySetInnerHTML={{ __html: `<div>` + item.Context + `</div>` }}></div>}
            id={item.Id}
            
            
          />
        ))}
         </Row> 
         :
         <>
        {datahtml?.map((item, index) => (
          <ArticleCard
            key={index}
            imgUrl={item.ImageLocation != null ? blobToBase64(item.ImageLocation) : ''}
            title={item.Title}
            wrapstyle={{marginRight:10,marginLeft:10,height:200,width:330}}
            imageStyle={{height:120,width:'100%'}}
            // description={<div dangerouslySetInnerHTML={{ __html: `<div>` + item.Context + `</div>` }}></div>}
            id={item.Id}
            
            
          />
        ))
}
        </>
         }
      </S.Wrapper>
    </DashboardCard>
  );
};


// import React,{useState,useEffect} from 'react';
// import { dashboardNews } from '@app/constants/dashboardNews';
// import { DashboardCard } from '../DashboardCard/DashboardCard';
// import * as S from './NewsCard.styles';
// import { useTranslation } from 'react-i18next';
// import { ArticleCard } from 'components/common/ArticleCard/ArticleCard';
// import axios from 'axios';
// import { Config } from '@app/Database/Config';

// export const NewsCard: React.FC = () => {
//   const { t } = useTranslation();

//   return (
//     <DashboardCard title='خبرهای جدید'>
//       <S.Wrapper>
//         {datahtml?.map((item, index) => (
//        <div dangerouslySetInnerHTML={{ __html: `<div>`+item.Context + `</div>` }}></div>
//         ))}
//       </S.Wrapper>
//     </DashboardCard>
//   );
// };
