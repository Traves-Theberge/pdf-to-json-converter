// src/components/JSONEditor.js
import React from 'react';
import dynamic from 'next/dynamic';

const CodeMirror = dynamic(
  () => import('@uiw/react-codemirror').then((mod) => mod.default),
  { ssr: false }
);

const JsonEditor = ({ jsonContent, setJsonContent }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow border rounded overflow-auto">
        <CodeMirror
          value={jsonContent}
          height="100%"
          onChange={(value) => setJsonContent(value)}
          className="h-full"
        />
      </div>
    </div>
  );
}

export default JsonEditor;