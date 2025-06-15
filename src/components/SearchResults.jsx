import React from "react";
import SongItem from "./SongItem";

const SearchResults = ({ results, hasSearched }) => {
  if (!results.length && hasSearched) {
    return <p className="text-slate-300">No matching songs found.</p>;
  }

  if (!results.length) return null;

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4 flex-nowrap pb-2">
        {results.map((song) => (
          <div key={song.id} className="w-[200px] shrink-0">
            <SongItem
              id={song.id}
              name={song.name}
              desc={song.desc}
              image={song.image}
              file={song.file}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
