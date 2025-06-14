import React from "react";
import { useSongData } from "../context/Song";
import Song from "./Songs";

const SongList = () => {
  const { songs } = useSongData();

  return (
    <div>      
      {songs.length === 0 ? (
        <p className="text-slate-300">No Songs</p>
      ) : (
        <div className="flex  overflow-x-auto pb-2">
          {songs.map((song) => (
            <Song
              key={song.id}
              id={song.id}
              name={song.name}
              desc={song.desc}
              image={song.image}
              file={song.file}
              queue={songs}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SongList;
