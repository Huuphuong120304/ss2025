import React, { useState } from "react";
import { useSongData } from "../context/Song";

const AddSongForm = () => {
  const { albums, addSong, loading } = useSongData();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [duration, setDuration] = useState("3:00");
  const [albumId, setAlbumId] = useState("");
  const [gen, setGen]=useState("");
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [audioName, setAudioName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("duration", duration);
    formData.append("album_id", albumId);
    formData.append("genre", gen)
    formData.append("image", image);
    formData.append("file", audio);

    addSong(formData, () => {
      setName("");
      setDesc("");
      setDuration("3:00");
      setAlbumId("");
      setGen("");
      setImage(null);
      setAudio(null);
      setImgPreview(null);
      setAudioName("");
    });
  };
  

  return (
    <form onSubmit={handleSubmit} className="bg-[#181818] p-6 rounded-lg mt-6">
      <h2 className="text-xl mb-4 font-bold">Add Song</h2>
      <input
        type="text"
        placeholder="Song Title"
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
        type="text"
        placeholder="Genre"
        value={gen}
        onChange={(e) => setGen(e.target.value)}
        className="auth-input mb-2"
      />
      
      <select
        className="auth-input mb-2"
        value={albumId}
        onChange={(e) => setAlbumId(e.target.value)}
      >
        <option value="">Select Album</option>
        {albums.map((album) => (
          <option key={album.id} value={album.id}>
            {album.name}
          </option>
        ))}
      </select>
      

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setImage(e.target.files[0]);
          setImgPreview(URL.createObjectURL(e.target.files[0]));
        }}
        className="auth-input mb-2"
      />
      {imgPreview && <img src={imgPreview} className="w-32 h-32 mb-2" />}
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setAudio(file);
            setAudioName(file.name);

            const audioElement = document.createElement("audio");
            audioElement.src = URL.createObjectURL(file);
            audioElement.addEventListener("loadedmetadata", () => {
              const minutes = Math.floor(audioElement.duration / 60);
              const seconds = Math.floor(audioElement.duration % 60)
                .toString()
                .padStart(2, "0");
              setDuration(`${minutes}:${seconds}`);
            });
          }
        }}
        className="auth-input mb-2"
      />

      {audioName && <p className="text-sm text-gray-400 mb-2">{audioName}</p>}
      <button disabled={loading} className="auth-btn w-full">
        {loading ? "Uploading..." : "Add Song"}
      </button>
    </form>
  );
};

export default AddSongForm;
