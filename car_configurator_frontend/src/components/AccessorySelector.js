import React from "react";
import "./AccessorySelector.css";

/**
 * PUBLIC_INTERFACE
 * Props:
 *  - accessories: array of {id, name, icon}
 *  - selectedAccessories: array of string IDs
 *  - onToggle: function(accessoryId)
 */
function AccessorySelector({ accessories, selectedAccessories, onToggle }) {
  return (
    <div className="accessory-selector">
      <h3>Accessories</h3>
      <ul>
        {accessories.map((a) => (
          <li key={a.id}>
            <label className="accessory-choice" aria-label={a.name}>
              <input
                type="checkbox"
                checked={selectedAccessories.includes(a.id)}
                onChange={() => onToggle(a.id)}
              />
              <span className="accessory-icon">{a.icon}</span>
              <span className="accessory-label">{a.name}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AccessorySelector;
