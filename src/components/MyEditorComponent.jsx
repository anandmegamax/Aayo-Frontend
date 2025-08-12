import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const MyEditorComponent = ({ value, onChange }) => {
  const editorRef = useRef(null);

  return (
    <Editor
      apiKey="b5h8cludq3u4xfjh8xnddaqxl7lov3xta3p51p7hzn4bjcx3" // Optional: use your API key for cloud features
      onInit={(evt, editor) => (editorRef.current = editor)}
      value={value}
      init={{
        directionality: "ltr",
        content_style: "body { direction: ltr; text-align: left; }",
        height: 300,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help",
      }}
      onEditorChange={(newValue) => onChange(newValue)}
    />
  );
};

export default MyEditorComponent;
