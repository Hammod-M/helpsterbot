import { useState } from "react";

export const EditableCell = ({
   value: initialValue,
   type = "text",
   onSave,
}: {
   value: any;
   type?: "text" | "textarea";
   onSave: (value: any) => Promise<void>;
}) => {
   const [value, setValue] = useState(initialValue);
   const [isEditing, setIsEditing] = useState(false);

   const handleSave = async () => {
      await onSave(value);
      setIsEditing(false);
   };

   return isEditing ? (
      <div className="editable-cell">
         {type === "textarea" ? (
            <textarea
               value={value}
               onChange={(e) => setValue(e.target.value)}
            />
         ) : (
            <input
               type="text"
               value={value}
               onChange={(e) => setValue(e.target.value)}
            />
         )}
         <button onClick={handleSave}>✓</button>
         <button onClick={() => setIsEditing(false)}>×</button>
      </div>
   ) : (
      <div onClick={() => setIsEditing(true)}>
         {type === "textarea" ? (
            <div className="content-preview">{value}</div>
         ) : (
            value
         )}
      </div>
   );
};
