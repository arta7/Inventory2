import React, { useState,useEffect } from 'react';

import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import UserContext from './UserContext';
import { useNavigate } from 'react-router-dom';
import image from "./screen.webp";

 const FirstScreen: React.FC = () => {
  const { userData,setUserData } = React.useContext(UserContext);
  const[Counter,setCounter] = useState(1)
  const navigate = useNavigate();
  useEffect(()=>{

      console.log('User Id ',userData)
      if(userData.length == 0)
      {
          navigate('/auth/login')
      }
      else if(userData[0].UserId == null || userData[0].UserId =='')
      {
        navigate('/auth/login')
      }
      else
      {
        console.log('UserId  : ',userData)
      }


  },[])


 
  return (
   <div style={{backgroundImage:`url(${image})`,backgroundPosition: 'center',
   backgroundSize: 'cover',
   backgroundRepeat: 'no-repeat',
   width: '100%',
   height:'90vh'}}>
    </div>
  );
};
export default FirstScreen;