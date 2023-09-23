import axios from "axios"
import { GET_ACTIVITIES, GET_COUNTRIES , FILTER, RESET, PAGINA, GET_CONTINENTS, ORDER, GET_COUNTRIES_DETAILS, SEARCH } from "../Actions-types/Index"

export function postActivity(state){
    return async function(dispatch){
        console.log(state)
        try {
            await axios.post("http://localhost:3001/activities/" , state )
            console.log("Actividad creada")
        } catch (error) {
            console.log(error)
        }
    }
}

export function getCountries(){
    return async function(dispatch){
        try {
            const response = await axios.get ("http://localhost:3001/countries/")
            console.log(response)
            dispatch({
                type:GET_COUNTRIES,
                payload: response.data
            })
        } catch (error) {
            console.log("error")
        }
    }
}

export function getCountriesByID(idCountry){
    return async function(dispatch){
        try {
            const response = await axios.get (`http://localhost:3001/countries/${idCountry}`)
            console.log(response)
            dispatch({
                type:GET_COUNTRIES_DETAILS,
                payload: response.data
            })
        } catch (error) {
            console.log("error")
        }
    }
}

export function getActivities(){
    return async function(dispatch){
        try {
            const response = await axios.get ("http://localhost:3001/activities/")
            console.log(response)
            dispatch({
                type:GET_ACTIVITIES,
                payload: response.data
            })
        } catch (error) {
            console.log("error")
        }
    }
}

export function searchCountries(name){
    return async function(dispatch){
        try {
            dispatch({
                type: SEARCH,
                payload: name
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export function getAllContinents(){
    return async function(dispatch){
        try {
            const response = await axios.get ("http://localhost:3001/countries/continents")
            console.log(response)
            dispatch({
                type:GET_CONTINENTS,
                payload: response.data
            })
        } catch (error) {
            console.log("error")
        }
    }
}


export function filterByActivity(seleccion){
    console.log(seleccion)
    return async function(dispatch){
        try {
            dispatch({
                type:FILTER,
                payload: {value: seleccion,
                          type:"activity"}
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function filterByContinent(seleccion){
    return async function(dispatch){
        try {
            dispatch({
                type:FILTER,
                payload: {value: seleccion,
                          type:"continent"}
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function order(order) {
    return function(dispatch){
        dispatch({
            type:ORDER,
            payload:order
        })
    }
}

export function reset(){
    return async function(dispatch){
        try {
            dispatch({
                type:RESET,
            })
        } catch (error) {
            console.log("error")
        }
    }
}

export function pagina(prevnext){
    return async function(dispatch){
            dispatch({
                type:PAGINA,
                payload:prevnext,
            })
    }
}