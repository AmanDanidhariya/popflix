import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}`;

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState({ showError: "false", errorMessage: "" });
  const [query , setQuery] = useState("")

  const getMovies = async (url) => {
    try {
      //loading indicator value true
      setIsLoading(true);
      const response = await axios.get(url);
      const data = response.data.results;
      //if we have data then update in movies
      if (data) {
        //loading indicator value false
        setIsLoading(false);
        //update data in movies array
        setMovies(data);
      } else {
        setError({
          showError: true,
          errorMessage: data.error,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
   let clearTimer =  setTimeout(()=>{
        //if we have query then search movie at search end point 
    if(query){
      getMovies(`${SEARCH_URL}&query=${query}`);
    }else{
      getMovies(API_URL);
    }
    },900)
    //make only one request after enter query 
    return ()=> clearTimeout(clearTimer);
    
  }, [query]);

  return (
    <MovieContext.Provider value={{ isLoading, error, movies, query , setQuery }}>
      {children}
    </MovieContext.Provider>
  );
};

//custom hook
const useMovie = () => {
  return useContext(MovieContext);
};

export { MovieContext, MovieProvider, useMovie };
