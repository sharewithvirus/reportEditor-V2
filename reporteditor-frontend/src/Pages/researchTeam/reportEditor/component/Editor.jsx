import React, { useRef, useState } from "react";
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
  const [subTopicsData, setSubTopicsData] = useState();
  const editor = useRef(null);

  const save = async (id, htmlData) => {
    const data = {
      id: id,
      template: htmlData,
    };

    const res = await saveHtmlData(data);
  };
  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data={activeTopicData ? activeTopicData.htmlData : ""}
        onReady={(editor) => {}}
        onChange={(event, editor) => {
          const data = editor.getData();
          setTimeout(save(activeTopicData._id,data),10000);
        }}
      />
    </>
  );
}

export default Editors;
