import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import SingleCard from "./components/SingleCard"
import PageNotFound from './components/PageNotFound';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="movie/:id" element={<SingleCard/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
