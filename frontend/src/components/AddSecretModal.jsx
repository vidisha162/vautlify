import React, { useState } from "react";
import CryptoJS from "crypto-js";

const SECRET_KEY = "vaultify-secret-key"; // same as in Vault.jsx

const AddSecretModal = ({ onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [secret, setSecret] = useState("");

  const encrypt = (text) => {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const encrypted = encrypt(secret);
    onSave({ title, encrypted });
    onClose();
  };

  // Password strength logic
  const getPasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.length >= 8)
      return "Strong";
    return "Medium";
  };

  const strength = getPasswordStrength(secret);

  const getStrengthColor = () => {
    switch (strength) {
      case "Weak":
        return "text-red-400";
      case "Medium":
        return "text-yellow-400";
      case "Strong":
        return "text-green-400";
      default:
        return "text-gray-300";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-[#1e2232] p-6 rounded-lg w-full max-w-md shadow-lg relative">
        <h2 className="text-lg font-semibold mb-4 text-white">➕ Add a Secret</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter title (e.g. Gmail Password)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="px-3 py-2 rounded bg-[#2a2f45] text-white focus:outline-none"
          />

          <input
            type="text"
            placeholder="Enter secret"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            required
            className="px-3 py-2 rounded bg-[#2a2f45] text-white focus:outline-none"
          />

          {/* Password Strength */}
          {secret && (
            <p className={`text-sm ${getStrengthColor()}`}>
              Strength: {strength}
            </p>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm bg-gray-600 rounded hover:bg-gray-700 text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 rounded hover:bg-blue-700 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSecretModal;
