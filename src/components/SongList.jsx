import React from "react";
import { useSongData } from "../context/Song";
import Song from "./Songs";

const SongList = () => {
  const { songs } = useSongData();

  return (
    <div  className="p-6">
      {/* <h2 className="text-2xl font-bold text-white mb-4">Tất cả bài hát</h2> */}
      {songs.length === 0 ? (
        <p className="text-slate-300">No Songs</p>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {songs.map((song) => (
            <Song
              key={song.id}
              id={song.id}
              name={song.name}
              desc={song.desc}
              image={song.image}
              file={song.file}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SongList;
