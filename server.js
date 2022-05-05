'use strict'
const express = require('express');
const movieData= require('./Movie Data/data.json');
const app = express();
const PORT = 3000;

app.get('/', handleHomePage);
app.get('/favorite',handleFavorite);

//Functions:

function handleFavorite(req, res) {
    res.send("Welcome to Favorite Page");
}
function handleHomePage(req, res) {
    let result = [];
        let newMovie = new Movie(movieData.title, movieData.poster_path, movieData.overview);
        result.push(newMovie)
    res.json(result);
}
app.listen(PORT, ()=> {
    console.log(`Example app listening on port ${PORT}`)
});

function Movie(title, poster_path, overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
}


app.get('/error',(req,res) => res.send(error()));
app.use(function (err,req,res,text){
    console.log(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send("you have error 500");
})
app.use(function (req,res,text){
    res.status(404);
    res.type('text/plain');
    res.send("you have error 404");
})






