import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { WithChildrenProps } from '@app/types/generalTypes';
import UserContext from './../../NewPage/UserContext';

const RequireAuth: React.FC<WithChildrenProps> = ({ children }) => {
  const token = useAppSelector((state) => state.auth.token);
  const { userData,setUserData } = React.useContext(UserContext);

  

  
  

  return userData[0].UserId != '' ? <>{children}</> : <Navigate to="/auth/login" replace />;
};

export default RequireAuth;
