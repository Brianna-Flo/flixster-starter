import React from "react";
import "./SearchForm.css";

const SearchForm = ({ onSearch, onClear }) => {
  const handleSearch = (event) => {
    event.preventDefault();
    const newSearch = event.target.elements.searchInput.value;
    onSearch(newSearch);
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <input
        className="search-input"
        name="searchInput"
        type="text"
        placeholder="Search"
      />
      <button className="search-btn" type="submit">
        Search
      </button>
      <button className="clear-btn" type="reset" onClick={onClear}>
        Clear
      </button>
    </form>
  );
};

export default SearchForm;
