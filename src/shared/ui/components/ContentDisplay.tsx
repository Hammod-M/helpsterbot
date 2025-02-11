import React from "react";

interface ContentDisplayProps {
   content: string;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ content }) => {
   return (
      <div
         dangerouslySetInnerHTML={{
            __html: content, // Вставляем полученный HTML-контент
         }}
      />
   );
};

export default ContentDisplay;
