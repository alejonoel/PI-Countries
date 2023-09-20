import React, { useState , useEffect } from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries, postActivity } from '../../Redux/Actions'

const Form = () => {

  // Hook que trae la información del estado global
  const allCountries = useSelector(state => state.allCountriesBackUp)

  //
  const dispatch = useDispatch();

  // Simula el ciclo de vida del componente
  useEffect( () => {
    // Cuando el componenete se monta
    dispatch(getCountries())
    },[])

  // Inicializamos el estado donde se guarda los datos cargados
  const [ state , setState] = useState({
    nombre:"",
    difficulty:0,
    duration:0,
    season:"",
    countries:[],
  })

  // Inicializamos el estado de chequeo de errores
  const [ error , setError] = useState({
    nombre:"Debe ingresar el nombre de la actividad",
    difficulty:"Debe ingresar un número entre 1 y 5",
    duration:"Debe ingresar la hora en formato minutos",
    season:"Debe seleccionar una temporada",
    countries:"Debe seleccionar al menos un país",
  })
  
  // Las condiciones de error
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
  
  // Función que deshabilita el boton de enviar
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

  // LLeva la información cargado en el input al estado
  const handleChange = (event) => {

    // Si es el select countries, guarda en el array los valores
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
  
  // Previene que se borren los datos cargados en los campos. Evita la recarga de la página.
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
      duration:"Debe ingresar la hora en formato minutos",
      season:"Debe seleccionar una temporada",
      countries:"Debe seleccionar al menos un país",
    });
  }

  // Borra una selección
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
        {console.log(state)}
        <form onSubmit={handleSubmit} className='form-contenedor-cont'>

          <label>Actividad:</label>
          <input name='nombre' onChange={handleChange} type="text" value={state.nombre} />
          <label className='form-error'>{error.nombre}</label>

          <label>Dificultad:</label>
          <input name='difficulty' onChange={handleChange} type="text" value={state.difficulty}/>
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
          <div>
            {
            state.countries.map( (i , index) => <div className='form-selector' key={index}>
              <label>{i}</label> <button name='countries' id={i} onClick={handleDelete}>x</button>
            </div>)
            }
          </div>

          <input disabled={disableFunction()} type="submit" />
        </form>
      </div>
    </div>
  )
}

export default Form;