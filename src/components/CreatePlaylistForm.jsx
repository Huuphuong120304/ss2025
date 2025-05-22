import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePlaylistForm = () => {
    
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  

  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    if (image) formData.append("image", image);

    try {
      const res = await fetch("http://localhost:5000/api/playlist/create", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Playlist created successfully!");
        navigate(`/playlist/${data.playlist_id}`);
      } else {
        alert(data.error || "Failed to create playlist.");
      }
    } catch (err) {
      console.error("Error creating playlist:", err);
      alert("Server connection error.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 bg-black p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Create New Playlist</h2>
      <form onSubmit={handleCreate} className="space-y-4">
        <input
          type="text"
          placeholder="Playlist name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-black py-2 rounded hover:bg-blue-700">
          Create Playlist
        </button>
      </form>
    </div>
  );
};

export default CreatePlaylistForm;
