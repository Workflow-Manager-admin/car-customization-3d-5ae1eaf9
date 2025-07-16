import React from "react";
import "./LivePreviewPanel.css";

/**
 * PUBLIC_INTERFACE
 * Props:
 *  - config: current {color, accessories, model}
 *  - savedConfig: the last saved config (or null)
 */
function LivePreviewPanel({ config, savedConfig }) {
  return (
    <div className="live-preview-panel">
      <div>
        <strong>Live Preview</strong>
        <div>Color: <span>{config.color}</span></div>
        <div>
          Accessories:{" "}
          {config.accessories.length === 0
            ? <span>None</span>
            : config.accessories.map(acc => <span key={acc}>{acc} </span>)}
        </div>
      </div>
      {savedConfig && (
        <div className="preview-saved">
          <strong>Saved:</strong>
          <div>Color: <span>{savedConfig.color}</span></div>
          <div>
            Accessories:{" "}
            {savedConfig.accessories.length === 0
              ? <span>None</span>
              : savedConfig.accessories.map(acc => <span key={acc}>{acc} </span>)}
          </div>
        </div>
      )}
    </div>
  );
}

export default LivePreviewPanel;
