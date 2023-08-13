import React from "react";
import { useParams } from "react-router";
import { Navbar } from "../components/Navbar";
import { useMovie } from "../contexts/MovieContext";

export const MovieDetails = () => { 
  const { state, dispatch } = useMovie();
  const { movieId } = useParams();
  console.log(typeof movieId)
  const movie = state.movies.find((movie) => movie.id === Number(movieId));
  if (!movie) {
    return <p>Movie not found.</p>;
  }

  const handleAddToWatchlist = () => {
    dispatch({ type: "ADD_TO_WATCHLIST", payload: movieId });
  };

  return (
    <div>
      <Navbar />
      <h2>Movie Details</h2>
      <img src={movie.imageURL} alt={movie.title} height={200} width={200} />
      <h3>{movie.title}</h3>
      <p>{movie.summary}</p>
      <p>Genre: {movie.genre.join(", ")}</p>
      <p>Year: {movie.year}</p>
      <p>Rating: {movie.rating}</p>

      <button onClick={handleAddToWatchlist}>
        {state.watchlist.some((item) => item.id === movie.id)
          ? "Added to Watchlist"
          : "Add to Watchlist"}
      </button>

      <button>Star</button>
    </div>
  );
};
