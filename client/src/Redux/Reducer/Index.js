import { GET_ACTIVITIES, GET_COUNTRIES } from "../Actions-types/Index";

// Estado inicial
let initialState = {
    allCountries: [],
    allCountriesBackUp: [],
    allActivities: [],
}

//
function rootReducer(state=initialState, action){
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                allCountries: action.payload
            }
        case GET_ACTIVITIES:
            return {
                ...state,
                allActivities: action.payload
            }
    
        default:
            return state
    }
}

export default rootReducer;