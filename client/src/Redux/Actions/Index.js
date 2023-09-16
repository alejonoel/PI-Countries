import axios from "axios"
import { GET_ACTIVITIES, GET_COUNTRIES } from "../Actions-types/Index"

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