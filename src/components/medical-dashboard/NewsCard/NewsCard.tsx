import React,{useState,useEffect} from 'react';
import { dashboardNews } from '@app/constants/dashboardNews';
import { DashboardCard } from '../DashboardCard/DashboardCard';
import * as S from './NewsCard.styles';
import { useTranslation } from 'react-i18next';
import { ArticleCard } from 'components/common/ArticleCard/ArticleCard';
import axios from 'axios';
import { Config } from '@app/Database/Config';

export const NewsCard: React.FC = (data) => {
  const { t } = useTranslation();
  const[datahtml,setdatahtml] = useState([])

  let GetHtmlData = () => {
      
    axios.post(Config.URL +
      Config.Defination.GetHtmlData)
      .then((response) => {
        console.log('datahtml',response.data.data)
        setdatahtml(response.data.data)
      })
      .catch((error) => {
        console.log('Error : ', error)
      })
  }


 useEffect(()=>{
  GetHtmlData()
 },[])
  return (
    <DashboardCard title='خبرهای جدید'>
      <S.Wrapper>
        {datahtml?.map((item, index) => (
          <ArticleCard
            key={index}
            // imgUrl={null}
            title={item.Title}
            // date={advice.date}
            description={ <div dangerouslySetInnerHTML={{ __html: `<div>`+item.Context + `</div>` }}></div>}
            // avatar={advice.avatarUrl}
            // author={advice.author}
            // tags={advice.tags}
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
