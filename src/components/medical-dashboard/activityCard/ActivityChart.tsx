import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseChart, getDefaultTooltipStyles } from '@app/components/common/charts/BaseChart';
import { dashboardPaddings } from '@app/components/medical-dashboard/DashboardCard/DashboardCard';
import { useResponsive } from '@app/hooks/useResponsive';
import { Dates } from '@app/constants/Dates';
import { ChartData, ChartSeriesData } from '@app/interfaces/interfaces';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { themeObject } from '@app/styles/themes/themeVariables';
import { graphic } from 'echarts';

interface ActivityChartProps {
  data: ChartData;
  PTitle:any
}

export const ActivityChart: React.FC<ActivityChartProps> = ({ data,PTitle }) => {
  const theme = useAppSelector((state) => state.theme.theme);


    useEffect(()=>{
      console.log('database : ',PTitle)
    },[])

  const { t } = useTranslation();

  const days = PTitle;// Dates.getDays();

  const { isTablet, isDesktop, isMobile } = useResponsive();

  const size = isDesktop ? 'xl' : isTablet ? 'md' : isMobile ? 'xs' : 'xs';

  const option = {
    color: new graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: 'red',
      },
      {
        offset: 1,
        color: 'rgba(51, 156, 253, 0.15)',
      },
    ]),
    grid: {
      top: dashboardPaddings[size][0],
      right: dashboardPaddings[size][1],
      // bottom: dashboardPaddings[size][1],
      left: dashboardPaddings[size][0],
      containLabel: true,
      bottom: 50,
    },
    xAxis: {
      type: 'category',
      axisTick: {
        show: false,
        
      },
      axisLine: {
        show: false,
      },
      data: days,
      position: 'bottom',
      axisLabel: {
        color: themeObject[theme].primary,
        fontWeight: 300,
        fontSize: 12,
        interval: 0,
        rotate: 45,
        
        
      },
    },
    yAxis: {
      type: 'value',
      min: 0,
      axisLabel: {
        formatter: '{value}',
        color: themeObject[theme].textLight,
        fontWeight: 300,
        fontSize: 12,
      },
    },
    series: [
      {
        barMaxWidth: 26,
        data: data,
        type: 'bar',
        itemStyle: {
          borderRadius: 7,
        },
      },
    ],
    tooltip: {
      ...getDefaultTooltipStyles(themeObject[theme]),
      trigger: 'axis',
      formatter: (data: ChartSeriesData) => {
        const currentItem = data[0];

        return `${currentItem.value}`;
      },
    },
  };

  return <BaseChart option={option} height="100%" />;
};
