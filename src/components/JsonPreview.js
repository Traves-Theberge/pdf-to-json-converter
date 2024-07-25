// src/components/JsonPreview.js
import React from 'react';

const JsonPreview = ({ content }) => (
  <div className="h-full flex flex-col">
    <div className="flex-grow border rounded p-4 overflow-auto">
      <pre>{content}</pre>
    </div>
  </div>
);

export default JsonPreview;