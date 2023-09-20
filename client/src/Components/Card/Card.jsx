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
            <h3>{country.name}</h3>
            <h4>{country.continent}</h4>
        </div>
        </Link>
    </div>
  )
}

export default Card