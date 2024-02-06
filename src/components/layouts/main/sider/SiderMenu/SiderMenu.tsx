import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation ,useNavigate} from 'react-router-dom';
import * as S from './SiderMenu.styles';
import { sidebarNavigation, SidebarNavigationItem } from '../sidebarNavigation';
import { Menu } from 'antd';
import UserContext from './../../../../../NewPage/UserContext';
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
import axios from 'axios';
import { Config } from '@app/Database/Config';
interface SiderContentProps {
  setCollapsed: (isCollapsed: boolean) => void;
}

const sidebarNavFlat = sidebarNavigation.reduce(
  (result: SidebarNavigationItem[], current) =>
    result.concat(current.children && current.children.length > 0 ? current.children : current),
  [],
);
export interface SidebarNavigationItem {
  title: string;
  key: string;
  url?: string;
  children?: SidebarNavigationItem[];
  icon?: React.ReactNode;
  showItem:Boolean;
}

const SiderMenu: React.FC<SiderContentProps> = ({ setCollapsed }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [Sidebar,setSidebar] = useState([{
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
        title: 'تعریف سال مالی',
        key: 'FiscalYears',
        url: '/FiscalYears',
        showItem:false
      },
      {
        title: 'تعریف واحد تجهیزات پزشکی',
        key: 'DefineUnit',
        url: '/DefineUnit',
        showItem:false
      },
      {
        title: 'تعریف تجهیزات پزشکی',
        key: 'DefineProduct',
        url: '/DefineProduct',
        showItem:false
      },
      {
        title: 'تعریف سِت ها',
        key: 'DefineSets',
        url: '/DefineSets',
        showItem:false
      },
      {
        title: 'تعریف بخش ها',
        key: 'DefineParts',
        url: '/DefineParts',
        showItem:false
      },
      {
        title: 'تعریف گروه جراحی',
        key: 'DefineGroups',
        url: '/DefineGroups',
        showItem:false
      },
      {
        title: 'تعریف دسترسی ست ابزار',
        key: 'DefineSetsofProducts',
        url: '/DefineSetsofProducts',
        showItem:false
      },
      {
        title: 'ایجاد گروه جراحی',
        key: 'DefineGroupsofSets',
        url: '/DefineGroupsofSets',
        showItem:false
      },
     
      {
        title: 'تعریف نوع سند',
        key: 'DefineStates',
        url: '/DefineStates',
        showItem:false
      },
      {
        title: 'تعریف کاربر',
        key: 'DefineUser',
        url: '/DefineUsers',
        showItem:false
      },
      {
        title: 'تعریف گروه کاربری',
        key: 'DefinePost',
        url: '/DefinePost',
        showItem:false
      },
    
      {
        title: 'تعریف دسترسی کاربران',
        key: 'DefineUserAccess',
        url: '/DefineUserAccess',
        showItem:false
      },
      {
        title: 'تعریف وبلاگ',
        key: 'NewsList',
        url: '/NewsList',
        showItem:false
      },

    ],
  },
  {
     title: 'تجهیزات پزشکی',
    key: 'DoctorsAccess',
    icon: <UserOutlined />,
    showItem:true,
    children: [
      {
        title: 'لیست ابزار',
        key: 'SetProduceList',
        url: '/SetProduceList',
        showItem:false
      },
      {
        title: 'لیست ست ابزار',
        key: 'SetsetsGroupsList',
        url: '/SetsetsGroupsList',
        showItem:false
      },
  
      {
        title: 'نمودار',
        key: 'charts',
        url: '/charts',
        showItem:false,
        icon: <LineChartOutlined />
      }
    ],
  },
    {
     title: 'تجهیزات CSR',
    key: 'CSR',
    icon: <UserOutlined />,
    showItem:true,
    children: [
      {
        title: 'لیست ابزار',
        key: 'SetProduceList2',
        url: '/SetProduceList2',
        showItem:false
      },
      {
        title: 'لیست ست ابزار',
        key: 'SetsetsGroupsList2',
        url: '/SetsetsGroupsList2',
        showItem:false
      },
   
      {
        title: 'نمودار',
        key: 'charts',
        url: '/charts',
        showItem:false,
        icon: <LineChartOutlined />
      }
    ],
  },
  {
    title: 'گزارشات',
   key: 'Reports',
   icon: <UserOutlined />,
   showItem:true,
   children: [
     {
       title: 'گزارش CSR',
       key: 'CSRReports',
       url: '/CSRReports',
       showItem:false
     },
     {
       title: 'گزارش تجهیزات پزشکی',
       key: 'DoctorReports',
       url: '/DoctorReports',
       showItem:false
     },
     {
       title: 'گزارش دسترسی ست ابزار',
       key: 'DefineSetsofProductsReport',
       url: '/DefineSetsofProductsReport',
       showItem:false
     },
     {
      title: ' کاردکس ابزار  پزشکی' ,
      key: 'kardex',
      url: '/kardex',
      showItem:false
    },
    {
      title: 'کاردکس ست ابزار  پزشکی',
      key: 'kardexSets',
      url: '/kardexSets',
      showItem:false
    },
    {
      title: 'کاردکس ابزار CSR ',
      key: 'kardex2',
      url: '/kardex2',
      showItem:false
    },
    {
      title: 'کاردکس ست ابزار CSR',
      key: 'kardexSets2',
      url: '/kardexSets2',
      showItem:false
    },
   ],
 },
 {
  title: 'متفرقه',
 key: 'Other',
 icon: <UserOutlined />,
 showItem:true,
 children: [
   {
     title: 'وبلاگ',
     key: 'Weblog',
     url: '/Weblog',
     showItem:false
   },
 ],
},

  // {
  //   title: 'لیست اسناد',
  //   key: 'auth',
  //   icon: <UserOutlined />,
  //   showItem:true,
  //   children: [
  //     {
  //       title: 'لیست اسناد محصولات ',
  //       key: 'SetProduceList',
  //       url: '/SetProduceList',
  //       showItem:false
  //     },
  //     {
  //       title: 'لیست اسناد ست ',
  //       key: 'SetsetsGroupsList',
  //       url: '/SetsetsGroupsList',
  //       showItem:false
  //     }
  //   ],
  // },
  // {
  //   title: 'دسترسی مدیریت',
  //   key: 'Dashboard',
  //   icon: <FormOutlined />,
  //   showItem:true,
  //   children: [
  //     {
  //       title: 'کاردکس تعدادی',
  //       key: 'kardex',
  //       url: '/kardex',
  //       showItem:false
  //     },
  //     {
  //       title: 'کاردکس ست محصول',
  //       key: 'kardexSets',
  //       url: '/kardexSets',
  //       showItem:false
  //     },
  //     {
  //       title: 'نمودار',
  //       key: 'charts',
  //       url: '/charts',
  //       showItem:false,
  //       icon: <LineChartOutlined />
  //     }
  //   ]
    // }
  ]
    );
  const { userData,setUserData } = React.useContext(UserContext);
  const currentMenuItem = sidebarNavFlat.find(({ url }) => url === location.pathname);
  const defaultSelectedKeys = currentMenuItem ? [currentMenuItem.key] : [];

      
    const GetUserAccessParts=()=>{
      var data ={
        "Username": userData[0].Username.toString()
      }
      axios.post(Config.URL +
        Config.Defination.GetUserAccessParts,data)
        .then((response) => {
          console.log('response data user access parts : ', response.data.data)
        const myNextList = [...Sidebar];
         const sidedata = myNextList;
          for (let i = 0; i < response.data.data.length; i++) {
            
             for(let j=0;j<Sidebar.length;j++)
             {
                  if(Sidebar[j].children?.length >0)
                  {
                      for(let k=0;k<Sidebar[j].children?.length;k++)
                      {
                        if(Sidebar[j].children[k].key == response.data.data[i].Code)
                        {
                        
                           sidedata[j].children[k].showItem = true;
                          
                        }
                      }
                  }
                  else
                  {
                    if(Sidebar[j].key == response.data.data[i].Code)
                    {
                      console.log('sidedata[j].children[k].showItem :',j,k,response.data.data[i].Code,Sidebar[j].key,Sidebar[j].showItem)
                      // const myNextList = [...Sidebar];
                      // const sidedata = myNextList;
                      sidedata[j].showItem = true;
                      
                    }
                  }
             }
             setSidebar(myNextList);

          }
         
        })
        .catch((error) => {
          console.log('Error : ', error)
        })
    }


    useEffect(()=>{
      GetUserAccessParts()
    },[])


  const openedSubmenu = sidebarNavigation.find(({ children }) =>
    children?.some(({ url }) => url === location.pathname),
  );
  const defaultOpenKeys = openedSubmenu ? [openedSubmenu.key] : [];

  return (
    <S.Menu
      mode="inline"
      defaultSelectedKeys={defaultSelectedKeys}
      defaultOpenKeys={defaultOpenKeys}
      onClick={() => setCollapsed(true)}
    >
      {Sidebar.map((nav) =>
        nav.children && nav.children.length > 0 ? (
          nav.showItem &&
          <Menu.SubMenu
            key={nav.key}
            title={t(nav.title)}
            icon={nav.icon}
            onTitleClick={() => setCollapsed(false)}
            popupClassName="d-none"
          >
            {nav.children.map((childNav) => (
               childNav.showItem &&
              <Menu.Item key={childNav.key} title="" onClick={()=>{
                const myNextList = [...userData];
                const artwork = myNextList;
                console.log('artwork change selected product Id : ',artwork)
                artwork[0].selectedProductId = '';
                artwork[0].selectedSetsId = '';
                setUserData(myNextList);
              }}>
                <Link to={childNav.url || ''}>{t(childNav.title)}</Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          nav.showItem &&
          <Menu.Item key={nav.key} title="" icon={nav.icon} onClick={()=>{
            console.log('test')
          }}>
            <Link to={nav.url || ''}>{t(nav.title)}</Link>
          </Menu.Item>
        ),
      )}
    </S.Menu>
  );
};

export default SiderMenu;
