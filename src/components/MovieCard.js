import React from 'react'
import { useParams } from 'react-router-dom'

const MovieCard = () => {
    const { id } = useParams();
  return (
    <div>MovieCard {id}</div>
  )
}

export default MovieCard