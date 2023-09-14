import React, { useState } from 'react'
import NavBar from '../../Components/NavBar/NavBar'

const Form = () => {

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
    nombre:"Ingrese el nombre de la actividad",
    difficulty:"Debe ingresar un número entre 1 y 5",
    duration:"Debe ingresar la hora en formato minutos",
    season:"Debe seleccionar una temporada",
    countries:"",
  })
  
  // Las condiciones de error
  const validate = (stateErr, name) => {
    switch (name) {
      case "nombre":
        if (stateErr.nombre === "") {
          setError({ ...error, nombre: "El nombre de la actividad es requerido" });
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
          setError({ ...error, duration: "Debe ingresar la hora en formato minutos" });
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
        // Lógica de validación para "countries"
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
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
    // El {} evita el delay de re-renderizado
    validate( {...state, [event.target.name]: event.target.value} , event.target.name)
  }
  
  // Previene que se borren los datos cargados en los campos. Evita la recarga de la página.
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(state)
  }


  return (
    <div>

      <NavBar/>

      <div className='form-contenedor'>
        {console.log(error)}
        <form onSubmit={handleSubmit} className='form-contenedor-cont'>

          <label>Actividad:</label>
          <input name='nombre' onChange={handleChange} type="text" />
          <label className='form-error'>{error.nombre}</label>

          <label>Dificultad:</label>
          <input name='difficulty' onChange={handleChange} type="text" />
          <label className='form-error'>{error.difficulty}</label>

          <label>Duración:</label>
          <input name='duration' onChange={handleChange} type="text" />
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
          <input name='countries' onChange={handleChange} type="text" />
          <label className='form-error'>{error.countries}</label>

          <input disabled={disableFunction()} type="submit" />
        </form>
      </div>
    </div>
  )
}

export default Form