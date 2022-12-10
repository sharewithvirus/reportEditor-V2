import React, { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
function Editor({ getData, saveTopics, saveTopicsData, activeTopicData, editorState , saveHtmlData}) {
    const [subTopicsData, setSubTopicsData] = useState();
    const editor = useRef(null);
//   let config = {
//     disable: null,
//     readonly: null,
//   };

//   if (editorShow) {
//     config = {
//       disable: false,
//       readonly: false,
//     };
//   } else {
//     config = {
//       disable: true,
//       readonly: true,
//       InsertMode: "insert_as_html",
//     };
//   }
const save = async (id,htmlData) =>{
  const data = {
    id : id,
    template : htmlData,
  }
  // console.log(data);
  console.log(data);
  setTimeout(async (data) => {
    const res = await saveHtmlData(data);
  }, 3000);
  // console.log(res);
}
  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data={activeTopicData?activeTopicData.htmlData:""}
        onReady={(editor) => {
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          save(activeTopicData._id,data);
        }}
      />
    </>
  );
}

export default Editor;
