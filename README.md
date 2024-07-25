# PDF to JSON Converter with PDF Viewer and JSON Editor

This project is a web application designed to convert PDF files into JSON format. Users can upload a PDF, view its content, convert it to JSON, edit the JSON content, and preview the result.

![image](https://github.com/user-attachments/assets/22ee8184-d2f7-4878-8879-a785735fbfa6)


## Features

- **PDF Upload**: Upload a PDF file for conversion.
- **PDF Viewer**: View the uploaded PDF file.
- **Conversion to JSON**: Convert the PDF content into structured JSON format.
- **JSON Editor**: Edit the converted JSON content using a code editor.
- **JSON Preview**: Preview the JSON content in a formatted view.
- **Progress Indicator**: Track the conversion progress.
- **File Operations**: Save the JSON content to a file, clear the editor, and reset the application.

## Components

### `FileUploader.js`
Handles the file input for PDF upload and reads the file content.

### `PdfViewer.js`
Displays the uploaded PDF using `@react-pdf-viewer/core`.

### `JsonEditor.js`
A code editor for JSON content.

### `JsonPreview.js`
Renders the JSON content in a formatted view.

### `ProgressBar.js`
Displays the progress of the PDF to JSON conversion process.

### `pdfToJsonConverter.js`
Contains utility functions for extracting text from PDF, classifying elements, and generating JSON content.

### `_app.js`
Main entry point for the Next.js application.

### `index.js`
Main page of the application, integrates all components and handles the application logic.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/pdf-to-json-converter.git
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

1. Upload a PDF file using the file input.
2. Click "Convert to JSON" to process the PDF.
3. Edit the resulting JSON in the editor if needed.
4. Use the "Preview JSON" button to see a formatted view.
5. Save the JSON content to a file using the "Save JSON" button.

## License
This project is licensed under the MIT License - see the LICENSE file for details.