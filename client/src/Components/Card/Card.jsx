import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({country}) => {
  return (
    <div className='card-contenedor'>
      <Link to={`/details/${country.id}`}>
        <div className='card-imagen'>
            <img src={country.image} alt="" />
        </div>
        <div className='card-estilo'>
            <h4>{country.name}</h4>
            <h5>{country.continent}</h5>
        </div>
        </Link>
    </div>
  )
}

export default Card