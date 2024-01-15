import React,{useState,useEffect} from 'react';
import { Dates } from '@app/constants/Dates';
import { Avatar, Image } from 'antd';
import * as S from './ArticleCard.styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Config } from '@app/Database/Config';
interface ArticleCardProps {
  author?: React.ReactNode;
  imgUrl: string;
  title: string;
  date: number;
  description: string;
  avatar?: string;
  className?: string;
}

  const ShowNews: React.FC<ArticleCardProps> = ({
  imgUrl,
  title,
  date,
  description,
  author,
  avatar,
  className = 'article-card',
}) => {
    const [datahtml, setdatahtml] = useState([])

    let GetHtmlDataWithId = (_Id) => {
        
        var data={
            "Id":_Id
        }
        axios.post(Config.URL +
          Config.Defination.GetHtmlDataWithId,data)
          .then((response) => {
            console.log('datahtml response.data.data : ', response.data.data)
            setdatahtml(response.data.data)
          })
          .catch((error) => {
            console.log('Error : ', error)
          })
      }
    
    
      const blobToBase64 = blob => {
        const atob =  Buffer.from(blob, 'base64').toString('ascii');
        return atob;
        //  
      };
    
      useEffect(() => {
        console.log('start')
        GetHtmlDataWithId(23)
      }, [])

  return (
    <S.Wrapper >

      {  datahtml[0]?.ImageLocation != null && 
      <Image src={blobToBase64(datahtml[0]?.ImageLocation) } alt="img"  preview={true} />
        }
      <S.InfoWrapper>
        <S.InfoHeader >
          <S.Title>{datahtml[0]?.Title}</S.Title>
        </S.InfoHeader>
        <S.Description ><div dangerouslySetInnerHTML={{ __html: `<div>` + datahtml[0]?.Context + `</div>` }}></div></S.Description>
      </S.InfoWrapper>
    </S.Wrapper>
  );
};

export default  ShowNews;
