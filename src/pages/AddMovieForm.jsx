// AddMovieForm.js
import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { useMovie } from "../contexts/MovieContext";

export const AddMovieForm = ({ onClose }) => {
  const { dispatch } = useMovie();
  const [newMovie, setNewMovie] = useState({
    title: "",
    summary: "",
    year: "",
    cast: "",
    genre: [],
    rating: "",
    director: "",
    writer: "",
    imageURL: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
  };

  const handleGenreChange = (event) => {
    const { value } = event.target;
    setNewMovie((prevMovie) => {
      const updatedGenre = prevMovie.genre.includes(value)
        ? prevMovie.genre.filter((genre) => genre !== value)
        : [...prevMovie.genre, value];
      return {
        ...prevMovie,
        genre: updatedGenre,
      };
    });
  };

  const handleAddMovie = () => {
    dispatch({ type: "ADD_MOVIE", payload: newMovie });
    onClose();
  };
  const ratingOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const genreOptions = [
    "Action",
    "Crime",
    "Adventure",
    "Fantasy",
    "Biography",
    "Sci-fi",
    "Romance",
  ];
  return (
    <div>
      <Navbar />
      <h2>Add a New Movie</h2>
      <form>
        <div>
          {" "}
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={newMovie.title}
            onChange={handleInputChange}
            className="border-black"
          />
        </div>
        <div>
          <label>Summary:</label>
          <textarea
            name="summary"
            value={newMovie.summary}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label>Year:</label>
          <input
            type="text"
            name="year"
            value={newMovie.year}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Cast:</label>
          <input
            type="text"
            name="cast"
            value={newMovie.cast}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Genre:</label>
          {genreOptions.map((item) => (
            <label>
              <input
                type="checkbox"
                name="genre"
                value={item}
                checked={newMovie.genre.includes(item)}
                onChange={handleGenreChange}
              />
              {item}
            </label>
          ))}
        </div>
        <div>
          <label>Rating:</label>
          <select
            name="rating"
            value={newMovie.rating}
            onChange={handleInputChange}
          >
            <option value="">Select Rating</option>
            {ratingOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Director:</label>
          <input
            type="text"
            name="director"
            value={newMovie.director}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Writer:</label>
          <input
            type="text"
            name="writer"
            value={newMovie.writer}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Image URL:</label>
          <input
            type="file"
            name="imageURL"
            value={newMovie.imageURL}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleAddMovie} className="bg-green-200">
          Add Movie
        </button>
        <button type="button" onClick={onClose} className="bg-red-500">
          Cancel
        </button>
      </form>
    </div>
  );
};
