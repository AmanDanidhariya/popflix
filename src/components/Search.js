import React from "react";
import { useMovie } from "../context/context";
import styles from "./Search.module.css"

const Search = () => {
  const { query, setQuery, error } = useMovie();
  return (
    <div className={styles.search_container}>
      <form action="#" onSubmit={(e) => e.preventDefault()}>
        <div className="search_div">
          <input type="text" placeholder="search here" value={query} onChange={(e)=>setQuery(e.target.value)} className={styles.input_container}/>
        </div>
      </form>
      <div className="movie_card_error">
        <p>{error.show && error.errorMessage}</p>
      </div>
    </div>
  );
};

export default Search;
