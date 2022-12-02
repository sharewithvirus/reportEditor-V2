import React, { useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
function Editor({getData}) {
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
        data=""
        onReady={(editor) => {
        //   console.log("CKEditor5 React Component is ready to use!", editor);
        }}
        onChange={(event, editor) => {
        //   const data = editor.getData();
        // //   console.log({ event, editor, data });
        }}
      />
    </>
  );
}

export default Editor;
