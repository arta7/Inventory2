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
import { DashboardCard } from './DashboardCard';
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
// import { DataUsers } from '@app/NewPage/DataUsers';
// import UserContext from './../../NewPage/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Config } from '@app/Database/Config';
import UserContext from './UserContext';
import * as SS from './SForm.styles';
const FirstScreen: React.FC = () => {
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


  let GetCSRSetsProduct = () => {
    var data = {
      "FiscalYear": userData[0].FiscalYearId.toString(),
      "CollectionId": 2
    }
    axios.post(Config.URL +
      Config.Defination.GetKardexProduct, data)
      .then((response) => {
        console.log('data setsdoduments : ', response.data.data)
        // setCSRData(response.data.data)
        var database = []
        if (response.data.data.length < 5) {
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].ExitValue > 0) {
              database.push({Title:response.data.data[i].ProductTitle,Value:response.data.data[i].ExitValue})
            }
          }
        }
        else {
          for (let i = 0; i < 5; i++) {
            if (response.data.data[i].ExitValue > 0) {
              database.push({Title:response.data.data[i].ProductTitle,Value:response.data.data[i].ExitValue})
            }
          }
        }
        // setPTitle(data)
        setCSRData(database)

        var database1 = []
        if (response.data.data.length < 5) {
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].InsertValue > 0) {
              database1.push({Title:response.data.data[i].ProductTitle,Value:response.data.data[i].InsertValue})
            }
          }
        }
        else {
          for (let i = 0; i < 5; i++) {
            if (response.data.data[i].InsertValue > 0) {
              database1.push({Title:response.data.data[i].ProductTitle,Value:response.data.data[i].InsertValue})
            }
          }
        }
        setCSRDataInsert(database1)
      })
      .catch((error) => {
        console.log('Error : ', error)
      })
  }






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
        var database = []
        if (response.data.data.length < 5) {
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].ExitValue > 0) {
              database.push({Title:response.data.data[i].ProductTitle,Value:response.data.data[i].ExitValue})
            }
          }
        } else {
          for (let i = 0; i < 5; i++) {
            if (response.data.data[i].ExitValue > 0) {
              database.push({Title:response.data.data[i].ProductTitle,Value:response.data.data[i].ExitValue})
            }
          }
        }
        setDoctorData(database)

        var data1 = [];
        var database1 = []
        if (response.data.data.length < 5) {
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].InsertValue > 0) {
              database1.push({Title:response.data.data[i].ProductTitle,Value:response.data.data[i].InsertValue})
            }
          }
        }
        else {
          for (let i = 0; i < 5; i++) {
            if (response.data.data[i].InsertValue > 0) {
              database1.push({Title:response.data.data[i].ProductTitle,Value:response.data.data[i].InsertValue})
            }
          }
        }
        setDoctorDataInsert(database1)
      })
      .catch((error) => {
        console.log('Error : ', error)
      })
  }






  useEffect(() => {
    GetDoctorSetsProduct()
    GetCSRSetsProduct()
  }, [])



  const desktopLayout = (
    <>

      <div style={{ width: '99%', height: '35vh' }} >

        <NewsCard activeMobile={true} />
      </div>
      <References />



      <div style={{
        width: '99%', marginRight: '0.5%',marginLeft:'0.5%', height: '45vh', backgroundColor: 'white',borderRadius:10, flexDirection: 'row'
        , display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', padding: 10
      }}>
                <div style={{ width: '24%', height: '100%', backgroundColor: 'white' }}>
                <DashboardCard title='5 ورودی آخر تجهیزات CSR'>
        {CSRDataInsert.map((item,index)=>
            <div style={styles.divStyle}>
              <SS.Title style={styles.TitleStyle}>{item.Title}</SS.Title>
              <SS.Title style={styles.TitleStyle}>{item.Value}</SS.Title>
            </div>
          )
          }
          </DashboardCard>
        </div>


        <div style={{ width: '24%', height: '100%', backgroundColor: 'white' }}>
        <DashboardCard title='5 خروجی آخر تجهیزات CSR'>
          {CSRData.map((item,index)=>
            <div style={styles.divStyle}>
              <SS.Title style={styles.TitleStyle}>{item.Title}</SS.Title>
              <SS.Title style={styles.TitleStyle}>{item.Value}</SS.Title>
            </div>
          )
          }
          </DashboardCard>
        </div>

        <div style={{ width: '24%', height: '100%', backgroundColor: 'white' }}>
        <DashboardCard title='5 ورودی آخر تجهیزات پزشکی'>
        {DoctorDataInsert.map((item,index)=>
            <div style={styles.divStyle}>
             <SS.Title style={styles.TitleStyle}>{item.Title}</SS.Title>
             <SS.Title style={styles.TitleStyle}>{item.Value}</SS.Title>
            </div>
          )
          }
          </DashboardCard>
        </div>


        <div style={{ width: '24%', height: '100%', backgroundColor: 'white' }}>
        <DashboardCard title='5 خروجی آخر تجهیزات پزشکی'>
        {DoctorData.map((item,index)=>
            <div style={styles.divStyle}>
              <SS.Title style={styles.TitleStyle}>{item.Title}</SS.Title>
              <SS.Title style={styles.TitleStyle}>{item.Value}</SS.Title>
            </div>
          )
          }
          </DashboardCard>
        </div>

   
      </div>


      {/* <Col id="activity" xl={24}  >
            <ActivityCard database={DoctorDataInsert} PTitle={PTitleDoctorInsert} Title='ورودی تجهیزات پزشکی' />
          </Col>

          <Col id="activity" xl={24}>
            <ActivityCard database={DoctorData} PTitle={PTitleDoctor} Title={'خروجی تجهیزات پزشکی'} />
          </Col>



          <Col id="activity" xl={24}  >
            <ActivityCard database={CSRDataInsert} PTitle={PTitleInsert} Title='ورودی CSR' />
          </Col>

          <Col id="activity" xl={24}>
            <ActivityCard database={CSRData} PTitle={PTitle} Title={'خروجی CSR'} />
          </Col> */}




    </>
  );

  const mobileAndTabletLayout = (
    //  <Row gutter={[20, 20]}>


      <>


    <Col id="news" xs={24} md={24} order={(isTablet && 14) || 0}>
      <NewsCard activeMobile={false} />
    </Col>
  
                <Col
                xl={24} md={24} 
                order={(isTablet && 14) || 0}
                style={{marginTop:10,marginBottom:10}}
                >
                <DashboardCard title='5 ورودی آخر تجهیزات CSR'>
        {CSRDataInsert.map((item,index)=>
            <div style={styles.divStyle}>
              <SS.Title style={styles.TitleStyle}>{item.Title}</SS.Title>
              <SS.Title style={styles.TitleStyle}>{item.Value}</SS.Title>
            </div>
          )
          }
          </DashboardCard>
        </Col>


        <Col
                xs={24} md={24} 
                order={(isTablet && 14) || 0}
                style={{marginTop:10,marginBottom:10}}
                >
        <DashboardCard title='5 خروجی آخر تجهیزات CSR'>
          {CSRData.map((item,index)=>
            <div style={styles.divStyle}>
              <SS.Title style={styles.TitleStyle}>{item.Title}</SS.Title>
              <SS.Title style={styles.TitleStyle}>{item.Value}</SS.Title>
            </div>
          )
          }
          </DashboardCard>
        </Col>

        <Col
                xs={24} md={24} 
                order={(isTablet && 14) || 0}
                style={{marginTop:10,marginBottom:10}}
                >
        <DashboardCard title='5 ورودی آخر تجهیزات پزشکی'>
        {DoctorDataInsert.map((item,index)=>
            <div style={styles.divStyle}>
             <SS.Title style={styles.TitleStyle}>{item.Title}</SS.Title>
             <SS.Title style={styles.TitleStyle}>{item.Value}</SS.Title>
            </div>
          )
          }
          </DashboardCard>
        </Col>


        <Col
                xs={24} md={24} 
                order={(isTablet && 14) || 0}
                style={{marginTop:10,marginBottom:10}}
                >
        <DashboardCard title='5 خروجی آخر تجهیزات پزشکی'>
        {DoctorData.map((item,index)=>
            <div style={styles.divStyle}>
              <SS.Title style={styles.TitleStyle}>{item.Title}</SS.Title>
              <SS.Title style={styles.TitleStyle}>{item.Value}</SS.Title>
            </div>
          )
          }
          </DashboardCard>
        </Col>

   
  

    </>
    // {/* </Row> */}
  );

  return (
    <>
      <PageTitle>{t('common.medical-dashboard')}</PageTitle>
      {isDesktop ? desktopLayout : mobileAndTabletLayout}
    </>
  );
};

export default FirstScreen;


const styles = {
  divStyle: {
    flexDirection: 'row', justifyContent: 'space-between', width: '80%'
    , marginRight: '10%', marginLeft: '10%', display: 'flex', height: '10%',marginBottom:5
  },
  TitleStyle:{fontSize:14,color:'black'}
}
