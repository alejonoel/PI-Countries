import React from 'react'
import Card from '../Card/Card';


const Cards = ({allCountries}) => {
  return (
     <div className='cards-contenedor'> 

          {allCountries?.map( i => 
          <Card key={i.id} country={i}/> )}

    </div>
  )
}

export default Cards