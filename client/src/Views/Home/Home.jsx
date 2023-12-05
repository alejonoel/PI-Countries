import React, { useEffect } from 'react';
import { useDispatch, useSelector }  from "react-redux"
import NavBar from '../../Components/NavBar/NavBar';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { filterByActivity, filterByContinent, getActivities, getAllContinents, getCountries , order, pagina, reset} from '../../Redux/Actions';
import Cards from '../../Components/Cards/Cards';

const Home = () => {

  const dispatch = useDispatch();
  const allCountries = useSelector(state => state.allCountries);
  const allActivities = useSelector(state => state.allActivities)
  const allContinents = useSelector(state => state.allContinents);
  const paginaActual = useSelector(state => state.paginaActual);
  const totalPaginas = useSelector(state => state.totalPages);


  useEffect( () => {
      dispatch(getCountries())
      dispatch(getActivities())
      dispatch(getAllContinents())
      return () => dispatch(reset())
  },[])

  const filterActivity = (event) => {
    dispatch(filterByActivity(event.target.value))
  }

  const filterContinent = (event) => {
    dispatch(filterByContinent(event.target.value))
  }

  const orden = (event) => {
    dispatch(order(event.target.name))
  }

  const pagination = (event) =>{
    dispatch(pagina(event.target.name))
  }



  return (
    <div>
      <div><NavBar/></div>
      <div className='nav-home'>
          <div>
            <button className='action-button' onClick={orden} name="AZ">A-Z</button>
            <button className='action-button' onClick={orden} name="ZA">Z-A</button>
            <button className='action-button' onClick={orden} name="populationMax">🠋 Population</button>
            <button className='action-button' onClick={orden} name="populationMin">🠉 Population</button>
          </div>

          <SearchBar/>
          
          <div>
            <select className='filter-button' onChange={filterActivity} name='filter' id=''>
              <option value="" >Select Activity</option>
              {
                allActivities.map( i => 
                <option key= {i.id} value={i.nombre}>{i.nombre}</option>)
              }
            </select>
            <select className='filter-button' onChange={filterContinent} name='filter' id=''>
              <option value="">Select Continent</option>
              {
                allContinents.map( i => 
                <option key= {i} value={i}>{i}</option>)
              }
            </select>
            <button className='action-button' onClick={() => {dispatch(reset())}}>Clean filters</button>
          </div>
        </div>
      <Cards allCountries={allCountries}></Cards>
      <div>
        <button className='action-button' name='prev' onClick={pagination}>Prev</button>
        <label>Page {paginaActual} of {totalPaginas}</label>
        <button className='action-button' name='next' onClick={pagination}>Next</button>
      </div>
    </div>
    
  )
}

export default Home