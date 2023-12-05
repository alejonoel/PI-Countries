import { FILTER, GET_ACTIVITIES, GET_CONTINENTS, GET_COUNTRIES, GET_COUNTRIES_DETAILS, ORDER, PAGINA, RESET, SEARCH } from "../Actions-types/Index";

// Estado inicial
let initialState = {
    allCountries: [],
    allCountriesBackUp: [],
    allActivities: [],
    allContinents:[],
    countriesFiltrados:[],
    countriesDetails:{},
    filter: false,
    paginaActual:1,
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
        case SEARCH:

            let searchCountries = [...state.allCountriesBackUp].filter((i)=> 
            i.name.toLowerCase().includes(action.payload.toLowerCase()));

            return {
                ...state,
                filter: true,
                countriesFiltrados: searchCountries,
                allCountries: [...searchCountries].splice(0,10),
                paginaActual:1,
                totalPages:Math.ceil(searchCountries.length/10)
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
                        allCountries: [...listaActivitiesFiltrados].splice(0,10),
                        filter:true,
                        paginaActual:1,
                        totalPages:Math.ceil(listaActivitiesFiltrados.length/10)
                    }
                case "continent":
                    let listaFiltrados = [...state.allCountriesBackUp].filter((i)=> 
                    i.continent === action.payload.value);
                    return {
                        ...state,
                        countriesFiltrados: listaFiltrados,
                        allCountries: [...listaFiltrados].splice(0,10),
                        filter:true,
                        paginaActual:1,
                        totalPages:Math.ceil(listaFiltrados.length/10)
                    }
            }
        case ORDER:
                let who = state.filter?[...state.countriesFiltrados]:[...state.allCountriesBackUp]
                switch (action.payload) {
                    case "AZ":
                    let asc = who.sort(( primero, segundo ) => {
                        if(primero.name>segundo.name) return 1;
                        if(primero.name<segundo.name) return -1;
                        return 0;
                    })
                    return{
                        ...state,
                        allCountries: [...asc].splice(0, 10),
                        allCountriesBackUp: state.filter?state.allCountriesBackUp:asc,
                        countriesFiltrados: state.filter?asc:state.countriesFiltrados,
                        paginaActual: 1
                    }
                    case "ZA":
                        let desc = who.sort(( primero, segundo ) => {
                        if(primero.name>segundo.name) return -1;
                        if(primero.name<segundo.name) return 1;
                        return 0;
                    })
                    return{
                        ...state,
                        allCountries: [...desc].splice(0, 10),
                        allCountriesBackUp: state.filter?state.allCountriesBackUp:desc,
                        countriesFiltrados: state.filter?desc:state.countriesFiltrados,
                        paginaActual: 1
                    }
                    case "populationMax":
                        let max = who.sort(( primero, segundo ) => {
                        if(primero.population>segundo.population) return -1;
                        if(primero.population<segundo.population) return 1;
                        return 0;
                    })
                    return{
                        ...state,
                        allCountries: [...max].splice(0, 10),
                        allCountriesBackUp: state.filter?state.allCountriesBackUp:max,
                        countriesFiltrados: state.filter?max:state.countriesFiltrados,
                        paginaActual: 1
                    }
                    case "populationMin":
                    let min = who.sort(( primero, segundo ) => {
                        if(primero.population>segundo.population) return 1;
                        if(primero.population<segundo.population) return -1;
                        return 0;
                    })
                    return{
                        ...state,
                        allCountries: [...min].splice(0, 10),
                        allCountriesBackUp: state.filter?state.allCountriesBackUp:min,
                        countriesFiltrados: state.filter?min:state.countriesFiltrados,
                        paginaActual: 1
                    }

                    default: return state
                }
        case RESET:
            return {
                ...state,
                allCountries: [...state.allCountriesBackUp].splice(0,10),
                filter: false,
                countriesFiltrados:[],
                paginaActual:1,
                totalPages:Math.ceil(state.allCountriesBackUp.length/10)
            }
        case PAGINA:
            const next_page = state.paginaActual + 1;
            const prev_page = state.paginaActual - 1;
            const indice = action.payload === "next" ? state.paginaActual * 10 :(prev_page-1) * 10;

            if(state.filter){
                if(action.payload === "next" && indice >= state.countriesFiltrados.length)
                return state
            else if (action.payload === "prev" && prev_page <= 0)
                return state
            return {
                ...state,
                allCountries: [...state.countriesFiltrados].splice(indice, 10),
                paginaActual: action.payload === "next" ? next_page : prev_page
            }
            }

            if(action.payload === "next" && indice >= state.allCountriesBackUp.length)
                return state
            else if (action.payload === "prev" && prev_page <= 0)
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