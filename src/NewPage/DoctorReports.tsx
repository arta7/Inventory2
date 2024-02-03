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
import React, { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Config } from '@app/Database/Config';
import UserContext from './UserContext';

const DoctorReports: React.FC = () => {
  const { isTablet, isDesktop } = useResponsive();
  const navigate = useNavigate();
  const { userData, setUserData } = React.useContext(UserContext);
  const { t } = useTranslation();
  const [CSRData, setCSRData] = useState([])
  const [PTitle, setPTitle] = useState([])

  const [CSRDataInsert, setCSRDataInsert] = useState([])
  const [PTitleInsert, setPTitleInsert] = useState([])



  const [DoctorData, setDoctorData] = useState([])
  const [PTitleDoctor, setPTitleDoctor] = useState([])

  const [DoctorDataInsert, setDoctorDataInsert] = useState([])
  const [PTitleDoctorInsert, setPTitleDoctorInsert] = useState([])


  let GetDoctorSetsProduct = () => {
    var data = {
      "FiscalYear": userData[0].FiscalYearId.toString(),
      "CollectionId": 1
    }
    axios.post(Config.URL +
      Config.Defination.GetKardexProduct, data)
      .then((response) => {
        console.log('data setsdoduments : ', response.data.data)
        // setCSRData(response.data.data)
        var data = [];
        var database = []
        for (let i = 0; i < response.data.data.length; i++) {
          if (response.data.data[i].ExitValue > 0) {
            data.push(response.data.data[i].ProductTitle)
            database.push(response.data.data[i].ExitValue)
          }
        }
        setPTitleDoctor(data)
        setDoctorData(database)

        var data1 = [];
        var database1 = []
        for (let i = 0; i < response.data.data.length; i++) {
          if (response.data.data[i].InsertValue > 0) {
            data1.push(response.data.data[i].ProductTitle)
            database1.push(response.data.data[i].InsertValue)
          }
        }
        setPTitleDoctorInsert(data1)
        setDoctorDataInsert(database1)
      })
      .catch((error) => {
        console.log('Error : ', error)
      })
  }

  useEffect(() => {
     GetDoctorSetsProduct()
  }, [])



  const desktopLayout = (
    <>



      <S.RightSideCol >
        <S.Space />
        <S.ScrollWrapper id="patient-timeline">


          <Col id="activity" xl={24}  >
          <ActivityCard database={DoctorDataInsert} PTitle={PTitleDoctorInsert} Title='ورودی تجهیزات پزشکی' />
          </Col>

          <Col id="activity" xl={24}>
          <ActivityCard database={DoctorData} PTitle={PTitleDoctor} Title={'خروجی تجهیزات پزشکی'} />
          </Col>





        </S.ScrollWrapper>
      </S.RightSideCol>
    </>
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


      <Col id="activity" xs={24} md={12} order={(isTablet && 8) || 0}>
      <ActivityCard database={DoctorDataInsert} PTitle={PTitleDoctorInsert} Title='ورودی تجهیزات پزشکی' />
      </Col>

      <Col id="activity" xs={24} md={12} order={(isTablet && 8) || 0}>
      <ActivityCard database={DoctorData} PTitle={PTitleDoctor} Title={'خروجی تجهیزات پزشکی'} />
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

export default DoctorReports;
