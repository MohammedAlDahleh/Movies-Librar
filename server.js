'use strict'
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const movieData= require('./Movie Data/data.json');
const axios = require('axios').default;
const apiKey = process.env.API_KEY;
const app = express();
app.use(cors());
const port = 3000;


// Raouts:
// app.get('/', handleData);
// app.get('/favorite', handleFavorite);
// app.get('/error', (req, res) => res.send(error()));
app.get('/trending', hundleTrending);
app.get('/search', hundleSearch);
app.get('/id', hundleSearchId);
app.get('/image', hundleImage);
app.get('/', handleHomePage);


function handleHomePage(req, res) {
    let result = [];
        let newMovie = new Movie(movieData.title, movieData.poster_path, movieData.overview);
        result.push(newMovie)
    res.json(result);
}



app.get('/favorite',handleFavorite);

function handleFavorite(req, res) {
    res.send("Welcome to Favorite Page");
}
function hundleTrending(req, res) {

    //const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`;
   // const url = `https://api.themoviedb.org/3/trending/all/week?api_key=37ddc7081e348bf246a42f3be2b3dfd0&language=en-US`;

    axios.get(url)
      .then(result => {
       //console.log(result.data.trend);
        let trender = result.data.results.map(trend => {
          return new Trend(trend.id, trend.title, trend.release_date, trend.poster_path, trend.overview);
        })
        res.json(trender);
      })
      .catch((error) => {
        console.log(error);
        res.send("Inside catch")
      })
  }
  
  function hundleSearch(req, res) {
    let movieName = req.query.movieName;
     
    let url = `https://api.themoviedb.org/3/search/movie?api_key=668baa4bb128a32b82fe0c15b21dd699&language=en-US&query=${movieName}&page=2`
    //`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieName}&page=2`;

    axios.get(url)
      .then(result => {
        
        res.json(result.data.results)
      })
      .catch((error) => {
        console.log(error);
        res.send("Searching for data")
      })
  }

  function hundleSearchId(req, res) {
    let movieId = req.query.movieId;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=668baa4bb128a32b82fe0c15b21dd699&language=en-US&query=${movieId}&page=2`;
    //`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&page=2`;
    // axios.get().then().catch() 
    axios.get(url)
      .then(result => {
        // console.log(result.data);
        res.json(result.data)
      })
      .catch((error) => {
        console.log(error);
        res.send("Searching for data id")
      })
  }

  function hundleImage(req, res) {
    let movieId = req.query.movieId;
    let url = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${apiKey}&language=en-US`;
    // axios.get().then().catch() 
    axios.get(url)
      .then(result => {
        // console.log(result.data);
        res.json(result.data)
      })
      .catch((error) => {
        console.log(error);
        res.send("Searching for data image")
      })
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




app.listen(port, ()=> {
    console.log(`Example app listening on port ${port}`)
});


function Movie(title, poster_path, overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
}

function Trend(id, title, release_date, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
  }




