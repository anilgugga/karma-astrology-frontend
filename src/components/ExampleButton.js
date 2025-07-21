import React from 'react';

export default function ExampleButton() {
  const handleClick = () => {
    alert('Example button clicked!');
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Example Button
    </button>
  );
}
