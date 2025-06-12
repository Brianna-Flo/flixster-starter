import React from 'react';
import './SearchForm.css';

const SearchForm = ({ onSearch, onClear }) => {
    const handleSearch = (event) => {
        event.preventDefault();
        const newSearch = event.target.elements.searchInput.value;
        onSearch (newSearch);
    }

    const handleClear = (event) => {
        event.preventDefault();
        onClear();
    }

    return (
        <form className="search-form" onSubmit={handleSearch}>
            {/* <input className="search-input" type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search" /> */}
            <input className="search-input" name="searchInput" type="text" placeholder="Search" />
            {/* <input className="search-input" type="text" placeholder="Search" /> */}
            <button className="search-btn" type="submit">Search</button>
            <button className="clear-btn" type="button" onClick={handleClear}>Clear</button>
        </form>
    )
}

export default SearchForm;