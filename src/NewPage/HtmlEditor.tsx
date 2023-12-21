import { convertToRaw, EditorState ,convertFromHTML} from "draft-js";
import { useState } from "react";
import { Editor,ContentState  } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';

const HtmlEditor: React.FC = () => {
    
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [text, setText] = useState();
  const onEditorStateChange = function (editorState) {
    setEditorState(editorState);
    const { blocks } = convertToRaw(editorState.getCurrentContent());
    // let text = blocks.reduce((acc, item) => {
    //   acc = acc + item.text;
    //   return acc;
    // }, "");
     let text = draftToHtml(convertToRaw(editorState.getCurrentContent()));
     //.getCurrentContent().getPlainText();
     console.log('text1',text);
     //setText(text);
  };
  const [Title,SetTitle] = useState('')


   let ConvertData=(htmlData)=>{
    const blocks = convertFromHTML(htmlData);
setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(blocks.contentBlocks, blocks.entityMap)))
   }

  return (
    <div style={{backgroundColor:'white'}}>
         <BaseForm layout="horizontal" >
       <div style={{  overflow: "auto",margin:10,padding:10 }}>
              <Auth.FormInput placeholder="عنوان"
                value={Title}
                onChange={(e) => {
                    SetTitle(e.target.value)
                }}
                
                />
      </div> 


      <div style={{  overflow: "auto",height:'150px',margin:10,padding:10 }}>

      <BaseForm.Item style={{width:'100px',flexDirection:'row',justifyContent:'space-between'}} >
<Auth.SubmitButton type="primary"
>
  آپلود
</Auth.SubmitButton>

<Auth.FormInput placeholder="عنوان"
                value={Title}
                onChange={(e) => {
                    SetTitle(e.target.value)
                }}
                
                />


</BaseForm.Item>
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
