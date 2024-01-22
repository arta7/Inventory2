// import React, { useState,useEffect } from 'react';

// import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
// import UserContext from './UserContext';
// import { useNavigate } from 'react-router-dom';
// import image from "./screen.webp";

//  const FirstScreen: React.FC = () => {
//   const { userData,setUserData } = React.useContext(UserContext);
//   const[Counter,setCounter] = useState(1)
//   const navigate = useNavigate();
//   useEffect(()=>{

//       console.log('User Id ',userData)
//       if(userData.length == 0)
//       {
//           navigate('/auth/login')
//       }
//       else if(userData[0].UserId == null || userData[0].UserId =='')
//       {
//         navigate('/auth/login')
//       }
//       else
//       {
//         console.log('UserId  : ',userData)
//       }


//   },[])


 
//   return (
//    <div style={{backgroundImage:`url(${image})`,backgroundPosition: 'center',
//    backgroundSize: 'cover',
//    backgroundRepeat: 'no-repeat',
//   //  width: '100%',
//   //  height:'90vh'
//   height: '90%', position: 'absolute', left: '0px',bottom:'0px', width: '100%', overflow: 'hidden'
//    }}>
//     </div>
//   );
// };
// export default FirstScreen;

import draftToHtml from 'draftjs-to-html';
import React, { useEffect ,useState} from 'react';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { MapCard } from '@app/components/medical-dashboard/mapCard/MapCard';
import { ScreeningsCard } from '@app/components/medical-dashboard/screeningsCard/ScreeningsCard/ScreeningsCard';
import { ActivityCard } from '@app/components/medical-dashboard/activityCard/ActivityCard';
import { TreatmentCard } from '@app/components/medical-dashboard/treatmentCard/TreatmentCard';
import { CovidCard } from '@app/components/medical-dashboard/covidCard/CovidCard';
import { HealthCard } from '@app/components/medical-dashboard/HealthCard/HealthCard';
import { FavoritesDoctorsCard } from '@app/components/medical-dashboard/favoriteDoctors/FavoriteDoctorsCard/FavoritesDoctorsCard';
import { PatientResultsCard } from '@app/components/medical-dashboard/PatientResultsCard/PatientResultsCard';
import { StatisticsCards } from '@app/components/medical-dashboard/statisticsCards/StatisticsCards';
import { BloodScreeningCard } from '@app/components/medical-dashboard/bloodScreeningCard/BloodScreeningCard/BloodScreeningCard';
import { NewsCard } from '@app/components/medical-dashboard/NewsCard/NewsCard';
import { References } from '@app/components/common/References/References';
import { useResponsive } from '@app/hooks/useResponsive';
import * as S from './DashboardPage.styles';
// import { DataUsers } from '@app/NewPage/DataUsers';
// import UserContext from './../../NewPage/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Config } from '@app/Database/Config';
import UserContext from './UserContext';

const FirstScreen: React.FC = () => {
  const { isTablet, isDesktop } = useResponsive();
  const navigate = useNavigate();
  const { userData,setUserData } = React.useContext(UserContext);
  const { t } = useTranslation();

  let GetCSRSetsProduct=()=>{
 
var data={
  "FiscalYear":userData[0].FiscalYearId.toString(),
  "CollectionId":1
}
 
    axios.post(Config.URL +
      Config.Defination.GetKardexProduct,data)
      .then((response) => {
        console.log('data setsdoduments : ', response.data.data)
      })
      .catch((error) => {
        console.log('Error : ', error)
      })
  }


  useEffect(()=>{
    GetCSRSetsProduct()
  },[])



  const desktopLayout = (
    <Row>
      <S.LeftSideCol xl={8} xxl={7} >
        <Row gutter={[30, 30]}>
          <Col span={24}>
            {/* <Row gutter={[30, 30]}>
              <StatisticsCards />
            </Row> */}
          </Col>

          {/* <Col id="map" span={24}>
            <MapCard />
          </Col> */}

          {/* <Col id="latest-screenings" span={24}>
            <ScreeningsCard />
          </Col> */}

          {/* <Col id="treatment-plan" xl={24}>
            <TreatmentCard />
          </Col> */}

          {/* <Col id="covid" xl={24}>
            <CovidCard />
          </Col> */}

          {/* <Col id="activity" xl={24} xxl={12}>
            <ActivityCard />
          </Col> */}

          {/* <Col id="health" xl={24} xxl={12}>
            <HealthCard />
          </Col> */}

          {/* <Col id="favorite-doctors" xl={24}>
            <FavoritesDoctorsCard />
          </Col> */}

          {/* <Col id="news" span={24}>
            <NewsCard />
          </Col> */}
               <NewsCard />
        </Row>
        <References />
      </S.LeftSideCol>

      <S.RightSideCol xl={16} xxl={17}>
        <S.Space />
        <S.ScrollWrapper id="patient-timeline">
   
          <Col id="activity" xl={24} xxl={12}>
            <ActivityCard  />
          </Col>
        

       
        </S.ScrollWrapper>
      </S.RightSideCol>
    </Row>
  );

  const mobileAndTabletLayout = (
    <Row gutter={[20, 20]}>
      {/* <StatisticsCards /> */}

      {/* {isTablet && (
        <Col id="map" md={24} order={4}>
          <MapCard />
        </Col>
      )}

      <Col id="latest-screenings" xs={24} md={12} order={(isTablet && 5) || 0}>
        <ScreeningsCard />
      </Col>

      <Col id="activity" xs={24} md={12} order={(isTablet && 8) || 0}>
        <ActivityCard />
      </Col>

      <Col id="treatment-plan" xs={24} md={24} order={(isTablet && 10) || 0}>
        <TreatmentCard />
      </Col>

      <Col id="health" xs={24} md={12} order={(isTablet && 9) || 0}>
        <HealthCard />
      </Col>

      <Col id="patient-timeline" xs={24} md={12} order={(isTablet && 11) || 0}>
        <PatientResultsCard />
      </Col>

      <Col id="blood-screening" xs={24} md={12} order={(isTablet && 6) || 0}>
        <BloodScreeningCard />
      </Col>

      <Col id="favorite-doctors" xs={24} md={24} order={(isTablet && 13) || 0}>
        <FavoritesDoctorsCard />
      </Col>

      <Col id="covid" xs={24} md={12} order={(isTablet && 12) || 0}>
        <CovidCard />
      </Col> */}

      <Col id="news" xs={24} md={24} order={(isTablet && 14) || 0}>
        <NewsCard />
      </Col>
    </Row>
  );

  return (
    <>
      <PageTitle>{t('common.medical-dashboard')}</PageTitle>
      {isDesktop ? desktopLayout : mobileAndTabletLayout}
    </>
  );
};

export default FirstScreen;
