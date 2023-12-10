import React from 'react';
import { DropdownCollapse } from '@app/components/header/Header.styles';
import { useTranslation } from 'react-i18next';
import { LanguagePicker } from '../LanguagePicker/LanguagePicker';
import { NightModeSettings } from '../nightModeSettings/NightModeSettings';
import { ThemePicker } from '../ThemePicker/ThemePicker';
import { Button } from '@app/components/common/buttons/Button/Button';
import { useAppSelector } from '@app/hooks/reduxHooks';
import * as S from './SettingsOverlay.styles';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import UserContext from './../../../../../../NewPage/UserContext'
export const SettingsOverlay: React.FC = ({ ...props }) => {
  const { t } = useTranslation();

  const { isPWASupported, event } = useAppSelector((state) => state.pwa);
  const { userData,setUserData } = React.useContext(UserContext);
  return (
    <S.SettingsOverlayMenu mode="inline" selectable={false} {...props}>
      {/* <DropdownCollapse bordered={false} expandIconPosition="right" ghost defaultActiveKey="themePicker">
        <DropdownCollapse.Panel header={t('header.changeLanguage')} key="languagePicker">
          <LanguagePicker />
        </DropdownCollapse.Panel>
        <DropdownCollapse.Panel header={t('header.changeTheme')} key="themePicker">
          <ThemePicker />
        </DropdownCollapse.Panel>
        <DropdownCollapse.Panel header={t('header.nightMode.title')} key="nightMode">
          <NightModeSettings />
        </DropdownCollapse.Panel>
      </DropdownCollapse>
      {isPWASupported && (
        <S.PwaInstallWrapper>
          <Button block type="primary" onClick={() => event && (event as BeforeInstallPromptEvent).prompt()}>
            {t('common.pwa')}
          </Button>
        </S.PwaInstallWrapper>
      )} */}
        {/* <Auth.SubmitButton type="primary"  style={{ marginBottom:10 }} onClick={() => {

                }}>
                  تغییر رمز عبور
                </Auth.SubmitButton> */}

                
       <Auth.SubmitButton   style={{ backgroundColor:'red',color:'white' }} onClick={() => {
          localStorage.removeItem("UserId")
          localStorage.removeItem("Username")
          console.log('localStorage.getItem("UserId")',localStorage.getItem("UserId"))
          const myNextList = [...userData];
          const artwork = myNextList;
          console.log('login 2',artwork)
          artwork[0].UserId = '';
          artwork[0].Username = '';
          setUserData(myNextList)
        
              }}>
                خروج
              </Auth.SubmitButton>
    </S.SettingsOverlayMenu>
  );
};
