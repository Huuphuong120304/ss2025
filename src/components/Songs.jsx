import React, { useContext } from "react";
import { useSongData } from "../context/Song";
import { useUserData } from "../context/User";
import { FaPlay, FaPause, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { PlayerContext } from "../context/PlayerContext";

const Song = ({ id, name, desc, image, file }) => {
  const { playWithId } = useContext(PlayerContext);

  const {
    selectedSong,
    setSelectedSong,
    isPlaying,
    setIsPlaying
  } = useSongData();

  const { addToPlaylist, playlistSongs } = useUserData();
  const isSaved = playlistSongs.includes(id);
  const isThisPlaying = selectedSong === id;

  const handleClick = (e) => {
    e.stopPropagation(); // tránh việc click nút play lại trigger playWithId
    if (isThisPlaying) {
      setIsPlaying(!isPlaying);
    } else {
      setSelectedSong(id);
      setIsPlaying(true);
    }
  };

  const saveToPlaylistHandler = (e) => {
    e.stopPropagation(); // tránh trigger playWithId khi bấm nút save
    if (!isSaved) {
      addToPlaylist(id);
    }
  };

  return (
    <div
      onClick={() => playWithId(id)}
      className="bg-[#1f1f1f] p-4 rounded w-60 min-w-[15rem] shadow hover:shadow-lg transition duration-300 relative group cursor-pointer"
    >
      <img
        src={image || "https://via.placeholder.com/200"}
        alt={name}
        className="w-full h-32 object-cover rounded"
      />
      <h3 className="text-white font-semibold mt-2">{name}</h3>
      <p className="text-sm text-gray-400">{desc?.slice(0, 40)}...</p>

      {/* Nút lưu playlist */}
      <button
        onClick={saveToPlaylistHandler}
        className="absolute bottom-2 right-2 bg-green-500 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        {isSaved ? <FaBookmark /> : <FaRegBookmark />}
      </button>

      {/* Nút phát
      <button
        onClick={handleClick}
        className="mt-3 px-3 py-1 bg-green-600 rounded hover:bg-green-700 text-white flex items-center gap-2"
      >
        {isThisPlaying && isPlaying ? <FaPause /> : <FaPlay />}
        {isThisPlaying
          ? isPlaying
            ? "Đang phát"
            : "Tạm dừng"
          : "Phát"}
      </button> */}
    </div>
  );
};

export default Song;
