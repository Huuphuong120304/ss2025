import React, { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";

const SearchPage = () => {
  const [results, setResults] = useState([]);

  // Hàm fetch API
  const fetchResults = async (query) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/song/search?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  // Tạo hàm debounce 300ms để giảm số lần gọi API
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.trim() !== "") {
        fetchResults(query);
      } else {
        setResults([]);
      }
    }, 300),
    []
  );

  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl font-bold mb-4">Search Songs</h2>
      <SearchBar onSearchChange={debouncedSearch} />
      <SearchResults results={results} />
    </div>
  );
};

export default SearchPage;
