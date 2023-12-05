import React, { useState , useEffect } from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries, postActivity } from '../../Redux/Actions'

const Form = () => {

  const allCountries = useSelector(state => state.allCountriesBackUp)

  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(getCountries())
    },[])


  const [ state , setState] = useState({
    nombre:"",
    difficulty:0,
    duration:0,
    season:"",
    countries:[],
  })


  const [ error , setError] = useState({
    nombre:"Debe ingresar el nombre de la actividad",
    difficulty:"Debe ingresar un número entre 1 y 5",
    duration:"Debe ingresar la duración en horas",
    season:"Debe seleccionar una temporada",
    countries:"Debe seleccionar al menos un país",
  })


  const validate = (stateErr, name) => {
    switch (name) {
      case "nombre":
        if (stateErr.nombre === "") {
          setError({ ...error, nombre: "Debe ingresar el nombre de la actividad" });
        } else {
          setError({ ...error, nombre: "" });
        }
        break;
      case "difficulty":
        if (!isNaN(stateErr.difficulty) && parseInt(stateErr.difficulty) >= 1 && parseInt(stateErr.difficulty) <= 5) {
          setError({ ...error, difficulty: "" });
        } else {
          setError({ ...error, difficulty: "Debe ingresar un número entre 1 y 5" });
        }
        break;
      case "duration":
        if (isNaN(parseFloat(stateErr.duration))) {
          setError({ ...error, duration: "Debe ingresar la duración en horas" });
        } else {
          setError({ ...error, duration: "" });
        }
        break;
      case "season":
        if (stateErr.season === "") {
          setError({ ...error, season: "Debe seleccionar una temporada" });
        } else {
          setError({ ...error, season: "" });
        }
        break;
      case "countries":
        if (stateErr.countries === "") {
          setError({ ...error, countries: "Debe seleccionar al menos un país" });
        } else {
          setError({ ...error, countries: "" });
        }
        break;
    }
  };
  

  const disableFunction = () => {
    let estado = true;
    for( let i in error){
      if(error[i]==="") estado = false;
      else{
        estado = true;
        break;
      }
    }
    return estado;
  }


  const handleChange = (event) => {

    if(event.target.name==="countries"){

      // Evita que se guarde la selección repetida
      if(state.countries.includes(event.target.value)) return

      setState({
        ...state,
        // el array countries: una copia del state mas el value
        [event.target.name]: [...state.countries, event.target.value]
      })
    } else {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

    // El {} evita el delay de re-renderizado
    validate( {...state, [event.target.name]: event.target.value} , event.target.name)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postActivity(state));
    setState({
      nombre:"",
      difficulty:"",
      duration:"",
      season:"",
      countries:[],
    })
    setError({
      nombre:"Debe ingresar el nombre de la actividad",
      difficulty:"Debe ingresar un número entre 1 y 5",
      duration:"Debe ingresar la duración en horas",
      season:"Debe seleccionar una temporada",
      countries:"Debe seleccionar al menos un país",
    });
  }

  
  const handleDelete = (event) => {
    setState({
      ...state,
      [event.target.name]: [...state[event.target.name].filter( i => i!== event.target.id)]
    })
  }

  return (
    <div>

      <NavBar/>

      <div className='form-contenedor'>
        
        <form onSubmit={handleSubmit} className='form-contenedor-cont'>

          <label>Actividad:</label>
          <input name='nombre' onChange={handleChange} type="text" value={state.nombre} />
          <label className='form-error'>{error.nombre}</label>

          <label>Dificultad:</label>
          <input name='difficulty' onChange={handleChange} type="number" value={state.difficulty}/>
          <label className='form-error'>{error.difficulty}</label>

          <label>Duración:</label>
          <input name='duration' onChange={handleChange} type="text" value={state.duration}/>
          <label className='form-error'>{error.duration}</label>

          <label>Temporada</label>
          <select name="season" onChange={handleChange} value={state.season}>
            <option value="">Selecciona una temporada</option>
            <option value="Verano">Verano</option>
            <option value="Otoño">Otoño</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
          </select>
          <label className='form-error'>{error.season}</label>

          <label>Seleccionar países </label>
          <select name="countries" onChange={handleChange}>
            <option value="">Seleccionar un país</option>
            {allCountries?.map( (i) => <option key={i.id} value={i.name}>{i.name}</option>)}
          </select>
          <label className='form-error'>{error.countries}</label>

          <input disabled={disableFunction()} type="submit" />
        </form>
          <div>
            {
            state.countries.map( (i , index) => <div className='form-selector' key={index}>
              <label>{i}</label> <button name='countries' id={i} onClick={handleDelete}>x</button>
            </div>)
            }
          </div>
      </div>
    </div>
  )
}

export default Form;