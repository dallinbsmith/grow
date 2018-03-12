const express = require("express");
const planetRoutes = express.Router()
const axios = require("axios")


planetRoutes.get("/all", (req, res) => {
    const planets = [];
    const obj = {};
    for (var i = 1; i < 62; i++) {
        axios.get(`https://swapi.co/api/planets/` + i).then((response) => {
                planets.push(response.data);
                if (planets.length === 60) {
                    planets.forEach((data, i)=> obj[i] = data)
                    res.send(obj)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
});

planetRoutes.get("/individual/:planetname", (req, res) => {
    const path = req._parsedUrl.pathname.split("/")
    const name = (path[path.length - 1]).toLowerCase().split("%20").join("")
    let sent = false
    for (var i = 1; i < 62; i++) {
        axios.get(`https://swapi.co/api/planets/` + i).then((response) => {
                if (response.data.name.split(" ").join("").toLowerCase() === name) {
                    sent = true
                    res.send(response.data)
                }
            })
            .catch((error) => {
                console.log(error);
            });
        if (sent === true) break
    }
})



planetRoutes.get("/random", (req, res) => {
    const random = Math.floor(Math.random() * 61)
    axios.get(`https://swapi.co/api/planets/` + random).then((response) => {
            res.send(response.data)
        })
        .catch((error) => {
            console.log(error);
        });
});

planetRoutes.get("/random/residents", (req, res) => {
    const random = Math.floor(Math.random() * 61)
    axios.get(`https://swapi.co/api/planets/` + random).then((response) => {
            const population = [];
            const obj = response.data;
            const habitants = response.data.residents;
            if (habitants.length === 0){
                obj.residents = "no known habitants"
                res.send(obj)
            }
            for (i = 0; i < habitants.length; i++) {
                axios.get(habitants[i]).then((response) => {
                        population.push(response.data.name)
                        if (population.length === habitants.length) {
                            obj.residents = population
                            res.send(obj)
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        })
        .catch((error) => {
            console.log(error);
        });
});

planetRoutes.get("/all/:sort", (req, res) => {
    const path = req._parsedUrl.pathname.split("/")
    const sortParam = (path[path.length - 1]).toLowerCase()
    const planets = [];
    const obj = {};
    for (var i = 1; i < 62; i++) {
        axios.get(`https://swapi.co/api/planets/` + i).then((response) => {
                planets.push(response.data);
                if (planets.length === 60 && sortParam === "name") {
                    planets.sort((a, b) => {
                        if(a.name < b.name) return -1;
                        if(a.name > b.name) return 1;
                        return 0;
                    })
                    planets.forEach((data, i)=> obj[i] = data )
                    res.send(obj)
                }
                if (planets.length === 60 && sortParam === "population") {
                    planets.sort((a, b) => {
                        if(a.population < b.population) return -1;
                        if(a.population > b.population) return 1;
                        return 0;
                    })
                    planets.forEach((data, i)=> obj[i] = data )
                    res.send(obj)
                }
                if (planets.length === 60 && sortParam === "diameter") {
                    planets.sort((a, b) => {
                        if(a.diameter > b.diameter) return -1;
                        if(a.diamter < b.diamter) return 1;
                        return 0;
                    })
                    planets.forEach((data, i)=> obj[i] = data )
                    res.send(obj)
                }
                if (planets.length === 60)
                    {res.send({ "error" : "I'm sorry I don't know those parameters. Please specify 'name' 'population' or 'diameter'"})}
            })
            .catch((error) => {
                console.log(error);
            });
    }
});



module.exports = planetRoutes;
