// src/components/JSONEditor.js
import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import CodeMirror to avoid SSR issues
const CodeMirror = dynamic(
  () => import('@uiw/react-codemirror').then((mod) => mod.default),
  { ssr: false }
);

const JsonEditor = ({ jsonContent, setJsonContent }) => {
  return (
    <div className="h-full flex flex-col">
      {/* Container for the CodeMirror editor */}
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