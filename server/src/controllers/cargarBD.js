const { Country } = require ('../db')

const cargarBD = async () => {

    const api = await fetch('http://localhost:5000/countries')
    const apixbd = await api.json();

    apixbd.forEach( async country =>  {
        // traer solo los elementos necesarios para cargar los paises en la BdD 
        const { cca3 , name , flags , continents , capital, subregion , area , population } = country;
        const newCountry = await Country.create ({  id: cca3,
                                                    name: name.common ,
                                                    image: flags.png ,
                                                    continent: continents[0] ,
                                                    capital: capital?capital[0]:"",
                                                    subregion: subregion,
                                                    area: area,
                                                    population: population
                                                })
        })
};

module.exports = cargarBD;

