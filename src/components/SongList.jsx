import React from "react";
import { useSongData } from "../context/Song"; // Hoặc "../context/Song" nếu bạn dùng tên khác
import SongItem from "./SongItem";

const SongList = () => {
  const { songs } = useSongData();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-4">All Songs</h2>
      <div className="flex gap-4 overflow-x-auto">
  {songs.length === 0 ? (
    <p className="text-slate-300">No songs found.</p>
  ) : (
    songs.map((song) => (
      <SongItem
        key={song.id}
        id={song.id}
        name={song.name}
        desc={song.desc}
        image={song.image}
        file={song.file}
      />
    ))
  )}
</div>

    </div>
  );
};

export default SongList;
