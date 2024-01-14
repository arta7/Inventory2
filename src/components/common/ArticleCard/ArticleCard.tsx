import React from 'react';
import { Dates } from '@app/constants/Dates';
import { Avatar, Image } from 'antd';
import { Tag, ITag } from '../Tag/Tag';
import * as S from './ArticleCard.styles';
import { useNavigate } from 'react-router-dom';
import ShowMoreText from "react-show-more-text";
interface ArticleCardProps {
  author?: React.ReactNode;
  imgUrl: string;
  title: string;
  date: number;
  description: string;
  avatar?: string;
  tags?: ITag[];
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  imgUrl,
  title,
  date,
  description,
  author,
  avatar,
  tags,
  className = 'article-card',
}) => {

  const navigate = useNavigate();
  return (
    <S.Wrapper className={className}>

      { imgUrl != '' &&
      <Image src={imgUrl} alt="img"  preview={false}  onClick={()=>{
        navigate('/HtmlEditor')
       }}/>
        }
      <S.InfoWrapper>
        <S.InfoHeader >
          <S.Title>{title}</S.Title>
        </S.InfoHeader>
        <S.Description >{description}</S.Description>
      </S.InfoWrapper>
    </S.Wrapper>
  );
};
