import React from 'react'

const Card = ({country}) => {
  return (
    <div className='card-contenedor'>
        <div className='card-imagen'>
            <img src={country.image} alt="" />
        </div>
        <div className='card-estilo'>
            <h2>{country.name}</h2>
            <h3>{country.continent}</h3>
        </div>
    </div>
  )
}

export default Card