import React from "react";
import { Link } from "react-router-dom";
import "./movie-card.scss";

import Button, { FavoriteButton } from "../button/Button";
import { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import * as Config from "./../../constants/Config";
import { useFavorites } from "../../context/FavoritesContext";

const MovieCard = (props) => {
  const item = props.item;
  const categoryKey = category[props.category];
  const link = "/" + Config.HOME_PAGE + "/" + categoryKey + "/" + item.id;
  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const isFavoriteState = isFavorite(item.id);

  const toggleFavorite = () => {
   if (!isFavoriteState) {
     addToFavorites({
       ...item,
       category: categoryKey,
     });
     return;
   }

   removeFromFavorites(item.id);
  };

  return (
    <div className="movie-card-container">
      <Link to={link}>
        <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
          <Button>
            <i className="bx bx-play"></i>
          </Button>
        </div>
      </Link>
      <h3>{item.title || item.name}</h3>

      <FavoriteButton isFavorite={isFavoriteState} onClick={toggleFavorite} />
    </div>
  );
};

export default MovieCard;
