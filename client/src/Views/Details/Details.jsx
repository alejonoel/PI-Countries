import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCountriesByID } from '../../Redux/Actions';
import NavBar from '../../Components/NavBar/NavBar';

const Details = () => {

  const dispatch = useDispatch();
  const params = useParams();
  const countryDetails = useSelector((state) => state.countriesDetails);

  useEffect( () => {
    dispatch(getCountriesByID(params.id))
  },[])

  return (
      <div>
        <div><NavBar/></div>
        <div className='details-conten'>
          <div>
            <h1>{countryDetails.name}</h1>
            <img src={countryDetails.image} alt="" />
          </div>
          <div>
            <label >ID: {countryDetails.id}</label>
            <label >Continent: {countryDetails.continent}</label>
            <label >Subregion: {countryDetails.subregion}</label>
            <label >Capital: {countryDetails.capital}</label>
            <label >Area: {countryDetails.area}</label>
            <label >Population: {countryDetails.population}</label>
          </div>
        </div>
    </div>
  )
}

export default Details