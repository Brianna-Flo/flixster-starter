import React from 'react'
import './FilterMenu.css'

const FilterMenu = ({ onFilter }) => {

    const handleFilterChange = (event) => {
        const filter = event.target.value;
        onFilter (filter);
    }

    return (
        <div>
            <label htmlFor="filter">Filter by: </label>
            <select id="filter" name="filter" onChange={handleFilterChange}>
                <option id="none" value="">None</option>
                <option id="title" value="title.asc">Title</option>
                <option id="release-date" value="primary_release_date.dec">Release Date</option>
                <option id="vote-average" value="vote_average.dec">Vote Average</option>
            </select>
        </div>
    )
}

export default FilterMenu;