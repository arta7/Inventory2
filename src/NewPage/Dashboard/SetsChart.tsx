import React,{useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { BaseChart, getDefaultTooltipStyles } from '@app/components/common/charts/BaseChart';
import { dashboardPaddings } from '@app/components/medical-dashboard/DashboardCard/DashboardCard';
import { useResponsive } from '@app/hooks/useResponsive';
import { Dates } from '@app/constants/Dates';
import { ChartData, ChartSeriesData } from '@app/interfaces/interfaces';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { themeObject } from '@app/styles/themes/themeVariables';
import { graphic } from 'echarts';
import axios from 'axios';
import { Config } from '@app/Database/Config';
import { Bar,Column } from '@ant-design/plots';


var moment = require('jalali-moment');
interface ActivityChartProps {
  data1: ChartData;
}

export const SetsChart: React.FC<ActivityChartProps> = ({data1}) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const [data] = useState<ChartData>([184, 197, 173, 157, 193, 162, 175]);
  const { t } = useTranslation();
  const [AllData, setAllData] = useState([]);

  const days = Dates.getDays();

  const { isTablet, isDesktop, isMobile } = useResponsive();

  const size = isDesktop ? 'xl' : isTablet ? 'md' : isMobile ? 'xs' : 'xs';

  let GetKardex = (_sets, _fiscal) => {

    var data = {
      "FiscalYearRef": _fiscal,
      "SetsRef": _sets

    }
    
    axios.post(Config.URL +
      Config.Defination.GetKardexSets, data)
      .then((response) => {
        console.log('response data : ', response.data.data)
        var data1 = [];
        for (let i = 0; i < response.data.data.length; i++) {
          data1.push({
            Id: response.data.data[i].Id.toString(), StatesTitle: response.data.data[i].StatesTitle,
            StatesRef: response.data.data[i].StatesRef
            , FiscalYearRef: response.data.data[i].FiscalYearRef,
            FiscalTitle: response.data.data[i].FiscalTitle
            , UserRef: response.data.data[i].UserRef,
            Username: response.data.data[i].Username
            , SecondUserRef: response.data.data[i].SecondUserRef,
            SecondUsername: response.data.data[i].SecondUsername,
            Date: moment(response.data.data[i].Date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'),
            Datevalue: response.data.data[i].Date, InsertValue: response.data.data[i].InsertValue,
            ExitValue: response.data.data[i].ExitValue
          })
        }
        console.log('data1 sets : ', data1)
        setAllData(data1)
      })
      .catch((error) => {
        console.log('Error get data : ', error)
      })


  }



    useEffect(()=>{
      GetKardex(1,1)
    },[])

  // const option = {
  //   color: new graphic.LinearGradient(0, 0, 0, 1, [
  //     {
  //       offset: 0,
  //       color: 'red',
  //     },
  //     {
  //       offset: 1,
  //       color: 'rgba(51, 156, 253, 0.15)',
  //     },
  //   ]),
  //   grid: {
  //     top: dashboardPaddings[size][0],
  //     right: dashboardPaddings[size][1],
  //     bottom: dashboardPaddings[size][1],
  //     left: dashboardPaddings[size][0],
  //     containLabel: true,
  //   },
  //   xAxis: {
  //     type: 'category',
  //     axisTick: {
  //       show: false,
  //     },
  //     axisLine: {
  //       show: false,
  //     },
  //     data: days,
  //     position: 'top',
  //     axisLabel: {
  //       color: themeObject[theme].primary,
  //       fontWeight: 500,
  //       fontSize: 14,
  //     },
  //   },
  //   yAxis: {
  //     type: 'value',
  //     min: 10,
  //     axisLabel: {
  //       formatter: '{value} ',
  //       color: themeObject[theme].textLight,
  //       fontWeight: 500,
  //       fontSize: 14,
  //     },
  //   },
  //   series: [
  //     {
  //       barMaxWidth: 26,
  //       data: AllData,
  //       type: 'bar',
  //       itemStyle: {
  //         borderRadius: 7,
  //       },
  //     },
  //   ],
  //   tooltip: {
  //     ...getDefaultTooltipStyles(themeObject[theme]),
  //     trigger: 'axis',
  //     formatter: (AllData: ChartSeriesData) => {
  //       const currentItem = AllData;
  //         console.log('currenitem : ',currentItem)
  //       return `${currentItem.InsertValue} +  ${currentItem.ExitValue}`;
  //     },
  //   },
  // }


  
    // const data = [
    //   { year: '1991', value: 3 },
    //   { year: '1992', value: 4 },
    //   { year: '1993', value: 3.5 },
    //   { year: '1994', value: 5 },
    //   { year: '1995', value: 4.9 },
    //   { year: '1996', value: 6 },
    //   { year: '1997', value: 7 },
    //   { year: '1998', value: 9 },
    //   { year: '1999', value: 13 },
    // ];
    // const config = {
    //   data:AllData,
    //   height: 400,
    //   xField: 'year',
    //   yField: 'value',
    //   point: {
    //     size: 5,
    //     shape: 'diamond | circule',
    //   },
    //   tooltip: {
    //     formatter: (AllData) => {
    //       return {
    //         name: '',
    //         value: any,
    //       };
    //     },
    //     customContent: (name, AllData) =>
    //       `<div>${AllData?.map((item) => {
    //         return `<div class="tooltip-chart" >
    //             <span class="tooltip-item-name">${item?.Username}</span>
    //             <span class="tooltip-item-value">${item?.ExitValue}</span>
    //           </div>`;
    //       })}</div>`,
    //     showMarkers: boolean,
    //     showContent: boolean,
    //     position: 'right | left',
    //     showCrosshairs: boolean,
    //   },
    // }


    const config = {
      data:AllData,
      yField: 'Id',
      xField: 'StatesTitle',
    
      xAxis: {
        label: {
      
          autoRotate: false,
        },
      },
      legend: {
        position: 'top-left',
      },
      scrollbar: {
        type: 'horizontal',
      },
      minColumnWidth: 10,
      maxColumnWidth: 10,
      seriesField: 'StatesTitle',
    
    }
  

    return <Column  {...config}  />;
  
  
  
  
  //<BaseChart option={option} height="100%" width='100%' />;
};