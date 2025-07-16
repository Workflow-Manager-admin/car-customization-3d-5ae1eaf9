import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Car3DViewer from "./components/Car3DViewer";
import ColorSelector from "./components/ColorSelector";
import AccessorySelector from "./components/AccessorySelector";
import LivePreviewPanel from "./components/LivePreviewPanel";
import "./App.css";

// Colors and accessories (placeholders—can be expanded or fetched from API)
const COLORS = [
  { id: "white", name: "White", hex: "#FFFFFF" },
  { id: "blue", name: "Ocean Blue", hex: "#1e88e5" },
  { id: "grey", name: "Steel Grey", hex: "#cfd8dc" },
  { id: "pink", name: "Hot Pink", hex: "#ff4081" },
  { id: "black", name: "Carbon Black", hex: "#282c34" },
];

const ACCESSORIES = [
  { id: "spoiler", name: "Spoiler", icon: "🪶" },
  { id: "sunroof", name: "Sunroof", icon: "🌞" },
  { id: "alloy_wheels", name: "Alloy Wheels", icon: "⭕" },
  { id: "roof_box", name: "Roof Box", icon: "🧳" },
];

const DEFAULT_CONFIG = {
  color: COLORS[0].id,
  accessories: [],
  model: "sport", // placeholder, could be expanded
};

// PUBLIC_INTERFACE
function App() {
  // State for configuration
  const [carConfig, setCarConfig] = useState(DEFAULT_CONFIG);
  const [savedConfig, setSavedConfig] = useState(null);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    // On mount: check for config in URL (share functionality)
    const params = new URLSearchParams(window.location.search);
    const configString = params.get("config");
    if (configString) {
      try {
        const parsed = JSON.parse(
          decodeURIComponent(atob(configString))
        );
        setCarConfig(parsed);
      } catch (e) {
        // Ignore parsing errors
      }
    }
  }, []);

  // PUBLIC_INTERFACE
  const handleColorChange = (colorId) => {
    setCarConfig((c) => ({ ...c, color: colorId }));
  };
  // PUBLIC_INTERFACE
  const handleAccessoryToggle = (accessoryId) => {
    setCarConfig((c) => ({
      ...c,
      accessories: c.accessories.includes(accessoryId)
        ? c.accessories.filter((a) => a !== accessoryId)
        : [...c.accessories, accessoryId],
    }));
  };

  // Save configuration to localStorage (could later POST to backend)
  // PUBLIC_INTERFACE
  const handleSave = () => {
    setSavedConfig(carConfig);
    window.localStorage.setItem("carConfiguratorConfig", JSON.stringify(carConfig));
  };

  // PUBLIC_INTERFACE
  const handleShare = () => {
    const configString = btoa(encodeURIComponent(JSON.stringify(carConfig)));
    const url = `${window.location.origin}${window.location.pathname}?config=${configString}`;
    setShareUrl(url);
    navigator.clipboard.writeText(url).catch(() => {});
  };

  return (
    <div className="app-root" data-theme="light">
      <NavBar />
      <main className="main-layout">
        <aside className="sidebar left-sidebar" aria-label="Color selection">
          <ColorSelector
            colors={COLORS}
            selectedColor={carConfig.color}
            onColorChange={handleColorChange}
          />
        </aside>
        <section className="central-view">
          <Car3DViewer
            color={carConfig.color}
            accessories={carConfig.accessories}
            model={carConfig.model}
          />
          <div className="actions-row">
            <button className="btn" onClick={handleSave} aria-label="Save configuration">Save</button>
            <button className="btn btn-accent" onClick={handleShare} aria-label="Share configuration">Share</button>
            {shareUrl && (
              <div className="share-confirm">
                <span>Link copied!</span>
                <input type="text" value={shareUrl} readOnly />
              </div>
            )}
          </div>
        </section>
        <aside className="sidebar right-sidebar" aria-label="Accessory selection">
          <AccessorySelector
            accessories={ACCESSORIES}
            selectedAccessories={carConfig.accessories}
            onToggle={handleAccessoryToggle}
          />
        </aside>
      </main>
      <LivePreviewPanel config={carConfig} savedConfig={savedConfig} />
    </div>
  );
}

export default App;
