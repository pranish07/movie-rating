import React, { createContext, useContext, useEffect, useReducer } from "react";
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/storageUtils';
import { movies } from "../data";

export const MovieContext = createContext();

const initialState = {
  movies: movies,
  watchlist: [],
  searchQuery:"",
  // starred: [],
};

const movieReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_STATE':
        return { ...action.payload };
    case "ADD_MOVIE":
      return {
        ...state,
        movies: [...state.movies, action.payload],
      };
      case "SET_SEARCH_QUERY":
        return{
            ...state,
            searchQuery:action.payload
        }
    case "ADD_TO_WATCHLIST":
        const movieToAdd = state.movies.find(movie=>movie.id===action.payload)
      return {
        ...state,
        watchlist: [...state.watchlist, movieToAdd],
      };
    case "REMOVE_FROM_WATCHLIST":
      return {
        ...state,
        watchlist: state.watchlist.filter((movie) => movie.id !== action.payload),
      };
    //   case 'MARK_STARRED':
    //     return {
    //       ...state,
    //       starred: [...state.starred, action.payload],
    //     };
    //   case 'UNMARK_STARRED':
    //     return {
    //       ...state,
    //       starred: state.starred.filter(id => id !== action.payload),
    //     };
    default:
      return state;
  }
};

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  useEffect(() => {
    const persistedState = loadFromLocalStorage('movieState');
    if (persistedState) {
      dispatch({ type: 'INITIALIZE_STATE', payload: persistedState });
    }
  }, []);
  useEffect(() => {
    saveToLocalStorage('movieState', state);
  }, [state]);


  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};
export const useMovie = () => useContext(MovieContext);
