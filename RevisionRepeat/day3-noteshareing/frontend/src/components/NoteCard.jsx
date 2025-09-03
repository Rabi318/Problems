import { useState } from "react";
import { FaEdit, FaTrash, FaShareAlt } from "react-icons/fa"; // You'll need to install react-icons

const NoteCard = ({ note, onDelete, onEdit, onShare, isOwner }) => {
  const [shareEmail, setShareEmail] = useState("");
  const [isSharing, setIsSharing] = useState(false);

  const handleShareClick = () => {
    setIsSharing(!isSharing);
  };

  const handleShareSubmit = () => {
    onShare(note._id, shareEmail);
    setShareEmail("");
    setIsSharing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        <h3 className="font-semibold text-xl text-gray-900 mb-2">
          {note.title}
        </h3>
        <p className="text-gray-600 mb-4 whitespace-pre-wrap">
          {note.description}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500 border-t border-gray-200 pt-4 mt-auto">
          <p>Created: {new Date(note.createdAt).toLocaleDateString()}</p>
          <div className="flex items-center space-x-3">
            {isOwner && (
              <>
                <button
                  onClick={() => onEdit(note)}
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                  title="Edit Note"
                >
                  <FaEdit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(note._id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  title="Delete Note"
                >
                  <FaTrash className="w-5 h-5" />
                </button>
              </>
            )}
            <button
              onClick={handleShareClick}
              className={`transition-colors ${
                isSharing
                  ? "text-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              title="Share Note"
            >
              <FaShareAlt className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {isSharing && (
        <div className="px-6 pb-6 pt-2 bg-gray-50 border-t border-gray-200 rounded-b-lg">
          <div className="flex items-center space-x-2">
            <input
              type="email"
              placeholder="Enter email to share"
              className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={shareEmail}
              onChange={(e) => setShareEmail(e.target.value)}
            />
            <button
              onClick={handleShareSubmit}
              className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
            >
              Share
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteCard;
