import React, { useMemo } from 'react';
import { List } from 'antd';
import { HashLink } from 'react-router-hash-link';
import { useTranslation } from 'react-i18next';
import { CategoryComponents } from '@app/components/header/components/HeaderSearch/HeaderSearch';
import { camelize } from 'utils/utils';
import * as S from './SearchResults.styles';

interface SearchResultsProps {
  results: CategoryComponents[];
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const { t } = useTranslation();

  const resultsList = useMemo(
    () =>
      results.map((result) => (
        <List
          key={result.Id}
          split={false}
          header={t(`common.${camelize(result.category)}`)}
          dataSource={result.components}
          renderItem={(item) => (
       
              <List.Item>
                <S.Text>{item.Title}</S.Text>
              </List.Item>
      
          )}
        />
      )),
    [results, t],
  );

  return <S.SearchResultsWrapper>{resultsList}</S.SearchResultsWrapper>;
};
