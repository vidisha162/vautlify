import React, { useEffect, useState } from "react";

const Settings = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">⚙️ Settings</h1>

      <div className="flex items-center justify-between max-w-md bg-[#1e2232] p-4 rounded-lg">
        <span className="text-lg">🌗 Theme</span>
        <button
          onClick={toggleTheme}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Switch to {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
      </div>
    </div>
  );
};

export default Settings;
