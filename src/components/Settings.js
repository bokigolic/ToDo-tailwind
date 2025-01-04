import React, { useState, useEffect } from "react";

function Settings({ setTheme }) {
  const [isDarkMode, setIsDarkMode] = useState(() => JSON.parse(localStorage.getItem("darkMode")) || false);
  const [font, setFont] = useState(() => localStorage.getItem("font") || "Arial");
  const [headerColor, setHeaderColor] = useState(() => localStorage.getItem("headerColor") || "#000000");
  const [sectionBackgroundColor, setSectionBackgroundColor] = useState(
    () => localStorage.getItem("sectionBackgroundColor") || "#ffffff"
  );
  const [animations, setAnimations] = useState(() => JSON.parse(localStorage.getItem("animations")) || true);
  const [backgroundTransparency, setBackgroundTransparency] = useState(
    () => parseFloat(localStorage.getItem("backgroundTransparency")) || 1
  );

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    setTheme(isDarkMode ? "dark" : "light");
  }, [isDarkMode, setTheme]);

  useEffect(() => {
    localStorage.setItem("font", font);
    document.body.style.fontFamily = font;
  }, [font]);

  useEffect(() => {
    localStorage.setItem("headerColor", headerColor);
    document.documentElement.style.setProperty("--header-color", headerColor);
  }, [headerColor]);

  useEffect(() => {
    localStorage.setItem("sectionBackgroundColor", sectionBackgroundColor);
    document.documentElement.style.setProperty("--section-bg-color", sectionBackgroundColor);
  }, [sectionBackgroundColor]);

  useEffect(() => {
    localStorage.setItem("animations", JSON.stringify(animations));
  }, [animations]);

  useEffect(() => {
    localStorage.setItem("backgroundTransparency", backgroundTransparency);
    document.body.style.backgroundColor = `rgba(255, 255, 255, ${backgroundTransparency})`;
  }, [backgroundTransparency]);

  const resetSetting = (setting) => {
    switch (setting) {
      case "font":
        setFont("Arial");
        break;
      case "headerColor":
        setHeaderColor("#000000");
        break;
      case "sectionBackgroundColor":
        setSectionBackgroundColor("#ffffff");
        break;
      case "animations":
        setAnimations(true);
        break;
      case "backgroundTransparency":
        setBackgroundTransparency(1);
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Settings</h1>

      <div className="grid gap-6">
        {/* Theme Settings */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Theme</h2>
          <label className="flex items-center gap-4 cursor-pointer">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={() => setIsDarkMode(!isDarkMode)}
              className="toggle-checkbox"
            />
            <span className="text-lg font-medium">{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
          </label>
        </div>

        {/* Font Settings */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Font</h2>
          <p className="text-gray-600 mb-4">Choose your preferred font.</p>
          <select
            value={font}
            onChange={(e) => setFont(e.target.value)}
            className="p-2 rounded-lg bg-gray-200 w-full"
          >
            <option value="Arial">Arial</option>
            <option value="Roboto">Roboto</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Verdana">Verdana</option>
          </select>
          <button
            onClick={() => resetSetting("font")}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Reset Font
          </button>
        </div>

        {/* Header Color */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Header Color</h2>
          <input
            type="color"
            value={headerColor}
            onChange={(e) => setHeaderColor(e.target.value)}
            className="w-full h-10 rounded-lg"
          />
          <button
            onClick={() => resetSetting("headerColor")}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Reset Header Color
          </button>
        </div>

        {/* Section Background Color */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Section Background Color</h2>
          <input
            type="color"
            value={sectionBackgroundColor}
            onChange={(e) => setSectionBackgroundColor(e.target.value)}
            className="w-full h-10 rounded-lg"
          />
          <button
            onClick={() => resetSetting("sectionBackgroundColor")}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Reset Section Background
          </button>
        </div>

        {/* Animations */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Animations</h2>
          <label className="flex items-center gap-4 cursor-pointer">
            <input
              type="checkbox"
              checked={animations}
              onChange={() => setAnimations(!animations)}
              className="toggle-checkbox"
            />
            <span className="text-lg font-medium">{animations ? "Enabled" : "Disabled"}</span>
          </label>
          <button
            onClick={() => resetSetting("animations")}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Reset Animations
          </button>
        </div>

        {/* Background Transparency */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Background Transparency</h2>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={backgroundTransparency}
            onChange={(e) => setBackgroundTransparency(e.target.value)}
            className="w-full"
          />
          <button
            onClick={() => resetSetting("backgroundTransparency")}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Reset Transparency
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
