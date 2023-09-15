import React, { useEffect, useState } from 'react';
import { useDispatch }  from "react-redux"
import NavBar from '../../Components/NavBar/NavBar';
import { getCountries } from '../../Redux/Actions';

const Home = () => {

  const [ state , setState ] = useState();

  const dispatch = useDispatch()

  // Simula el ciclo de vida del componente
  useEffect( () => {
      // Cuando el componenete se monta
      dispatch(getCountries())
  },[ dispatch , state ])

  return (
    <div><NavBar/></div>
    
  )
}

export default Home