import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFavorites } from "../../context/FavoritesContext"; // Import the Favorites context
import tmdbApi from "./../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import "./detail.scss";
import CastList from "./CastList";
import VideoList from "./VideoList";
import MovieList from "./../../components/movie-list/MovieList";
import { FavoriteButton } from "../../components/button/Button";

const Detail = () => {
  const { category, id } = useParams();
  const [item, setItem] = useState(null);

  const { favorites, addToFavorites, removeFromFavorites } = useFavorites(); // Use favorites context

  // Check if the movie is already in favorites
  const isFavorite = favorites.some((fav) => fav.id === parseInt(id));

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  // Correctly toggle favorite using context
  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(parseInt(id));
    } else {
      addToFavorites({
        id: parseInt(id),
        title: item.title || item.name,
        poster_path: item.poster_path,
        category: category,
      });
    }
  };

  return (
    <>
      {item && (
        <>
          <div className="banner" style={{ backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})` }}></div>

          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div className="movie-content__poster__img" style={{ backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})` }}></div>
            </div>

            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="genres">
                {item.genres && item.genres.slice(0, 5).map((genre, index) => (
                  <span key={index} className="genres__item">{genre.name}</span>
                ))}
              </div>
              <p className="overview">{item.overview}</p>

              {/* Corrected Favorite Button Implementation */}
              <FavoriteButton isFavorite={isFavorite} onClick={toggleFavorite} />

              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                <CastList id={item.id} />
              </div>
            </div>
          </div>

          <div className="container">
            <div className="section mb-3">
              <VideoList id={item.id} />
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Similar</h2>
              </div>
              <MovieList category={category} type="similar" id={item.id} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
