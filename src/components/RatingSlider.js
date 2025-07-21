import React, { useState } from 'react';

const RatingSlider = ({ 
  min = 0, 
  max = 10, 
  step = 1, 
  initialValue = 5, 
  label = "Rating",
  onChange = () => {},
  className = ""
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={`rating-slider ${className}`}>
      <label className="block text-sm font-medium mb-2">
        {label}: {value}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default RatingSlider;