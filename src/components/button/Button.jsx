import React from "react";
import PropTypes from "prop-types";

import "./button.scss";

const Button = (props) => {
  return (
    <button
      className={`btn ${props.className}`}
      onClick={props.onClick ? () => props.onClick() : null}
    >
      {props.children}
    </button>
  );
};

export const OutlineButton = (props) => {
  return (
    <Button
      className={`btn-outline ${props.className}`}
      onClick={props.onClick ? () => props.onClick() : null}
    >
      {props.children}
    </Button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};

export const FavoriteButton = ({ isFavorite, onClick, movie, category }) => {
  return (
    <button
      className="favorite-btn"
      onClick={() => {
        console.log("Favorite clicked:", movie);
        onClick();
      }}
    >
      {isFavorite ? "❤️ Remove Favorite" : "🤍 Add to Favorite"}
    </button>
  );
};



Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;