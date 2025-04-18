import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./header.scss";
import SearchBar from "../SearchBar/SearchBar";
import logo from "./../../assets/logo.png";
import * as Config from "./../../constants/Config";
import { useAuth } from "../../context/AuthContext"; // Import AuthContext

const headerNav = [
  { display: "Home", path: `/${Config.HOME_PAGE}` },
  { display: "Movies", path: `/${Config.HOME_PAGE}/movie` },
  { display: "TV Series", path: `/${Config.HOME_PAGE}/tv` },
];

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const { user, logout } = useAuth(); // Get user and logout function from AuthContext

  const active = headerNav.findIndex((e) => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };

    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} alt="logo" />
          <Link to={`/${Config.HOME_PAGE}`}>Movie Mania</Link>
        </div>

        <SearchBar />

        <ul className="header__nav">
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? "active" : ""}`}>
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}
          
          <li>
            <Link to="/react-movie-app/favorites">Favorites</Link>
          </li>

          {/* Show login/signup when user is not authenticated */}
          {!user ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          ) : (
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
