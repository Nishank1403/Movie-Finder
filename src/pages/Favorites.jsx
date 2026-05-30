import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";

const fallbackPoster = "https://via.placeholder.com/300x450?text=No+Image";

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
            <div key={`${movie.category || "movie"}-${movie.id}`} className="favorite-item">
              <Link to={`/react-movie-app/${movie.category}/${movie.id}`}>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : fallbackPoster
                  }
                  alt={movie.title || movie.name || "Favorite item"}
                  className="favorite-poster"
                />
                <div className="favorite-details">
                  <h3>{movie.title || movie.name}</h3>
                  <span className="category-tag">{movie.category}</span>
                </div>
              </Link>
              <button
                type="button"
                className="remove-favorite-btn"
                onClick={() => removeFromFavorites(movie)}
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