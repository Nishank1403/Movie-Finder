import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <div className="container favorites-page">
      <h2>My Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites added yet. Start exploring movies and TV shows!</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((movie) => (
            <div key={movie.id} className="favorite-item">
              <Link to={`/react-movie-app/${movie.category}/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="favorite-poster"
                />
                <div className="favorite-details">
                  <h3>{movie.title}</h3>
                  <span className="category-tag">{movie.category}</span>
                </div>
              </Link>
              <button 
                className="remove-favorite-btn" 
                onClick={() => removeFromFavorites(movie.id)}
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;