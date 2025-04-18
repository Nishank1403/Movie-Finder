import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./movie-card.scss";

import Button, { FavoriteButton } from "../button/Button";
import { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import * as Config from "./../../constants/Config";

const MovieCard = (props) => {
  const item = props.item;
  const link = "/" + Config.HOME_PAGE + "/" + category[props.category] + "/" + item.id;
  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  // Favorite State
  const [isFavorite, setIsFavorite] = useState(
    localStorage.getItem(`fav-${item.id}`) === "true"
  );

  const toggleFavorite = () => {
    const newFavStatus = !isFavorite;
    setIsFavorite(newFavStatus);
    localStorage.setItem(`fav-${item.id}`, newFavStatus);
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

      {/* Favorite Button */}
      <FavoriteButton isFavorite={isFavorite} onClick={toggleFavorite} />
    </div>
  );
};

export default MovieCard;
