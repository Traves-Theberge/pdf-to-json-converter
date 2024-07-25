// src/pages/index.js
"use client";

import { useState, useRef } from 'react';
import PdfViewer from '../components/PdfViewer';
import JsonEditor from '../components/JsonEditor';
import FileUploader from '../components/FileUploader';
import ProgressBar from '../components/ProgressBar';
import JsonPreview from '../components/JsonPreview';
import { convertPdfToJson } from '../utils/pdfToJsonConverter';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';

const HomePage = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileName, setPdfFileName] = useState('');
  const [jsonContent, setJsonContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef(null);

  const handlePdfUpload = (file, fileName) => {
    setPdfFile(file);
    setPdfFileName(fileName);
  };

  const handleConvert = async () => {
    if (!pdfFile) {
      toast.error('Please upload a PDF file before converting.', { autoClose: 5000 });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const content = await convertPdfToJson(pdfFile, setProgress);
      setJsonContent(content);
      setShowPreview(false);
      toast.success('PDF successfully converted to JSON!', { autoClose: 5000 });
    } catch (error) {
      console.error('Error processing PDF:', error);
      toast.error(error.message || 'An error occurred while processing the PDF. Please try again.', { autoClose: 5000 });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveJson = () => {
    const blob = new Blob([jsonContent], { type: 'application/json' });
    saveAs(blob, pdfFileName.replace('.pdf', '.json'));
    toast.success('JSON file saved successfully!', { autoClose: 5000 });
  };

  const handleTogglePreview = () => {
    setShowPreview((prev) => !prev);
  };

  const handleClearEditor = () => {
    setJsonContent('');
    toast.info('JSON editor cleared.', { autoClose: 5000 });
  };

  const handleClearPdf = () => {
    setPdfFile(null);
    setPdfFileName('');
    setJsonContent('');
    setShowPreview(false);
    setProgress(0);
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.dismiss();
    toast.info('PDF and JSON content cleared.', { autoClose: 5000 });
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          <FileUploader onPdfUpload={handlePdfUpload} fileInputRef={fileInputRef} />
          <button
            onClick={handleClearPdf}
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded"
            disabled={!pdfFile && !jsonContent}
          >
            Clear PDF
          </button>
        </div>
        <div>
          <button
            onClick={handleConvert}
            className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
            disabled={!pdfFile || isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Convert to JSON'}
          </button>
          <button
            onClick={handleTogglePreview}
            className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded"
            disabled={!jsonContent}
          >
            {showPreview ? 'Hide Preview' : 'Preview JSON'}
          </button>
          <button
            onClick={handleSaveJson}
            className="mr-2 px-4 py-2 bg-green-500 text-white rounded"
            disabled={!jsonContent}
          >
            Save JSON
          </button>
          <button
            onClick={handleClearEditor}
            className="px-4 py-2 bg-red-500 text-white rounded"
            disabled={!jsonContent}
          >
            Clear Editor
          </button>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-2/5 p-4 overflow-hidden">
          {pdfFile && <PdfViewer pdfUrl={pdfFile} />}
          {isProcessing && <ProgressBar progress={progress} />}
        </div>
        <div className="w-3/5 p-4 flex flex-col overflow-hidden">
          {showPreview ? (
            <div className="flex-1 overflow-auto">
              <JsonPreview content={jsonContent} />
            </div>
          ) : (
            <div className="flex-1 overflow-hidden">
              <JsonEditor jsonContent={jsonContent} setJsonContent={setJsonContent} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;