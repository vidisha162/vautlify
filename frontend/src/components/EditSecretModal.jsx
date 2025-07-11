import React, { useState } from "react";
import CryptoJS from "crypto-js";

const SECRET_KEY = "vaultify-secret-key";

const EditSecretModal = ({ secret, onClose, onUpdate }) => {
  const [title, setTitle] = useState(secret.name);
  const [value, setValue] = useState("");

  const handleUpdate = () => {
    const encrypted = CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
    onUpdate({ ...secret, name: title, encrypted });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#121826] p-6 rounded-lg w-[90%] max-w-md">
        <h2 className="text-white text-xl font-bold mb-4">✏️ Edit Secret</h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 mb-4 rounded bg-[#1e2232] text-white outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="New Secret Value"
          className="w-full p-2 mb-4 rounded bg-[#1e2232] text-white outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSecretModal;
