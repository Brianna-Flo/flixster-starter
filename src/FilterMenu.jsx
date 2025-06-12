import React from 'react'
import './FilterMenu.css'

const FilterMenu = ({ onFilter, movieData }) => {

    const handleFilterChange = (event) => {
        const requestedFilter = event.target.value;
        let sortedData = movieData;
        switch (requestedFilter) {
            case "":
                sortedData = movieData;
                break;
            case "title":
                sortedData = movieData.sort(titleSort);
                break;
            case "release-date":
                console.log('in release date')
                sortedData = movieData.sort(releaseSort);
                break;
            case "vote-average":
                sortedData = movieData.sort(voteSort);
                break;
            default:
                break;
        }
        onFilter (sortedData);
    }

    function titleSort(a, b) {
        if (a.title < b.title) {
            return -1;
        } else if (a.title > b.title) {
            return 1;
        }
        return 0;
    }

    function voteSort(a, b) {
        if (a.vote_average > b.vote_average) {
            return -1;
        } else if (a.vote_average < b.vote_average) {
            return 1;
        }
        return 0;
    }

    function releaseSort(a, b) {
        if (a.release_date > b.release_date) {
            return -1;
        } else if (a.release_date < b.release_date) {
            return 1;
        }
        return 0;
    }

    return (
        <section id="filter">
            <label htmlFor="filter">Filter by: </label>
            <select id="filter" name="filter" onChange={handleFilterChange}>
                <option id="none" value="">None</option>
                <option id="title" value="title">Title</option>
                <option id="release-date" value="release-date">Release Date</option>
                <option id="vote-average" value="vote-average">Vote Average</option>
            </select>
        </section>
    )
}

export default FilterMenu;