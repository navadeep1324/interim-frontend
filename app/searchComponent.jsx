"use client";
import React from "react";
import { useState } from 'react';
import { useRouter } from 'next/navigation'

// List of cities and sub-cities without zip codes
// List of cities and sub-cities without zip codes
const cities = [
    { name: "San Jose", page: "service-areas/san-jose" },
    { name: "Cupertino", page: "service-areas/san-jose/cupertino" },
    { name: "Evergreen", page: "service-areas/san-jose/evergreen" },
    { name: "Los Altos", page: "service-areas/san-jose/los-altos" },
    { name: "Los Gatos", page: "service-areas/san-jose/los-gatos" },
    { name: "Mountain View", page: "service-areas/san-jose/mountain-view" },
    { name: "Santa Clara", page: "service-areas/san-jose/santa-clara" },
    { name: "Saratoga", page: "service-areas/san-jose/saratoga" },
    { name: "Sunnyvale", page: "service-areas/san-jose/sunnyvale" },
    { name: "Milpitas", page: "service-areas/san-jose/milpitas" },
    { name: "Yuba City", page: "service-areas/yuba" },
    { name: "Marysville", page: "service-areas/yuba/marysville" },
    { name: "Olivehurst", page: "service-areas/yuba/olivehurst" },
    { name: "Plumas Lake", page: "service-areas/yuba/plumas-lake" },
    { name: "Loma Rica", page: "service-areas/yuba/loma-rica" },
    { name: "Live Oak", page: "service-areas/yuba/live-oak" },
    { name: "Colusa", page: "service-areas/yuba/colusa" },
    { name: "Williams", page: "service-areas/yuba/williams" },
    { name: "Maxwell", page: "service-areas/yuba/maxwell" },
    { name: "Grass Valley", page: "service-areas/grass-valley" },
    { name: "Nevada City", page: "service-areas/grass-valley/nevada-city" },
    { name: "Medford", page: "service-areas/medford" },
    { name: "Ashland", page: "service-areas/medford/ashland" },
    { name: "Talent", page: "service-areas/medford/talent" },
    { name: "Phoenix", page: "service-areas/medford/phoenix" },
    { name: "Central Point", page: "service-areas/medford/central-point" },
    { name: "White City", page: "service-areas/medford/white-city" },
    { name: "Eagle Point", page: "service-areas/medford/eagle-point" },
    { name: "Shady Cove", page: "service-areas/medford/shady-cove" },
    { name: "Gold Hill", page: "service-areas/medford/gold-hill" },
    { name: "Rogue River", page: "service-areas/medford/rogue-river" },
    { name: "Carson", page: "service-areas/carson" },
    { name: "Reno", page: "service-areas/carson/reno" },
    { name: "Sparks", page: "service-areas/carson/sparks" },
    { name: "Carson City", page: "service-areas/carson/carson-city" },
    { name: "Minden", page: "service-areas/carson/minden" },
    { name: "Gardnerville", page: "service-areas/carson/gardnerville" },
    { name: "Genoa", page: "service-areas/carson/genoa" },
    { name: "Dayton", page: "service-areas/carson/dayton" },
    { name: "Gold Hill", page: "service-areas/carson/gold-hill" },
    { name: "Mound House", page: "service-areas/carson/mound-house" },
    { name: "Chico", page: "service-areas/chico" },
    { name: "Oroville", page: "service-areas/chico/oroville" },
    { name: "Paradise", page: "service-areas/chico/paradise" },
    { name: "Magalia", page: "service-areas/chico/magalia" },
    { name: "Durham", page: "service-areas/chico/durham" },
    { name: "Biggs", page: "service-areas/chico/biggs" },
    { name: "Forest Ranch", page: "service-areas/chico/forest-ranch" },
    { name: "Cohasset", page: "service-areas/chico/cohasset" },
    { name: "Willows", page: "service-areas/chico/willows" },
    { name: "Orland", page: "service-areas/chico/orland" },
    { name: "Capay", page: "service-areas/chico/capay" },
    { name: "Corning", page: "service-areas/chico/corning" },
    { name: "Redding", page: "service-areas/redding" },
    { name: "Shasta", page: "service-areas/redding/shasta" },
    { name: "Anderson", page: "service-areas/redding/anderson" },
    { name: "Shasta Lake City", page: "service-areas/redding/shasta-lake-city" },
    { name: "Cottonwood", page: "service-areas/redding/cottonwood" },
    { name: "Palo Cedro", page: "service-areas/redding/palo-cedro" },
    { name: "Bella Vista", page: "service-areas/redding/bella-vista" },
    { name: "Shingletown", page: "service-areas/redding/shingletown" },
    { name: "Round Mt", page: "service-areas/redding/round-mt" },
    { name: "Montgomery Creek", page: "service-areas/redding/montgomery-creek" },
    { name: "Burney", page: "service-areas/redding/burney" },
    { name: "Johnson Park", page: "service-areas/redding/johnson-park" },
    { name: "Hat Creek", page: "service-areas/redding/hat-creek" },
    { name: "Castle", page: "service-areas/redding/castle" },
];

const Search = () => {
    const [query, setQuery] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1); // Keep track of the highlighted suggestion
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        const userInput = e.target.value;
        setQuery(userInput);
        setErrorMessage(''); // Clear any previous error messages when typing

        if (userInput.trim()) {
            const filtered = cities.filter(city =>
                city.name.toLowerCase().startsWith(userInput.toLowerCase())
            );
            setFilteredSuggestions(filtered);
            setShowSuggestions(true);
            setActiveIndex(-1); // Reset active index when typing
        } else {
            setShowSuggestions(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            // Move down the list
            setActiveIndex(prev => (prev < filteredSuggestions.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            // Move up the list
            setActiveIndex(prev => (prev > 0 ? prev - 1 : 0));
        } else if (e.key === 'Enter' && activeIndex >= 0) {
            // Select the active suggestion when Enter is pressed
            const selectedCity = filteredSuggestions[activeIndex];
            if (selectedCity) {
                handleSuggestionClick(selectedCity);
            }
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion.name);
        setShowSuggestions(false);
        router.push(`/${suggestion.page}`);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const normalizedQuery = query.toLowerCase().trim();

        // Check if query matches a city or sub-city name
        const foundCity = cities.find(city =>
            city.name.toLowerCase() === normalizedQuery
        );

        if (foundCity) {
            setErrorMessage('');
            router.push(`/${foundCity.page}`);
        } else {
            setErrorMessage('It seems no locations were found for your search. Please double-check your zip code or city name. ');
        }
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSearch} className="search-form" onKeyDown={handleKeyDown}>
                <label className="search-label">
                    Enter City Name 
                </label>
                <div className="input-button-wrapper">
                    <input
                        type="text"
                        value={query}
                        onChange={handleChange}
                        placeholder="Search for a City or Sub-City"
                        className="search-input"
                    />
                    <button type="submit" className="search-button">
                        Search
                    </button>
                </div>
                {showSuggestions && filteredSuggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {filteredSuggestions.map((suggestion, index) => (
                            <li key={index} 
                                onClick={() => handleSuggestionClick(suggestion)} 
                                className={`suggestion-item ${index === activeIndex ? 'active' : ''}`}>
                                {suggestion.name}
                            </li>
                        ))}
                    </ul>
                )}
            </form>
            {errorMessage && (
                <div className="error-message search-h">
                    {errorMessage}
                    {/* <a href="tel:+1 530-221-1212" className="error-phone">+1 530-221-1212</a> */}
                </div>
            )}
        </div>
    );
};

export default Search;