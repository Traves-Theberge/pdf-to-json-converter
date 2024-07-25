import React, { useState } from 'react';
import { toast } from 'react-toastify';

const FileUploader = ({ onPdfUpload, fileInputRef }) => {
  const [isDragging, setIsDragging] = useState(false);

  // Handle file upload
  const handleFile = (file) => {
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Call the onPdfUpload callback with file data and name
        onPdfUpload(e.target.result, file.name.replace('.pdf', '.json'));
        toast.success('PDF file uploaded successfully!', { autoClose: 5000 });
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('Please upload a valid PDF file', { autoClose: 5000 });
    }
  };

  // Handle drag and drop events
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed p-4 rounded-lg ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
    >
      {/* Hidden file input */}
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
        id="fileInput"
      />
      {/* Custom upload button */}
      <label
        htmlFor="fileInput"
        className="cursor-pointer text-blue-500 hover:text-blue-700"
      >
        Click to upload or drag and drop a PDF file here
      </label>
    </div>
  );
};

export default FileUploader;