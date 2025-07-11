import React, { useEffect, useState } from "react";
import { Plus, Eye, EyeOff, Clipboard, ClipboardCheck, Trash } from "lucide-react";
import AddSecretModal from "../components/AddSecretModal";
import CryptoJS from "crypto-js";
import axios from "axios";

const SECRET_KEY = "vaultify-secret-key";

const Vault = () => {
  const [secrets, setSecrets] = useState([]);
  const [showPlain, setShowPlain] = useState({});
  const [copiedId, setCopiedId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch secrets from backend
  const fetchSecrets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/secrets");
      setSecrets(res.data);
    } catch (err) {
      console.error("Error fetching secrets", err);
    }
  };

  useEffect(() => {
    fetchSecrets();
  }, []);

  // Decrypt secret
  const decryptSecret = (encrypted) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch {
      return "Error decrypting";
    }
  };

  // Toggle visibility
  const toggleVisibility = (id) => {
    setShowPlain((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Copy to clipboard
  const handleCopy = (id, encrypted) => {
    const decrypted = decryptSecret(encrypted);
    navigator.clipboard.writeText(decrypted);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  // Delete secret
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/secrets/${id}`);
      setSecrets((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Error deleting secret", err);
    }
  };

  // Add new secret
  const handleSaveSecret = async ({ title, encrypted }) => {
    try {
      const res = await axios.post("http://localhost:5000/api/secrets", {
        title,
        encrypted,
      });
      setSecrets([...secrets, res.data]);
    } catch (err) {
      console.error("Error saving secret", err);
    }
  };

  return (
    <div className="text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">🔐 Your Vault</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Add Secret
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <AddSecretModal
          onClose={() => setShowModal(false)}
          onSave={handleSaveSecret}
        />
      )}

      {/* Vault Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {secrets.map((secret) => (
          <div
            key={secret._id}
            className="bg-[#1e2232] p-4 rounded-lg shadow-md flex flex-col"
          >
            <h3 className="text-lg font-semibold mb-2">{secret.name}</h3>
            <p className="text-gray-400 break-all">
              {showPlain[secret._id]
                ? decryptSecret(secret.encrypted)
                : "••••••••••"}
            </p>

            <div className="mt-4 flex justify-between items-center text-sm">
              <button
                onClick={() => toggleVisibility(secret._id)}
                className="text-blue-400 hover:underline flex items-center gap-1"
              >
                {showPlain[secret._id] ? <EyeOff size={16} /> : <Eye size={16} />}
                {showPlain[secret._id] ? "Hide" : "Show"}
              </button>

              <button
                onClick={() => handleCopy(secret._id, secret.encrypted)}
                className="text-green-400 hover:underline flex items-center gap-1"
              >
                {copiedId === secret._id ? (
                  <>
                    <ClipboardCheck size={16} />
                    Copied
                  </>
                ) : (
                  <>
                    <Clipboard size={16} />
                    Copy
                  </>
                )}
              </button>

              <button
                onClick={() => handleDelete(secret._id)}
                className="text-red-400 hover:underline flex items-center gap-1"
              >
                <Trash size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vault;
