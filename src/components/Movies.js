import React from "react";
import { useMovie } from "../context/context";
import { NavLink } from "react-router-dom";
import styles from "./Movies.module.css";

const Movies = () => {
  //get movie data from context
  const { movies, query,isLoading } = useMovie();

  //adding a loading state while api calling
  if(isLoading){
    return(
      <div className="loading_section">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  return (
    <>
      <section>
        <div className={styles.container}>
          {query.length > 0 ? (
            <>
              {/* if query has length then only show 10 result */}
              {movies.slice(0, 10).map((movie) => {
                const { id, title, poster_path, vote_average } = movie;
                const movieName = title.substring(0, 15);
                const poster = `https://image.tmdb.org/t/p/original${poster_path}`;
                return (
                  <NavLink to={`movie/${id}`} key={movie.id}>
                    <div className={styles.column}>
                      <img
                        src={poster}
                        alt={`${title} movie`}
                        className={styles.poster_img}
                      />
                      <div className={styles.movie_details}>
                        <p className={styles.title}>
                          <span className={styles.fontBold}>Title:-</span>
                          <span className={styles.movie_details_font}>
                            {movieName.length > 8
                              ? `${movieName}...`
                              : movieName}
                          </span>
                        </p>
                        <p className={styles.rating}>
                          <span className={styles.fontBold}>Rating:- </span>
                          <span className={styles.movie_details_font}>
                            {vote_average}
                          </span>
                        </p>
                      </div>
                    </div>
                  </NavLink>
                );
              })}
            </>
          ) : (
            <>
              {movies.map((movie) => {
                const { id, title, poster_path, vote_average } = movie;
                const movieName = title.substring(0, 15);
                const poster = `https://image.tmdb.org/t/p/original${poster_path}`;
                return (
                  <NavLink to={`movie/${id}`} key={movie.id}>
                    <div className={styles.column}>
                      <img
                        src={poster}
                        alt={`${title} movie`}
                        className={styles.poster_img}
                      />
                      <div className={styles.movie_details}>
                        <p className={styles.title}>
                          <span className={styles.fontBold}>Title:-</span>
                          <span className={styles.movie_details_font}>
                            {movieName.length > 8
                              ? `${movieName}...`
                              : movieName}
                          </span>
                        </p>
                        <p className={styles.rating}>
                          <span className={styles.fontBold}>Rating:- </span>
                          <span className={styles.movie_details_font}>
                            {vote_average}
                          </span>
                        </p>
                      </div>
                    </div>
                  </NavLink>
                );
              })}
            </>
          )}

          {/* {movies.map((movie) => {
            const { id, title, poster_path, vote_average } = movie;
            const movieName = title.substring(0, 15);
            const poster = `https://image.tmdb.org/t/p/original${poster_path}`;
            return (
              <NavLink to={`movie/${id}`} key={movie.id}>
                <div className={styles.column}>
                  <img
                    src={poster}
                    alt={`${title} movie`}
                    className={styles.poster_img}
                  />
                  <div className={styles.movie_details}>
                    <p className={styles.title}>
                      <span className={styles.fontBold}>Title:-</span>
                      <span className={styles.movie_details_font}>
                        {movieName.length > 8 ? `${movieName}...` : movieName}
                      </span>
                    </p>
                    <p className={styles.rating}>
                      <span className={styles.fontBold}>Rating:- </span>
                      <span className={styles.movie_details_font}>
                        {vote_average}
                      </span>
                    </p>
                  </div>
                </div>
              </NavLink>
            );
          })} */}
        </div>
      </section>
    </>
  );
};

export default Movies;
