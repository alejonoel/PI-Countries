import React, { useEffect } from 'react';
import { useDispatch, useSelector }  from "react-redux"
import NavBar from '../../Components/NavBar/NavBar';
import { filterByActivity, filterByContinent, getActivities, getAllContinents, getCountries , order, pagina, reset} from '../../Redux/Actions';
import Cards from '../../Components/Cards/Cards';

const Home = () => {

  const dispatch = useDispatch();
  const allCountries = useSelector(state => state.allCountries);
  const allActivities = useSelector(state => state.allActivities)
  const allContinents = useSelector(state => state.allContinents);
  const paginaActual = useSelector(state => state.paginaActual);
  const totalPaginas = useSelector(state => state.totalPages);


  // Simula el ciclo de vida del componente
  useEffect( () => {
      // Cuando el componenete se monta
      dispatch(getCountries())
      dispatch(getActivities())
      dispatch(getAllContinents())
  },[])

  const filterActivity = (event) => {
    console.log(event.target.value)
    dispatch(filterByActivity(event.target.value))
  }

  const filterContinent = (event) => {
    dispatch(filterByContinent(event.target.value))
  }

  const orden = (event) => {
    dispatch(order(event.target.name))
  }

  const pagination = (e) =>{
    dispatch(pagina(e.target.name))
  }



  return (
    <div>
      <div><NavBar/></div>
      <div>
        <button onClick={orden} name="AZ">A-Z</button>
        <button onClick={orden} name="ZA">Z-A</button>
        <button onClick={orden} name="populationMax">Descending Population</button>
        <button onClick={orden} name="populationMin">Ascending Population</button>
      </div>
      <select onChange={filterActivity} name='filter' id=''>
        <option value="" >Select Activity</option>
        {
          allActivities.map( i => 
          <option key= {i.id} value={i.nombre}>{i.nombre}</option>)
        }
      </select>
      <select onChange={filterContinent} name='filter' id=''>
        <option value="">Select Continent</option>
        {
          allContinents.map( i => 
          <option key= {i} value={i}>{i}</option>)
        }
      </select>
      <button onClick={() => {dispatch(reset())}}>Clean filters</button>
      <Cards allCountries={allCountries}></Cards>
      <div>
        <button name='prev' onClick={pagination}>Prev</button>
        <label>Page {paginaActual} of {totalPaginas}</label>
        <button name='next' onClick={pagination}>Next</button>
      </div>
    </div>
    
  )
}

export default Home