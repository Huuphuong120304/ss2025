import React, { useState } from "react";

const SearchBar = ({ onSearchChange }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearchChange(value); // Gọi debounce
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Search songs..."
      className="auth-input w-full"
    />
  );
};

export default SearchBar;
