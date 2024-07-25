import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { searchPlugin } from '@react-pdf-viewer/search';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PdfViewer = ({ pdfUrl }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const searchPluginInstance = searchPlugin();

  return (
    <div className="pdf-viewer h-full flex flex-col">
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js`}>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <Viewer
            fileUrl={pdfUrl}
            plugins={[defaultLayoutPluginInstance, searchPluginInstance]}
            defaultScale={1}
          />
        </div>
      </Worker>
    </div>
  );
};

export default PdfViewer;