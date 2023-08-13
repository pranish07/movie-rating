import React from 'react'
import { Navbar } from '../components/Navbar'
import { useMovie } from '../contexts/MovieContext'

export const WatchList = () => {
  const {state,dispatch} = useMovie()
  const handleRemoveFromWatchlist = (movieId)=>{
    dispatch({type:"REMOVE_FROM_WATCHLIST",payload:movieId})
  }
  console.log(state.watchlist)
  return (
    <div>
      <Navbar />

      <h2>Watchlist</h2>
      {state.watchlist.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        state.watchlist.map((movie) => (
          <div key={movie.id}>
            <img src={movie.imageURL} alt={movie.title} height={200} width={200} />
            <h3>{movie.title}</h3>
            <p>{movie.summary}</p>
            <button onClick={() => handleRemoveFromWatchlist(movie.id)}>
              Remove from Watchlist
            </button>
          </div>
        ))
      )}
    </div>
  )
}
