import { NavLink } from "react-router-dom";
import { Home, Lock, Plus, Settings } from "lucide-react";

const Sidebar = () => {
  const links = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Vault", path: "/vault", icon: <Lock size={18} /> },
    { name: "Add Secret", path: "/add-secret", icon: <Plus size={18} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="w-64 bg-[#151924] text-white min-h-screen p-5 shadow-md">
      <h1 className="text-2xl font-bold mb-8">🔒 Vaultify</h1>

      <nav className="flex flex-col space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-[#1e2232] text-blue-400"
                  : "text-gray-300 hover:bg-[#1e2232]"
              }`
            }
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;


