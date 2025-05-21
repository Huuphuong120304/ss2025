import React from "react";
import SongItem from "./SongItem";

const SearchResults = ({ results }) => {
  if (!results.length) {
    return <p className="text-slate-300">No matching songs found.</p>;
  }

  return (
    <div className="flex gap-2">
      {results.map((song) => (
        <SongItem
          key={song.id}
          id={song.id}
          name={song.name}
          desc={song.desc}
          image={song.image}
          file={song.file}
        />
      ))}
    </div>
  );
};

export default SearchResults;
