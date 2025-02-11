import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

interface RichTextEditorProps {
   value: string;
   onChange: (content: string) => void;
}

export const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
   return <ReactQuill theme="snow" value={value} onChange={onChange} />;
};
