import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { useUserData } from "../context/User";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Song = ({ id, name, desc, image, queue }) => {
  const { playWithId } = useContext(PlayerContext);
  const { addToPlaylist, playlistSongs } = useUserData();
  const navigate = useNavigate();

  const isSaved = playlistSongs.includes(id);

  const handleSave = (e) => {
    e.stopPropagation(); 
    if (!isSaved) {
      addToPlaylist(id);
    }
  };

  const handleClick  = () => {
    playWithId(id, queue);
    navigate(`/song/${id}`);
  };

  return (
    <div
      onClick={ handleClick}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] relative"
    >
      <img className="rounded" src={image} alt={name} />
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>

      {/* Nút lưu vào playlist */}
      <button
        onClick={handleSave}
        className="absolute bottom-2 right-2 text-white bg-green-500 p-2 rounded-full shadow hover:bg-green-600"
        title="Lưu vào playlist"
      >
        {isSaved ? <FaBookmark /> : <FaRegBookmark />}
      </button>
    </div>
  );
};

export default Song;
