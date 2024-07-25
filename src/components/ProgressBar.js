import React from 'react';

// ProgressBar component that displays a progress bar and percentage
// Props:
// - progress: A number representing the current progress (0-100)
const ProgressBar = ({ progress }) => (
  <div className="mt-4">
    {/* HTML5 progress element to visually represent the progress */}
    <progress value={progress} max="100" className="w-full"></progress>
    {/* Display the rounded percentage complete */}
    <p>{Math.round(progress)}% complete</p>
  </div>
);

export default ProgressBar;