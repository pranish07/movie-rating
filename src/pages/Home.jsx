import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Navbar } from "../components/Navbar";
import { useMovie } from "../contexts/MovieContext";

export const Home = () => {
  const { state, dispatch } = useMovie();
  const navigate  = useNavigate();

  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  const handleAddToWatchlist = (movieId) => {
    dispatch({ type: "ADD_TO_WATCHLIST", payload: movieId });
  };
  console.log(state.watchlist);

  const filteredMovies = state?.movies.filter((movie) => {
    const matchesYear =
      selectedYear === "" || movie?.year.toString() === selectedYear;
    const matchesGenre =
      selectedGenre === "all" || movie?.genre.includes(selectedGenre);
    const matchesRating =
      selectedRating === "" || movie?.rating >= parseInt(selectedRating);

    const searchKeywords = state.searchQuery.toLowerCase().split(" ");
    const matchSearch = searchKeywords.some((keyword) => {
      return (
        movie.title.toLowerCase().includes(keyword) ||
        movie.cast.some((actor) => actor.toLowerCase().includes(keyword)) ||
        movie.director.toLowerCase().includes(keyword)
      );
    });

    return (
      (matchesGenre || selectedGenre === "all") &&
      (matchesYear || selectedYear === "") &&
      (matchesRating || selectedRating === "") &&
      (matchSearch || state.searchQuery === "")
    );
  });

  const movieGenres = state?.movies?.reduce((acc, curr) => {
    curr?.genre?.forEach((genre) => {
      if (!acc.includes(genre)) {
        acc.push(genre);
      }
    });

    return acc;
  }, []);

  const getMovieYears = state?.movies?.reduce((years, movie) => {
    if (!years.includes(movie.year)) {
      years.push(movie.year);
    }
    return years;
  }, []);

  const handleOpenAddMovieForm = () => {
    setIsAddingMovie(true);
  };

  const handleCloseAddMovieForm = () => {
    setIsAddingMovie(false);
  };

  return (
    <div>
      <Navbar />
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="all">All Genres</option>
        {movieGenres.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>

      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        <option value="">All Years</option>
        {getMovieYears.map((year, index) => (
          <option value={year} key={index}>
            {year}
          </option>
        ))}
      </select>

      <select
        value={selectedRating}
        onChange={(e) => setSelectedRating(e.target.value)}
      >
        <option value="">All Ratings</option>
        <option value="1">1+</option>
        <option value="2">2+</option>
        <option value="3">3+</option>
        <option value="4">4+</option>
        <option value="5">5+</option>
        <option value="6">6+</option>
        <option value="7">7+</option>
        <option value="8">8+</option>
        <option value="9">9+</option>
      </select>
      <button onClick={()=>navigate("/addmovie")}>Add a movie</button>
      {/* Movie listing */}
      <div>
        {filteredMovies.map((movie) => (
          <div key={movie.id}>
            <img
              src={movie.imageURL}
              alt={movie.title}
              height={200}
              width={200}
            />
            <h3>{movie.title}</h3>
            <p>{movie.summary}</p>
            <button
              onClick={() => handleAddToWatchlist(movie.id)}
              disabled={state.watchlist.includes(movie.id)}
            >
              {state.watchlist.some((item) => item.id === movie.id)
                ? "Added to Watchlist"
                : "Add to Watchlist"}
            </button>

            <button>Star</button>
            {/* <button
              onClick={() => handleMarkStarred(movie.id)}
              disabled={state.starred.includes(movie.id)}
            > */}
            {/* {state.starred.includes(movie.id) ? 'Starred' : 'Star'} */}
            {/* </button> */}
            <a href={`/movieDetails/${movie.id}`}>View Details</a>
          </div>
        ))}
      </div>
    </div>
  );
};
