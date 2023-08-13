import React from "react";
import { useNavigate } from "react-router";
import { useMovie } from "../contexts/MovieContext";

export const Navbar = () => {
  const { state, dispatch } = useMovie();
const navigate = useNavigate()
  const handleSearch = (event) => {
    const searchQuery = event.target.value;
    dispatch({ type: "SET_SEARCH_QUERY", payload: searchQuery });
  };
  return (
    <div className="flex justify-between p-2 cursor-pointer">
      <h3 onClick={()=>navigate("/")}>IMDB</h3>
      <input
        type="text"
        placeholder="Search movies by title,cast and director"
        onChange={handleSearch}
      />
      <ul className="flex gap-2">
        <li className="cursor-pointer">movies</li>
        <li className="cursor-pointer" onClick={()=>navigate("/watchlist")}>Watch list</li>
      </ul>
    </div>
  );
};
