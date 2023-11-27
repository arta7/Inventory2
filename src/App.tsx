import React,{useEffect, useState} from 'react';
import { ConfigProvider } from 'antd';
import deDe from 'antd/lib/locale/de_DE';
import { Link } from 'react-router-dom';
import enUS from 'antd/lib/locale/en_US';
import GlobalStyle from './styles/GlobalStyle';
import 'typeface-montserrat';
import 'typeface-lato';
import { AppRouter } from './components/router/AppRouter';
import { useLanguage } from './hooks/useLanguage';
import { useAutoNightMode } from './hooks/useAutoNightMode';
import { usePWA } from './hooks/usePWA';
import { useThemeWatcher } from './hooks/useThemeWatcher';
import { useAppSelector } from './hooks/reduxHooks';
import { themeObject } from './styles/themes/themeVariables';
import UserContext from './NewPage/UserContext';
import 'antd/dist/reset.css'
import {setConfig} from 'react-hot-loader';
const App: React.FC = () => {
  const { language } = useLanguage();
  const theme = useAppSelector((state) => state.theme.theme);
  const [userData, setUserData] = useState([
    {
     
        UserId: '',
        Username: '',
        selectedProductId:'',
        selectedSetsId:''
        }]);
  usePWA();

  useAutoNightMode();

  useThemeWatcher();



  let GetData=async()=>{
    var UserId1 = await localStorage.getItem("UserId")
    var Username = await localStorage.getItem("Username")
    console.log('UserId 1 : ',Username)
    if(UserId1 != null && UserId1 != '')
    {
      setUserData([{UserId:UserId1.toString(),
        Username:Username,selectedProductId:'',
        selectedSetsId:''
        }])
    }
   
  }


  useEffect(()=>{
    setConfig({disableHotRenderer: true});
      
    GetData()
   
  },[])

  return (
    <>
      <meta name="theme-color" content={themeObject[theme].primary} dir='rtl'/>
      <UserContext.Provider value={{ userData, setUserData }}>
      <GlobalStyle />
        <AppRouter />
        </UserContext.Provider>
    </>
  );
};

export default App;
