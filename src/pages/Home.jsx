import React from "react";
import { Link } from "react-router-dom";

import { OutlineButton } from "../components/button/Button";
import HeroSlide from "../components/hero-slide/HeroSlide";
import MovieList from "../components/movie-list/MovieList";

import { category, movieType, tvType } from "../api/tmdbApi";
import * as Config from "./../constants/Config";

const Section = ({ title, link, category, type }) => (
  <div className="section mb-3">
    <div className="section__header mb-2">
      <h2>{title}</h2>
      <Link to={link}>
        <OutlineButton className="small">View more</OutlineButton>
      </Link>
    </div>
    <MovieList category={category} type={type} />
  </div>
);

const Home = () => {
  console.log("HOME_PAGE:", Config.HOME_PAGE);
  return (
    <>
      <HeroSlide />

      <div className="container">
        <Section
          title="Trending Movies"
          link={`/${Config.HOME_PAGE}/movie`}
          category={category.movie}
          type={movieType.popular}
        />
        <Section
          title="Top Rated Movies"
          link={`/${Config.HOME_PAGE}/movie`}
          category={category.movie}
          type={movieType.top_rated}
        />
        <Section
          title="Trending TV"
          link={`/${Config.HOME_PAGE}/tv`}
          category={category.tv}
          type={tvType.popular}
        />
        <Section
          title="Top Rated TV"
          link={`/${Config.HOME_PAGE}/tv`}
          category={category.tv}
          type={tvType.top_rated}
        />
      </div>
    </>
  );
};

export default Home;
