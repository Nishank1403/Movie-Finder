import React from "react";
import { BrowserRouter, Route, Routes as RouterRoutes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";

// Import components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

// Import pages
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Detail from "./pages/detail/Detail";
import SearchResults from "./pages/SearchResults";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";

// Import CSS
import "./App.css";
import "swiper/css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <RouterRoutes>
            <Route path="/" element={<Navigate to="/react-movie-app" />} />
            <Route path="/react-movie-app" element={<Home />} />
            <Route path="/react-movie-app/:category" element={<Catalog />} />
            <Route path="/react-movie-app/:category/:id" element={<Detail />} />
            <Route path="/react-movie-app/:category/search/:keyword" element={<Catalog />} />
            <Route path="/react-movie-app/search/:query" element={<SearchResults />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/react-movie-app/favorites" element={<Favorites />} />


          </RouterRoutes>
          <Footer />
        </div>
      </BrowserRouter>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
