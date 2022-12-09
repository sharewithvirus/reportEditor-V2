import React, { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
function Editor({ getData, saveTopics, saveTopicsData, activeTopicData, setActiveTopic , saveHtmlData}) {
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
  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data={activeTopicData?activeTopicData.htmlData:""}
        onReady={(editor) => {
        //   console.log("CKEditor5 React Component is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
          // setSubTopicsData(data);
          // saveTopicsData(data);
          
        }}
      />
    </>
  );
}

export default Editor;
