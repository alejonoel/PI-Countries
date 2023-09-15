import { GET_COUNTRIES } from "../Actions-types/Index";

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
    
        default:
            return state
    }
}

export default rootReducer;