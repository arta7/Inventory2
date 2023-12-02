import React, { useState } from 'react';
import { NotificationsDropdown } from '../components/notificationsDropdown/NotificationsDropdown';
import { ProfileDropdown } from '../components/profileDropdown/ProfileDropdown/ProfileDropdown';
import { HeaderSearch } from '../components/HeaderSearch/HeaderSearch';
import { SettingsDropdown } from '../components/settingsDropdown/SettingsDropdown';
import { HeaderFullscreen } from '../components/HeaderFullscreen/HeaderFullscreen';
import * as S from '../Header.styles';
import {  Col, Row } from 'antd';

interface DesktopHeaderProps {
  isTwoColumnsLayout: boolean;
}



export const DesktopHeader: React.FC<DesktopHeaderProps> = ({ isTwoColumnsLayout }) => {

  const leftSide = isTwoColumnsLayout ? (
     <S.SearchColumn xl={16} xxl={17}>
      <Row justify="space-between">
      <>
        <Col xl={8} xxl={6}>
          <HeaderSearch />
        </Col>
        </>
       </Row>
     </S.SearchColumn>
  ) : (
    <>
       <Col xl={8} xxl={6}>
 
        <HeaderSearch />
      </Col>
     
    </>
  )

  return (
    <Row justify="space-between" align="middle">
      {leftSide}

      <S.ProfileColumn xl={8} xxl={7} $isTwoColumnsLayout={isTwoColumnsLayout}>
        <Row align="middle" justify="end" >
 
              <Col>
                <SettingsDropdown />
              </Col>
      
        </Row>
      </S.ProfileColumn>
    </Row>
  );
};
