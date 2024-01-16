import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw, EditorState, convertFromHTML, ContentState } from "draft-js";
import { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html'
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import axios from "axios";
import { Config } from "@app/Database/Config";
import Resizer from "react-image-file-resizer";
import { useLocation,useNavigate } from "react-router-dom";
const HtmlEditor: React.FC = () => {

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [text, setText] = useState();
  const [file, setFile] = useState();
  const [dataUri, setDataUri] = useState('')
  const location = useLocation();
  const navigate = useNavigate();
  const onEditorStateChange = function (editorState) {
    setEditorState(editorState);
    const { blocks } = convertToRaw(editorState.getCurrentContent());
    let text = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    //  console.log('text1',text);
    setText(text);
  };


  const htmltoText = (html) => {

    const contentBlock = convertFromHTML(html);
    const contentState = ContentState.createFromBlockArray(contentBlock);
    const editorState = EditorState.createWithContent(contentState);
    let text = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    setEditorState(editorState)
    setText(text);
  }





  const [Title, SetTitle] = useState('')

  const handleChange = async (e) => {

    console.log(e.target.files);
    var image = await resizeFile(e.target.files[0])
    console.log('image : ', image)
    setFile((image));
    setDataUri(image)
    setTimeout(() => {
      console.log('datauri', dataUri)
    }, 1200);
  }

  const blobToBase64 = blob => {
    const atob = Buffer.from(blob, 'base64').toString('ascii');
    return atob;
    //  
  };

  let GetHtmlDataWithId = (_Id) => {

    var data = {
      "Id": _Id
    }
    axios.post(Config.URL +
      Config.Defination.GetHtmlDataWithId, data)
      .then((response) => {
        console.log('datahtml response.data.data : ', response.data.data)
        setFile(blobToBase64(response.data.data[0].ImageLocation))
        SetTitle(response.data.data[0].Title)
        console.log('htmltoText', htmltoText(response.data.data[0].Context))
        htmltoText(response.data.data[0].Context);
        //  setText(response.data.data[0].Context)
        // setEditorState(response.data.data[0].Context)
      })
      .catch((error) => {
        console.log('Error : ', error)
      })
  }


  useEffect(() => {
    console.log('state : ', location.state)
    if (location.state != null) {
      console.log('state 2 : ', location.state.Id)
      GetHtmlDataWithId(location.state.Id)
    }
  }, [])


  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "PNG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });


  let AddHtmlData = (_title, _image, _context, _id) => {
    var data = {
      "Title": _title,
      "ImageLocation": _image,
      "Context": _context,
      "Id": _id
    }


    axios.post(Config.URL +
      Config.Defination.AddHtmlData, data, {
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
    })
      .then((response) => {
        console.log('response data : ', response.data.data)
        alert('با موفقیت ثبت شد');
        navigate(-1)
        
      })
      .catch((error) => {
        alert('حجم عکس زیاد می باشد لطفا حجم عکس را کم تر کنید. ');
        console.log('Error : ', error)
      })
  }




  return (
    <div style={{ backgroundColor: 'white' }}>
      <div style={{ overflow: "auto", height: '230px', margin: '10px', padding: '10px', flexDirection: 'row', justifyContent: 'space-between', display: 'flex' }}>
        <div style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex' }}>
          <div >
            <BaseForm.Item style={{ width: '200px' }}  >
              { location.state == null &&
                <Auth.FormInput
                  onChange={(e) => {
                    handleChange(e)
                  }}
                  type='file'
                  id="uploader"
                />
              }

            </BaseForm.Item>
            <div>
          <BaseForm.Item style={{ width: '350px' }}  >
              { location.state == null &&
                <Auth.FormInput
                   value={'لطفا حجم عکس از 200 کیلوبایت کمتر باشد.'}
                   disabled={true}
                />
              }

            </BaseForm.Item>
          </div>
          </div>
      
          <img src={file} style={{ width: '300px', height: '190px', borderWidth: 1, borderColor: 'black', marginTop: '5px', marginRight: '5px', marginLeft: '5px' }} id="image" />

        </div>
        


      </div>
      <div style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', display: 'flex' }} >
        <BaseForm.Item style={{ width: '200px', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
          <Auth.SubmitButton type="primary" htmlType="submit"
            onClick={() => {
              if (Title != '' && file != '' && text != '') {
                if (location.state == null)
                  AddHtmlData(Title, file, text, 0)
                else
                  AddHtmlData(Title, file, text, location.state.Id)

              }
              else
                alert('لطفا اطلاعات را کامل پر کنید');

            }}
          >
            ثبت
          </Auth.SubmitButton>
        </BaseForm.Item>
      </div>
      <BaseForm layout="horizontal" >

        <div style={{ overflow: "auto", margin: 10, padding: 10 }}>
          <Auth.FormInput placeholder="عنوان"
            value={Title}
            onChange={(e) => {
              SetTitle(e.target.value)
            }}

          />


        </div>



        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
        />
      </BaseForm>
    </div>
  );
}

export default HtmlEditor;
