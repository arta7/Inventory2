import React, { useState, useEffect } from 'react';
import { dashboardNews } from '@app/constants/dashboardNews';
import { DashboardCard } from '../DashboardCard/DashboardCard';
import * as S from './NewsCard.styles';
import { useTranslation } from 'react-i18next';
import { ArticleCard } from 'components/common/ArticleCard/ArticleCard';
import axios from 'axios';
import { Config } from '@app/Database/Config';
import { useNavigate } from 'react-router-dom';
export const NewsCard: React.FC = () => {
  const { t } = useTranslation();
  const [datahtml, setdatahtml] = useState([])
  const navigate = useNavigate();

  let GetHtmlData = () => {

    axios.post(Config.URL +
      Config.Defination.GetHtmlData)
      .then((response) => {
        //console.log('datahtml', 'data:image/png;base64,' + btoa(response.data.data[2].ImageLocation))
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
    GetHtmlData()
  }, [])
  return (
    <DashboardCard title='خبرهای جدید'>

      <S.Wrapper >

        {datahtml?.map((item, index) => (
          <ArticleCard
            key={index}
            imgUrl={item.ImageLocation != null ? blobToBase64(item.ImageLocation) : ''}
            title={item.Title}
            description={<div dangerouslySetInnerHTML={{ __html: `<div>` + item.Context + `</div>` }}></div>}
          />
        ))}
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
