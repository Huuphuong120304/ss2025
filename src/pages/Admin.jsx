import React from "react";
import { Link } from "react-router-dom";
import AddAlbumForm from "../components/AddAlbumForm";
import AddSongForm from "../components/AddSongForm";
import { useSongData } from "../context/Song";
import { MdDelete } from "react-icons/md";

const Admin = () => {
  const { songs, deleteSong } = useSongData();

  return (
    <div className="min-h-screen bg-[#212121] text-white p-8">
      <Link to="/" className="bg-green-500 py-2 px-4 rounded-full text-white font-bold">
        Home
      </Link>

      <AddAlbumForm />
      <AddSongForm />

      <div className="mt-10">
        <h2 className="text-2xl mb-4 font-bold">All Songs</h2>
        <div className="flex flex-wrap gap-4">
          {songs.map((s) => (
            <div key={s.id} className="bg-[#181818] p-4 rounded-lg w-60">
              <img src={s.image} alt={s.name} className="w-full h-32 object-cover mb-2" />
              <h4 className="font-bold text-lg">{s.name}</h4>
              <p className="text-sm text-gray-400">{s.desc}</p>
              <audio controls src={s.file} className="w-full mt-2" />
              <button
                onClick={() => deleteSong(s.id)}
                className="bg-red-600 px-2 py-1 mt-2 text-white rounded"
              >
                <MdDelete />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
