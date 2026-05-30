import React from "react";
import PropTypes from "prop-types";

import "./button.scss";

const Button = (props) => {
  return (
    <button
      type={props.type || "button"}
      {...(props.ariaLabel && { "aria-label": props.ariaLabel })}
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
  ariaLabel: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export const FavoriteButton = ({ isFavorite, onClick }) => {
  return (
    <button
      type="button"
      className="favorite-btn"
      onClick={onClick}
    >
      {isFavorite ? "❤️ Remove Favorite" : "🤍 Add to Favorite"}
    </button>
  );
};

FavoriteButton.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;