# PDF to JSON Converter with PDF Viewer and JSON Editor

This project is a web application designed to convert PDF files into JSON format. Users can upload a PDF, view its content, convert it to JSON, edit the JSON content, and preview the result.

![Screenshot 2024-07-24 235538](https://github.com/user-attachments/assets/7499b4b3-492c-4028-898b-92cd7c9727c0)

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
// Handles user input for PDF file selection and reads the file content

### `PdfViewer.js`
// Renders the uploaded PDF file using the @react-pdf-viewer/core library

### `JsonEditor.js`
// Provides an interactive code editor for modifying the JSON content

### `JsonPreview.js`
// Displays a formatted view of the JSON content for easy reading

### `ProgressBar.js`
// Shows the current progress of the PDF to JSON conversion process

### `pdfToJsonConverter.js`
// Contains core logic for PDF text extraction, element classification, and JSON generation

### `_app.js`
// Entry point for the Next.js application, sets up global styles and components

### `index.js`
// Main page component that integrates all other components and manages application state

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