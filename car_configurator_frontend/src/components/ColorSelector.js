import React from "react";
import "./ColorSelector.css";

/**
 * PUBLIC_INTERFACE
 * Props: 
 *  - colors: array of {id, name, hex}
 *  - selectedColor: color id
 *  - onColorChange: function(colorId)
 */
function ColorSelector({ colors, selectedColor, onColorChange }) {
  return (
    <div className="color-selector">
      <h3>Color</h3>
      <ul>
        {colors.map((c) => (
          <li key={c.id}>
            <label className="color-choice" aria-label={c.name}>
              <input
                type="radio"
                name="car-color"
                checked={selectedColor === c.id}
                onChange={() => onColorChange(c.id)}
              />
              <span
                className="color-swatch"
                style={{ backgroundColor: c.hex }}
                title={c.name}
                aria-label={c.name}
              />
              <span className="color-label">{c.name}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ColorSelector;
