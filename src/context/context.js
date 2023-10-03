import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}`;

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState({ showError: "false", errorMessage: "" });
  const [query , setQuery] = useState("")

  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      //loading indicator value true
      const response = await axios.get(url);
      const data = response.data.results;
      //if we have data then update in movies
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
      })
      console.log(error.message);
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
    },500)
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
