import React, { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();
const getFavoriteKey = (movie) => `${movie.category || "movie"}-${movie.id}`;

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
      setFavorites(Array.isArray(storedFavorites) ? storedFavorites : []);
    } catch {
      setFavorites([]);
      localStorage.removeItem("favorites");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some((fav) => getFavoriteKey(fav) === getFavoriteKey(movie))) {
        return [...prevFavorites, movie]; 
      }
      return prevFavorites; 
    });
  };

  const removeFromFavorites = (movie) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => getFavoriteKey(fav) !== getFavoriteKey(movie))
    );
  };

  const isFavorite = (movieId, movieCategory) =>
    favorites.some((fav) => getFavoriteKey(fav) === getFavoriteKey({ id: movieId, category: movieCategory }));

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
