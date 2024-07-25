// src/components/JSONEditor.js
import React from 'react';
import dynamic from 'next/dynamic';

const CodeMirror = dynamic(
  () => import('@uiw/react-codemirror').then((mod) => mod.default),
  { ssr: false }
);

const JsonEditor = ({ jsonContent, setJsonContent }) => {
  return (
    <CodeMirror
      value={jsonContent}
      height="100%"
      onChange={(value) => setJsonContent(value)}
      className="flex-grow border rounded mb-4"
    />
  );
};

export default JsonEditor;