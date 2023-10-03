import React from 'react'
import { useParams } from 'react-router-dom'

const SingleCard = () => {
    const { id } = useParams();
  return (
    <div>MovieCard {id}</div>
  )
}

export default SingleCard