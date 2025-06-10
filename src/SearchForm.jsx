import React from 'react';
import './SearchForm.css';

const SearchForm = () => {
    return (
        <form className="search-form">
            {/* <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search" /> */}
            <input className="search-input" type="text" placeholder="Search" />

        </form>
    )
}

export default SearchForm;