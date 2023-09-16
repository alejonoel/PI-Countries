import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector }  from "react-redux"
import NavBar from '../../Components/NavBar/NavBar';
import { getActivities, getCountries } from '../../Redux/Actions';
import Cards from '../../Components/Cards/Cards';

const Home = () => {

  const [ state , setState ] = useState();
  const dispatch = useDispatch()
  const allCountries = useSelector(state => state.allCountries)

  // Simula el ciclo de vida del componente
  useEffect( () => {
      // Cuando el componenete se monta
      dispatch(getCountries())
      dispatch(getActivities())
  },[])

  return (
    <div>
      <div><NavBar/></div>
      <Cards allCountries={allCountries}></Cards>
    </div>
    
  )
}

export default Home