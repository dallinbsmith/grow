const express = require("express");
const starWarsRoutes = express.Router()
const axios = require("axios")



starWarsRoutes.get("/individual/:firstname", (req, res) => {
    const path = req._parsedUrl.pathname.split("/")
    const name = (path[path.length - 1]).toLowerCase()
    let sent = false
    for (var i = 1; i < 88; i++) {
        axios.get(`https://swapi.co/api/people/` + i).then((response) => {
                if (response.data.name.split(" ")[0].toLowerCase() === name) {
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

starWarsRoutes.get("/random", (req, res) => {
    const random = Math.floor(Math.random() * 87)
    axios.get(`https://swapi.co/api/people/` + random).then((response) => {
            res.send(response.data)
        })
        .catch((error) => {
            console.log(error);
        });
});

starWarsRoutes.get("/all", (req, res) => {
    const characters = [];
    const obj = {};
    for (var i = 1; i < 88; i++) {
        axios.get(`https://swapi.co/api/people/` + i).then((response) => {
                characters.push(response.data);
                if (characters.length === 86) {
                    characters.forEach((data, i)=> obj[i] = data )
                    res.send(obj)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
});

starWarsRoutes.get("/all/:sort", (req, res) => {
    const path = req._parsedUrl.pathname.split("/")
    const sortParam = (path[path.length - 1]).toLowerCase()
    const characters = [];
    const obj = {};
    for (var i = 1; i < 88; i++) {
        axios.get(`https://swapi.co/api/people/` + i).then((response) => {
                characters.push(response.data);
                if (characters.length === 86 && sortParam === "name") {
                    characters.sort((a, b) => {
                        if(a.name < b.name) return -1;
                        if(a.name > b.name) return 1;
                        return 0;
                    })
                    characters.forEach((data, i)=> obj[i] = data )
                    res.send(obj)
                }
                if (characters.length === 86 && sortParam === "height") {
                    characters.sort((a, b) => {
                        if(a.height < b.height) return -1;
                        if(a.height > b.height) return 1;
                        return 0;
                    })
                    characters.forEach((data, i)=> obj[i] = data )
                    res.send(obj)
                }
                if (characters.length === 86 && sortParam === "mass") {
                    characters.sort((a, b) => {
                        if(a.mass > b.mass) return -1;
                        if(a.mass < b.mass) return 1;
                        return 0;
                    })
                    characters.forEach((data, i)=> obj[i] = data )
                    res.send(obj)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
});

module.exports = starWarsRoutes;
