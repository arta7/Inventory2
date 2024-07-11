import React from 'react';
import {
  CompassOutlined,
  DashboardOutlined,
  FormOutlined,
  HomeOutlined,
  LayoutOutlined,
  LineChartOutlined,
  TableOutlined,
  UserOutlined,
  BlockOutlined,
  HomeFilled,
} from '@ant-design/icons';
import { ReactComponent as NftIcon } from '@app/assets/icons/nft-icon.svg';

export interface SidebarNavigationItem {
  title: string;
  key: string;
  url?: string;
  children?: SidebarNavigationItem[];
  icon?: React.ReactNode;
  showItem:Boolean;
}

export const sidebarNavigation: SidebarNavigationItem[] = [
  // {
  //   title: 'common.nft-dashboard',
  //   key: 'nft-dashboard',
  //   // TODO use path variable
  //   url: '/',
  //   icon: <NftIcon />,
  // },
  {
    title: 'صفحه اصلی',
    key: 'medical-dashboard',
    url: '/',
    icon: <DashboardOutlined />,
    showItem:true
  },
  {
    title: 'اطلاعات پایه',
    key: 'apps',
    icon: <HomeOutlined />,
    showItem:true,
    children: [
      {
        title: 'تعریف کاربر',
        key: 'DefineUser',
        url: '/DefineUsers',
        showItem:true
      },
      {
        title: 'تعریف کالا',
        key: 'DefineProduct',
        url: '/DefineProduct',
        showItem:true
      },
      {
        title: 'تعریف سِت ها',
        key: 'DefineSets',
        url: '/DefineSets',
        showItem:true
      },
      {
        title: 'تعریف بخش ها',
        key: 'DefineParts',
        url: '/DefineParts',
        showItem:true
      },
      {
        title: 'تعریف گروه کالا',
        key: 'DefineGroups',
        url: '/DefineGroups',
        showItem:true
      },
      {
        title: 'تعریف سال مالی',
        key: 'FiscalYears',
        url: '/FiscalYears',
        showItem:true
      },
      {
        title: 'تعریف واحد کالا',
        key: 'DefineUnit',
        url: '/DefineUnit',
        showItem:true
      },
      {
        title: 'تعریف نوع سند',
        key: 'DefineStates',
        url: '/DefineStates',
        showItem:true
      },
      {
        title: 'تعریف گروه کاربری',
        key: 'DefinePost',
        url: '/DefinePost',
        showItem:true
      },
      {
        title: 'تعریف دسترسی ست ابزار',
        key: 'DefineSetsofProducts',
        url: '/DefineSetsofProducts',
        showItem:true
      },
      {
        title: 'تعریف دسترسی گروه ',
        key: 'DefineGroupsofSets',
        url: '/DefineGroupsofSets',
        showItem:true
      },
      {
        title: 'تعریف دسترسی کاربران',
        key: 'DefineUserAccess',
        url: '/DefineUserAccess',
        showItem:true
      },
      {
        title: 'ثبت خبر',
        key: 'NewsList',
        url: '/NewsList',
        showItem:false
      },

    ],
  },
  {
    title: 'مجموعه',
    key: 'auth',
    icon: <UserOutlined />,
    showItem:true,
    children: [
      {
        title: 'تجهیزات پزشکی',
        key: 'SetProduceList',
        url: '/SetProduceList',
        showItem:true
      },
      {
        title: 'تجهیزات CSR',
        key: 'SetsetsGroupsList',
        url: '/SetsetsGroupsList',
        showItem:true
      }
    ],
  },
  {
    title: 'لیست اسناد',
    key: 'auth',
    icon: <UserOutlined />,
    showItem:true,
    children: [
      {
        title: 'لیست اسناد محصولات ',
        key: 'SetProduceList',
        url: '/SetProduceList',
        showItem:true
      },
      {
        title: 'لیست اسناد ست ',
        key: 'SetsetsGroupsList',
        url: '/SetsetsGroupsList',
        showItem:true
      }
    ],
  },
  {
    title: 'دسترسی مدیریت',
    key: 'Dashboard',
    icon: <FormOutlined />,
    showItem:true,
    children: [
      {
        title: 'کاردکس تعدادی',
        key: 'kardex',
        url: '/kardex',
        showItem:true
      },
      {
        title: 'کاردکس ست محصول',
        key: 'kardexSets',
        url: '/kardexSets',
        showItem:true
      },
      {
        title: 'نمودار',
        key: 'charts',
        url: '/charts',
        showItem:true,
        icon: <LineChartOutlined />,
      },
    ],
  },
  
];
