import React from "react";
import { Eye, EyeOff, Clipboard, ClipboardCheck, Edit, Trash } from "lucide-react";

const VaultCard = ({
  secret,
  showPlain,
  onToggleVisibility,
  onCopy,
  onDelete,
  onEdit,
  isCopied
}) => {
  return (
    <div className="bg-[#1e2232] p-4 rounded-lg shadow-md flex flex-col">
      <h3 className="text-lg font-semibold mb-2 text-white">{secret.name}</h3>

      <p className="text-gray-400 break-all mb-2">
        {showPlain ? secret.decrypted : "••••••••••"}
      </p>

      <div className="flex justify-between items-center text-sm text-white gap-2 mt-2">
        <button
          onClick={() => onToggleVisibility(secret.id)}
          className="flex items-center gap-1 text-blue-400 hover:underline"
        >
          {showPlain ? <EyeOff size={16} /> : <Eye size={16} />}
          {showPlain ? "Hide" : "Show"}
        </button>

        <button
          onClick={() => onCopy(secret.id)}
          className="flex items-center gap-1 text-green-400 hover:underline"
        >
          {isCopied ? <ClipboardCheck size={16} /> : <Clipboard size={16} />}
          {isCopied ? "Copied" : "Copy"}
        </button>

        <button
          onClick={() => onEdit(secret)}
          className="flex items-center gap-1 text-yellow-400 hover:underline"
        >
          <Edit size={16} />
          Edit
        </button>

        <button
          onClick={() => onDelete(secret.id)}
          className="flex items-center gap-1 text-red-400 hover:underline"
        >
          <Trash size={16} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default VaultCard;
