import React, { useState } from "react";
import { useSongData } from "../context/Song";

const AddAlbumForm = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const { addAlbum, loading } = useSongData();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("image", image);

    addAlbum(formData, () => {
      setName("");
      setDesc("");
      setImage(null);
      setPreview(null);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#181818] p-6 rounded-lg">
      <h2 className="text-xl mb-4 font-bold">Add Album</h2>
      <input
        type="text"
        placeholder="Album Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="auth-input mb-2"
      />
      <input
        type="text"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="auth-input mb-2"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setImage(e.target.files[0]);
          setPreview(URL.createObjectURL(e.target.files[0]));
        }}
        className="auth-input mb-2"
      />
      {preview && <img src={preview} alt="Preview" className="w-32 h-32 mb-2" />}
      <button disabled={loading} className="auth-btn w-full">
        {loading ? "Uploading..." : "Add Album"}
      </button>
    </form>
  );
};

export default AddAlbumForm;
