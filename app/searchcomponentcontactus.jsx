"use client";
import React from "react";
import { useState } from 'react';
import { useRouter } from 'next/navigation'

// List of cities and sub-cities without zip codes
const cities = [
    { name: "San Jose", page: "service-areas/san-jose" },
    { name: "Cupertino", page: "service-areas/san-jose/cupertino" },
    { name: "Evergreen", page: "service-areas/san-jose/evergreen" },
    { name: "Los Altos", page: "service-areas/san-jose/los-altos" },
    { name: "Redding", page: "redding" },
    // Add more cities and sub-cities here
];

const SearchContact = () => {
    const [query, setQuery] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
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
        } else {
            setShowSuggestions(false);
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
            setErrorMessage('No results found. Please check the city or sub-city name.');
        }
    };

    return (
        <div className="maincontact py-5">
            <form onSubmit={handleSearch} style={{ position: 'relative' }}>
                <label style={{ color: '#333', fontSize: '20px', display: 'block', marginBottom: '10px' }}>
                    Enter City Name 
                </label>
                <input
                    type="text" className="searchtextbox"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search for a City or Sub-City"
                    style={{ padding: '10px', width: '300px', borderRadius: '5px' }}
                />
                <button type="submit" style={{ padding: '10px 20px', marginLeft: '-2px', borderRadius: '5px', backgroundColor: '#D81C3F', color: '#fff' }}>
                    Search
                </button>
                {showSuggestions && filteredSuggestions.length > 0 && (
                    <ul style={{
                        position: 'absolute',
                        width: '300px',
                        border: '1px solid #ccc',
                        backgroundColor: '#fff',
                        listStyleType: 'none',
                        padding: '0',
                        margin: '0',
                        borderRadius: '5px',
                        zIndex: 10
                    }}>
                        {filteredSuggestions.map((suggestion, index) => (
                            <li key={index} 
                                onClick={() => handleSuggestionClick(suggestion)} 
                                style={{ padding: '10px', cursor: 'pointer' }}>
                                {suggestion.name}
                            </li>
                        ))}
                    </ul>
                )}
            </form>
            {errorMessage && (
                <div style={{ marginTop: '10px', color: '#ff0000' }}>
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

export default SearchContact;