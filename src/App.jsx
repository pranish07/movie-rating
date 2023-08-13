import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import {AddMovieForm} from "./pages/AddMovieForm";
import { Home } from "./pages/Home";
import { MovieDetails } from "./pages/MovieDetails";
import { Search } from "./pages/Search";
import { WatchList } from "./pages/WatchList";

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movieDetails/:movieId" element={<MovieDetails />} />
        <Route path="/watchlist" element={<WatchList />} />
        <Route path="/addmovie" element={<AddMovieForm />} />
      </Routes>
    </div>
  );
};
