import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to 🔐 Vaultify</h1>
      <p className="text-gray-400 mb-6 max-w-md">
        Your encrypted personal vault for passwords and private data. 
        Quickly add, manage, and secure your secrets with ease.
      </p>

      <Link
        to="/vault"
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Go to Vault
      </Link>
    </div>
  );
};

export default Home;
