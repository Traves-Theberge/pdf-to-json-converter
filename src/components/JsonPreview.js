// src/components/JsonPreview.js
import React from 'react';

const JsonPreview = ({ content }) => (
  <div className="mt-4">
    <h2 className="text-xl font-bold mb-2">JSON Preview</h2>
    <div className="border p-4 overflow-auto">
      <pre>{content}</pre>
    </div>
  </div>
);

export default JsonPreview;