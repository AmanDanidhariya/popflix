import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./SingleCard.module.css";
import { NavLink, useParams } from "react-router-dom";

const SingleCard = () => {
  //for getting id
  const { id } = useParams();
  const [isLoading, setIsLoading, error, setError] = useState(true);
  const [movies, setMovies] = useState("");
  const MOVIE_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`;
  const poster = `https://image.tmdb.org/t/p/original${movies.poster_path}`;

  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      //loading indicator value true
      const response = await axios.get(url);
      const data = response.data;
      // if we have data then update in movies
      if (data) {
        //loading indicator value false
        setIsLoading(false);
        //update data in movies array
        setMovies(data);
      }
    } catch (error) {
      setError({
        showError: true,
        errorMessage: error.message,
      });
      console.log(error.message);
    }
  };

  useEffect(() => {
    // setIsLoading(true);
    let clearTimer = setTimeout(() => {
      getMovies(MOVIE_URL);
    }, 500);

    //make only one request after enter query
    return () => clearTimeout(clearTimer);
  }, [MOVIE_URL]);

  //adding a loading state while api calling
  if (isLoading) {
    return (
      <div className="loading_section">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <section className={styles.movie_section}>
        <div className={styles.movie_card}>
          <figure className={styles.poster}>
            <img src={poster} alt={movies.original_title} />
          </figure>

          <div className={styles.movie_info}>
            <p style={{ fontSize: "1.5rem" }} className={styles.movie_title}>
              <span className={styles.movieName}>{movies.title}</span>
            </p>
            <p>{movies.release_date}</p>
            <p
              style={{ color: movies.status === "Released" ? "green" : "red" }}
            >
              {movies.status}
            </p>
            <p>{movies.tagline}</p>
            <NavLink to="/" className={styles.button}>
              Back
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleCard;
