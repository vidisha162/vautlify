import { Routes, Route } from "react-router-dom";
import Slidebar from "./components/Slidebar";
import Topbar from "./components/Topbar";
import Vault from "./pages/Vault";
import Settings from "./pages/Settings";  

function App() {
  return (
    <div className="flex bg-[#0f111a] text-white min-h-screen">
      <Slidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />

        {/* 🧠 Put Routes inside content layout */}
        <Routes>
          <Route path="/" element={<Vault />} />         {/* Default route */}
          <Route path="/vault" element={<Vault />} />    {/* Optional */}
          <Route path="*" element={<div>404 Not Found</div>} /> {/* Optional fallback */}
          <Route path="/settings" element={<Settings />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;

