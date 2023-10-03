import React from 'react'
import { useMovie } from '../context/context'
import { NavLink } from 'react-router-dom';
import styles from "./Movies.module.css"

const Movies = () => {
  //get movie data from context  
const {movies} = useMovie();
  console.log(movies);
  return (
    <>
    <section>
      <div className={styles.container}>
      {movies.map((movie)=>{
        const {id, title, poster_path, vote_average} = movie;
        const poster= `https://image.tmdb.org/t/p/original${poster_path}`
        return (
         <NavLink to={`movie/${id}`}  key={movie.id}>
          <div className={styles.column}>
          <img src={poster} alt={`${title} movie`} className={styles.poster_img}/>
            <div className={styles.movie_details}>         
              <p className={styles.title}><span className={styles.fontBold}>Title:-</span> {movie.title}</p>
              <p className={styles.rating}><span className={styles.fontBold}>Rating:- </span>{vote_average}</p>
            </div>
          </div>
         </NavLink> 
        )
      })}
      </div>
    </section>
     
    </>
  )
}

export default Movies