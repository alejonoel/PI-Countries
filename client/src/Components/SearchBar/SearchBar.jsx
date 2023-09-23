import React from 'react'
import { useDispatch } from 'react-redux';
import { searchCountries } from '../../Redux/Actions';


const SearchBar = () => {

  const dispatch = useDispatch();
  
  const busqueda = (event) => {
      console.log(event.target.value)
      dispatch(searchCountries(event.target.value))
    }
  return (
    <input type="text" onChange={busqueda}/> 
  )
}

export default SearchBar