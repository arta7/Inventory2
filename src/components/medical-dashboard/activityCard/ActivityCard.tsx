import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../components/common/Card/Card';
import { ActivityChart } from './ActivityChart';
import { ChartData } from 'interfaces/interfaces';
import styled from 'styled-components';

export const ActivityCard: React.FC = ({ database,PTitle,Title }) => {
  // const [data] = useState<ChartData>([1840, 1927, 1793, 1757, 1934, 1620, 1754]);

  const { t } = useTranslation();

  return (
    <ActivityCardStyled id="activity" title={Title} padding={0}>
      <ActivityChart data={database} PTitle={PTitle} />
    </ActivityCardStyled>
  );
};

const ActivityCardStyled = styled(Card)`
  height: 100%;
`;
