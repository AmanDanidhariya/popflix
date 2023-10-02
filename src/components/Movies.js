import React from 'react'
import { useMovie } from '../context/context'

const Movies = () => {
  //get movie data from context  
const {movies} = useMovie();
  console.log(movies);
  return (
    <>
      {movies.map((movie)=>{
        return (
          <>
            <h2>{movie.original_title}</h2>
          </>
        )
      })}
    </>
  )
}

export default Movies