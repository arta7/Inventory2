import { convertToRaw, EditorState ,convertFromHTML} from "draft-js";
import { useState } from "react";
import { Editor,ContentState  } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import axios from "axios";
import { Config } from "@app/Database/Config";
import Resizer from "react-image-file-resizer";
const HtmlEditor: React.FC = () => {
    
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [text, setText] = useState();
  const [file, setFile] = useState();
  const [dataUri, setDataUri] = useState('')
  const onEditorStateChange = function (editorState) {
    setEditorState(editorState);
    const { blocks } = convertToRaw(editorState.getCurrentContent());
     let text = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    //  console.log('text1',text);
     setText(text);
  };
  const [Title,SetTitle] = useState('')

 const handleChange=async(e)=> {
  
    console.log(e.target.files);
    var image =  await resizeFile(e.target.files[0])
    console.log('image : ',image)
    setFile((image));
    setDataUri(image)
    setTimeout(() => {
        console.log('datauri',dataUri)
    }, 1200);
  //   fileToDataUri(image)
  // .then(dataUri => {
  //   console.log('datauri',dataUri)
  //   setDataUri(dataUri)
  // })
}


const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      100,
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



  


let AddHtmlData = (_title,_image,_context,_id) => {
  var data = {
   "Title":_title,
    "ImageLocation": _image,
    "Context":_context,
    "Id":_id
  }

  // var headers = {
  //   'Access-Control-Allow-Credentials':true,
  //   "Access-Control-Allow-Origin": "*"
  // }


  
  axios.post(Config.URL +
    Config.Defination.AddHtmlData, data)
    .then((response) => {
      console.log('response data : ', response.data.data)
    })
    .catch((error) => {
      console.log('Error : ', error)
    })
}




  return (
    <div style={{backgroundColor:'white'}}>
            <div style={{  overflow: "auto",height:'230px',margin:'10px',padding:'10px',flexDirection:'row',justifyContent:'space-between',display:'flex' }}>
            <div style={{flexDirection:'row',justifyContent:'space-between',display:'flex'}}>
           <div >
<BaseForm.Item style={{width:'200px'}}  >
<Auth.FormInput
onChange={(e)=>{
handleChange(e)
}}
type='file'
id="uploader"
/>

</BaseForm.Item>
</div>
<img src={file} style={{width:'250px',height:'150px',borderWidth:1,borderColor:'black',marginTop:'5px',marginRight:'5px',marginLeft:'5px'}} id="image"/>

</div>


</div>
<div style={{justifyContent:'center',alignItems:'center',alignSelf:'center',display:'flex'}} >
<BaseForm.Item  style={{width:'200px',justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
<Auth.SubmitButton type="primary" htmlType="submit" 
onClick={()=>{
    if(Title !='' && file != '' && text!='')
    {
      //console.log('datauri : ',dataUri)
      AddHtmlData(Title,file,text,0)
      alert('با موفقیت ثبت شد');
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
        
       <div style={{  overflow: "auto",margin:10,padding:10 }}>
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
