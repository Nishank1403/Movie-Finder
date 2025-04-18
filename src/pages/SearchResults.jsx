import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import apiConfig from "../api/apiConfig";
import "./searchResults.scss"; // Add appropriate styling

const SearchResults = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiConfig.apiKey}&query=${query}`;
        const response = await axios.get(apiUrl);

        if (response.data.results.length === 0) {
          setSearchResults(null); // No results found
        } else {
          setSearchResults(response.data.results);
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
        console.error("Error fetching search results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const handleItemClick = (item) => {
    const category = item.media_type === "movie" ? "movie" : "tv";
    navigate(`/react-movie-app/${category}/${item.id}`);
  };

  return (
    <div className="search-results container">
      <h2>Search Results for: "{query}"</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {searchResults === null && <p>No results found.</p>}

      <div className="results-grid">
        {searchResults &&
          searchResults.map((item) => (
            <div
              key={item.id}
              className="result-item"
              onClick={() => handleItemClick(item)}
            >
              <img
                src={
                  item.poster_path
                    ? `${apiConfig.w500Image(item.poster_path)}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={item.title || item.name}
              />
              <p>{item.title || item.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchResults;
