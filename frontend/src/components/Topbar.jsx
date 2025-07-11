import { useEffect, useState } from "react";
import { Search, Moon, Sun, User } from "lucide-react";

const Topbar = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
  const saved = localStorage.getItem("theme") || "dark";
  setTheme(saved);
  if (saved === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, []);

const toggleTheme = () => {
  const newTheme = theme === "dark" ? "light" : "dark";
  setTheme(newTheme);
  localStorage.setItem("theme", newTheme);

  if (newTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

  

  return (
    <div className="w-full bg-[#151924] dark:bg-[#0f111a] px-6 py-4 flex justify-between items-center border-b border-gray-700">
      {/* Search bar */}
      <div className="flex items-center bg-[#1e2232] dark:bg-[#1e2232] px-3 py-2 rounded-lg w-full max-w-md">
        <Search className="text-gray-400 mr-2" size={18} />
        <input
          type="text"
          placeholder="Search vaults..."
          className="bg-transparent outline-none text-sm w-full text-gray-200 placeholder:text-gray-400"
        />
      </div>

      {/* Icons on the right */}
      <div className="flex items-center gap-4 ml-4">
        {/* 🌗 Theme toggle */}
        <button
          onClick={toggleTheme}
          className="text-gray-400 hover:text-white transition"
          title="Toggle Theme"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* 👤 User icon */}
        <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-sm text-white">
          <User size={18} />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
