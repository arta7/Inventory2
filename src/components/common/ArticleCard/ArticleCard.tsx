import React from 'react';
import { Dates } from '@app/constants/Dates';
import { Avatar, Image } from 'antd';
import { Tag, ITag } from '../Tag/Tag';
import * as S from './ArticleCard.styles';
import { useNavigate } from 'react-router-dom';
interface ArticleCardProps {
  id:string,
  author?: React.ReactNode;
  imgUrl: string;
  title: string;
  date: number;
  description: string;
  avatar?: string;
  tags?: ITag[];
  wrapstyle:any,
  imageStyle:any,
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  imgUrl,
  title,
  date,
  description,
  author,
  avatar,
  tags,
  wrapstyle,
  imageStyle,
  className = 'article-card',
}) => {

  const navigate = useNavigate();
  return (
    <S.Wrapper className={className} style={wrapstyle} onClick={()=>{
      console.log('id : ', id)
    navigate('/ShowNews',{ state: { Id:id } })
   }}>

      { imgUrl != '' &&
      <Image src={imgUrl} alt="img"  preview={false}  style={imageStyle} />
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
