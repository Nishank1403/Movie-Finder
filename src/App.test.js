import { fireEvent, render, screen } from "@testing-library/react";
import { FavoritesProvider, useFavorites } from "./context/FavoritesContext";
import { HOME_PAGE } from "./constants/Config";

const sampleMovie = { id: 10, title: "Inception", category: "movie" };

const FavoritesHarness = () => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  return (
    <div>
      <button type="button" onClick={() => addToFavorites(sampleMovie)}>
        Add
      </button>
      <button type="button" onClick={() => removeFromFavorites(sampleMovie.id)}>
        Remove
      </button>
      <span>{favorites.length}</span>
    </div>
  );
};

test("uses configured home page route constant", () => {
  expect(HOME_PAGE).toBe("react-movie-app");
});

test("adds and removes favorites through provider state", () => {
  localStorage.clear();
  render(
    <FavoritesProvider>
      <FavoritesHarness />
    </FavoritesProvider>
  );

  expect(screen.getByText("0")).toBeInTheDocument();

  fireEvent.click(screen.getByText("Add"));
  expect(screen.getByText("1")).toBeInTheDocument();

  fireEvent.click(screen.getByText("Add"));
  expect(screen.getByText("1")).toBeInTheDocument();

  fireEvent.click(screen.getByText("Remove"));
  expect(screen.getByText("0")).toBeInTheDocument();
});
