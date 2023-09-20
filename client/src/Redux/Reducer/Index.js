import { FILTER, GET_ACTIVITIES, GET_CONTINENTS, GET_COUNTRIES, GET_COUNTRIES_DETAILS, ORDER, PAGINA, RESET } from "../Actions-types/Index";

// Estado inicial
let initialState = {
    allCountries: [],
    allCountriesBackUp: [],
    allActivities: [],
    allContinents:[],
    countriesFiltrados:[],
    countriesDetails:{},
    filter: false,
    paginaActual:0,
    totalPages:0
}

//
function rootReducer(state=initialState, action){
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                allCountries: [...action.payload].splice(0,10),
                allCountriesBackUp: action.payload,
                totalPages: action.payload.length/10
            }
        case GET_COUNTRIES_DETAILS:
            return {
                ...state,
                countriesDetails: action.payload,
                totalPages: 0
            }
        case GET_ACTIVITIES:
            return {
                ...state,
                allActivities: action.payload
            }
        case GET_CONTINENTS:
            return {
                ...state,
                allContinents: action.payload
            }
        case FILTER:
            switch (action.payload.type) {
                case "activity":
                    let listaActivitiesFiltrados = [...state.allCountriesBackUp].filter( (i) => i.Activities.some((a) =>
                    a.nombre === action.payload.value));
                    return{
                        ...state,
                        // some: devuelve un booleano si alguno de los elementos cumple la condición
                        countriesFiltrados: listaActivitiesFiltrados,
                        allCountries: listaActivitiesFiltrados.splice(0,10),
                        filter:true,
                        paginaActual:0,
                        totalPages:Math.floor(listaActivitiesFiltrados.length/10)
                    }
                case "continent":
                    let listaFiltrados = [...state.allCountriesBackUp].filter((i)=> 
                    i.continent === action.payload.value);
                    return {
                        ...state,
                        countriesFiltrados: listaFiltrados,
                        allCountries: listaFiltrados.splice(0,10),
                        filter:true,
                        paginaActual:0,
                        totalPages:Math.floor(listaFiltrados.length/10)
                    }
            }
            case ORDER:
                switch (action.payload) {
                    case "AZ":
                    let asc = [...state.allCountriesBackUp].sort(( primero, segundo ) => {
                        if(primero.name>segundo.name) return 1;
                        if(primero.name<segundo.name) return -1;
                        return 0;
                    })
                    return{
                        ...state,
                        allCountries: [...asc].splice(0, 10),
                        allCountriesBackUp: asc,
                        paginaActual: 0
                    }
                    case "ZA":
                    let desc = [...state.allCountriesBackUp].sort(( primero, segundo ) => {
                        if(primero.name>segundo.name) return -1;
                        if(primero.name<segundo.name) return 1;
                        return 0;
                    })
                    return{
                        ...state,
                        allCountries: [...desc].splice(0, 10),
                        allCountriesBackUp: desc,
                        paginaActual: 0
                    }
                    case "populationMax":
                    let max = [...state.allCountriesBackUp].sort(( primero, segundo ) => {
                        if(primero.population>segundo.population) return -1;
                        if(primero.population<segundo.population) return 1;
                        return 0;
                    })
                    return{
                        ...state,
                        allCountries: [...max].splice(0, 10),
                        allCountriesBackUp: max,
                        paginaActual: 0
                    }
                    case "populationMin":
                    let min = [...state.allCountriesBackUp].sort(( primero, segundo ) => {
                        if(primero.population>segundo.population) return 1;
                        if(primero.population<segundo.population) return -1;
                        return 0;
                    })
                    return{
                        ...state,
                        allCountries: [...min].splice(0, 10),
                        allCountriesBackUp: min,
                        paginaActual: 0
                    }

                    default: return state
                }
        case RESET:
            return {
                ...state,
                allCountries: [...state.allCountriesBackUp].splice(0,10),
                filter: false,
                paginaActual:0,
                totalPages:Math.floor(state.allCountriesBackUp.length/10)
            }
        case PAGINA:
            const next_page = state.paginaActual + 1;
            const prev_page = state.paginaActual - 1;
            const indice = action.payload === "next" ? next_page * 10 : prev_page * 10;

            if(state.filter){
                if(action.payload === "next" && indice >= state.countriesFiltrados.length)
                return state
            else if (action.payload === "prev" && prev_page < 0)
                return state
            return {
                ...state,
                allCountries: [...state.countriesFiltrados].splice(indice,10),
                paginaActual: action.payload === "next" ? next_page : prev_page
            }
            }

            if(action.payload === "next" && indice >= state.allCountriesBackUp.length)
                return state
            else if (action.payload === "prev" && prev_page < 0)
                return state

            return {
                ...state,
                allCountries: [...state.allCountriesBackUp].splice(indice,10),
                paginaActual: action.payload === "next" ? next_page : prev_page
            }

        default:
            return state
    }
}

export default rootReducer;