// src/components/JsonPreview.js
import React from 'react';

// JsonPreview component for displaying JSON content
const JsonPreview = ({ content }) => (
  // Container div with full height and flex column layout
  <div className="h-full flex flex-col">
    {/* Content container with border, rounded corners, padding, and scrollable overflow */}
    <div className="flex-grow border rounded p-4 overflow-auto">
      {/* Pre-formatted text element to preserve JSON formatting */}
      <pre>{content}</pre>
    </div>
  </div>
);

export default JsonPreview;