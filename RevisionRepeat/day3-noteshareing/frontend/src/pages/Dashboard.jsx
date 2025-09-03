import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import NoteModal from "../components/NoteModal";

const Dashboard = () => {
  const [myNotes, setMyNotes] = useState([]);
  const [sharedNotes, setSharedNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [viewMode, setViewMode] = useState("myNotes");
  const [searchTerm, setSearchTerm] = useState(""); // Fetch My Notes

  const fetchMyNotes = async () => {
    try {
      const res = await api.get("/notes");
      setMyNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  }; // Fetch Shared Notes

  const fetchSharedNotes = async () => {
    try {
      const res = await api.get("/notes/shared");
      setSharedNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  }; // Create Note

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/notes", { title, description });
      setTitle("");
      setDescription("");
      fetchMyNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const refreshNotes = () => {
    if (viewMode === "myNotes") {
      fetchMyNotes();
    } else {
      fetchSharedNotes();
    }
  }; // Delete Note

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      refreshNotes();
    } catch (err) {
      console.error(err);
    }
  }; // Save Edit

  const handleEditSave = async (updatedNote) => {
    try {
      await api.put(`/notes/${updatedNote._id}`, {
        title: updatedNote.title,
        description: updatedNote.description,
      });
      setEditingNote(null);
      refreshNotes();
    } catch (err) {
      console.error(err);
    }
  }; // Share Note

  const handleShare = async (id, email) => {
    try {
      await api.post(`/notes/${id}/share`, { email });
      alert("Note shared successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to share note");
    }
  };

  useEffect(() => {
    fetchMyNotes();
    fetchSharedNotes();
  }, []); // Filter notes based on search term

  const filteredNotes =
    viewMode === "myNotes"
      ? myNotes.filter((note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : sharedNotes.filter((note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />     {" "}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
               {" "}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                   {" "}
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4 md:mb-0">
                        My Notes Dashboard          {" "}
          </h1>
                   {" "}
          <div className="flex items-center space-x-4">
                       {" "}
            <div className="relative w-full md:w-64">
                           {" "}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                               {" "}
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                                   {" "}
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                                 {" "}
                </svg>
                             {" "}
              </div>
                           {" "}
              <input
                type="text"
                placeholder="Search notes by title..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
                         {" "}
            </div>
                       {" "}
            <div className="flex rounded-md shadow-sm">
                           {" "}
              <button
                onClick={() => setViewMode("myNotes")}
                className={`relative inline-flex items-center px-4 py-2 rounded-l-md text-sm font-medium ${
                  viewMode === "myNotes"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                } focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
              >
                                My Notes              {" "}
              </button>
                           {" "}
              <button
                onClick={() => setViewMode("shared")}
                className={`relative -ml-px inline-flex items-center px-4 py-2 rounded-r-md text-sm font-medium ${
                  viewMode === "shared"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                } focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
              >
                                Shared with Me              {" "}
              </button>
                         {" "}
            </div>
                     {" "}
          </div>
                 {" "}
        </div>
                {/* Create Note Form */}       {" "}
        {viewMode === "myNotes" && (
          <div className="mb-8">
                       {" "}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                           {" "}
              <form onSubmit={handleCreate} className="p-6">
                               {" "}
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Create New Note
                </h3>
                               {" "}
                <div className="space-y-4">
                                   {" "}
                  <div>
                                       {" "}
                    <label htmlFor="title" className="sr-only">
                      Title
                    </label>
                                       {" "}
                    <input
                      id="title"
                      type="text"
                      placeholder="Note Title"
                      className="w-full p-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                                     {" "}
                  </div>
                                   {" "}
                  <div>
                                       {" "}
                    <label htmlFor="description" className="sr-only">
                      Description
                    </label>
                                       {" "}
                    <textarea
                      id="description"
                      placeholder="Note Description"
                      rows="4"
                      className="w-full p-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                                     {" "}
                  </div>
                                 {" "}
                </div>
                               {" "}
                <div className="mt-4 text-right">
                                   {" "}
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                                        Add Note                  {" "}
                  </button>
                                 {" "}
                </div>
                             {" "}
              </form>
                         {" "}
            </div>
                     {" "}
          </div>
        )}
                {/* Notes List Section */}       {" "}
        <div className="pb-12">
                   {" "}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        {viewMode === "myNotes" ? "My Notes" : "Shared Notes"} 
                   {" "}
          </h2>
                   {" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                       {" "}
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onDelete={handleDelete}
                  onEdit={setEditingNote}
                  onShare={handleShare}
                  isOwner={viewMode === "myNotes"} // Add this prop to NoteCard
                />
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full py-12">
                                No notes found.              {" "}
              </p>
            )}
                     {" "}
          </div>
                 {" "}
        </div>
             {" "}
      </div>
           {" "}
      <NoteModal
        isOpen={!!editingNote}
        note={editingNote}
        onClose={() => setEditingNote(null)}
        onSave={handleEditSave}
      />
         {" "}
    </div>
  );
};

export default Dashboard;
