import React, { useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";

function Editors({
  getData,
  saveTopics,
  saveTopicsData,
  activeTopicData,
  editorState,
  saveHtmlData,
}) {
  let config = {
    disabled: null,
    readonly: null,
  };

  if (editorState) {
    config = {
      disabled: false,
      readonly: false,
    };
  } else {
    config = {
      disabled: true,
      readonly: true,
    };
  }
  const editor = useRef(null);
  const [activeHtmlData, setActiveHtmlData] = useState("");
  const save = async (id, htmlData) => {
    const data = {
      id: id,
      template: htmlData,
    };

    // console.log("...working", htmlData);
     await saveHtmlData(data);
    // if (res.status === 200) {
    //   // console.log("saved");
    // }
  };
  useEffect(() => {
    
    const timer = setTimeout(() => {
      if(editorState){
        save(activeTopicData._id, activeHtmlData);
      }
      // console.log("after",activeHtmlData);
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeHtmlData]);

  return (
    <>
      <CKEditor
        ref={editor}
        disabled ={editorState ? false : true}
        readOnly ={editorState ? false : true}
        editor={ClassicEditor}
        config={{placeholder: "", removePlugins: ['Title']}}
        data={activeTopicData ? activeTopicData.htmlData : activeHtmlData}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          // console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();

          setActiveHtmlData(data);
        }}
        onBlur={(event, editor) => {
          // console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          // console.log("Focus.", editor);
        }}
      />
    </>
  );
}

export default Editors;
