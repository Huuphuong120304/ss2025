import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [genreList, setGenreList] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [filters, setFilters] = useState({
    genre: "",
    duration: "",
  });

  const fetchResults = async (query = "", genre = "", duration = "") => {
    const params = new URLSearchParams();
    if (query.trim()) params.append("q", query);
    if (genre) params.append("genre", genre);
    if (duration) {
      if (duration === "< 2 min") params.append("duration", "short");
      else if (duration === "2–5 min") params.append("duration", "medium");
      else if (duration === "> 5 min") params.append("duration", "long");
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/song/search?${params.toString()}`
      );
      const data = await res.json();
      setResults(data);
      setHasSearched(true);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/genres");
      const data = await res.json();
      setGenreList(data);
    } catch (error) {
      console.error("Genre fetch error:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    const hasAnyFilter = filters.genre || filters.duration;
    if (searchQuery.trim() || hasAnyFilter) {
      fetchResults(searchQuery, filters.genre, filters.duration);
    } else {
      setResults([]);
      setHasSearched(false);
    }
  }, [searchQuery, filters.genre, filters.duration]);

  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
    }, 100),
    []
  );

  const durationRanges = ["< 2 min", "2–5 min", "> 5 min"];

  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl font-bold mb-4">Search Songs</h2>

      <div className="mb-4">
        <SearchBar onSearchChange={debouncedSearch} />
      </div>

      <div className="flex gap-4 mb-6 items-center">
        <select
          value={filters.genre}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, genre: e.target.value }))
          }
          className="text-white p-2 rounded bg-[#333]"
        >
          <option value="">Genre</option>
          {genreList.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <select
          value={filters.duration}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, duration: e.target.value }))
          }
          className="text-white p-2 rounded bg-[#333]"
        >
          <option value="">Duration</option>
          {durationRanges.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>

        {(searchQuery || filters.genre || filters.duration) && (
          <button
            onClick={() => {
              setSearchQuery("");
              setFilters({ genre: "", duration: "" });
              setResults([]);
              setHasSearched(false);
            }}
            className="ml-2 px-3 py-1 bg-gray-500 rounded text-sm"
          >
            Clear 
          </button>
        )}
      </div>

      <div className="mb-16" />
      <SearchResults results={results} hasSearched={hasSearched} />
    </div>
  );
};

export default SearchPage;
