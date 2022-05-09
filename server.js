'use strict'

const url = "postgres://mohammed:7362@localhost:5432/movies"
const port = 3000;

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { Client } = require('pg')
const client = new Client(url)


const movieData= require('./Movie Data/data.json');
const axios = require('axios').default;
const apiKey = process.env.API_KEY;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


// Raouts:
// app.get('/', handleData);
// app.get('/favorite', handleFavorite);
// app.get('/error', (req, res) => res.send(error()));
app.get('/trending', hundleTrending);
app.get('/search', hundleSearch);
app.get('/id', hundleSearchId);
app.get('/image', hundleImage);
app.get('/', handleHomePage);
app.post('/addMovie',handelAdd);
app.get('/getMovie',handelGet);
app.put("/UPDATE/:updateName", handleUpdate);
app.delete("/DELETE", handleDelete);
app.get("/getMoviesById", handleGetById);
app.use(handleError);

function handelAdd(req,res){
  // console.log(req.body);
  const { name, time, summary, image } = req.body;

  let sql ='INSERT INTO movie(name,time,summary,image) VALUES($1,$2,$3,$4) RETURNING *;'
  let values = [ name, time, summary, image];

  client.query(sql, values).then((result)=>{
    console.log(result.rows);
    return res.status(201).json(result.rows[0])
  }).catch((err) => {
    handleError(err, req, res);
  });
  }


  // res.send("Adding to DB");

  function handleUpdate(req, res) {
    const { name, time, summary, image } = req.body;
    const { updateName } = req.params;
    let sql = `UPDATE movie SET name=$1, time=$2, summary=$3, image=$4 WHERE id = $5 RETURNING *;`  // sql query
    let values = [name, time, summary, image, updateName];
    client.query(sql, values).then((result) => {
      // console.log(result.rows);
      return res.status(200).json(result.rows);
    }).catch()
  }

  function handleDelete(req, res) {
    const  movieId  = req.query.id
    let sql = 'DELETE FROM movie WHERE id=$1;'
    let value = [movieId];
    client.query(sql, value).then(result => {
      console.log(result);
      res.send("deleted");
    }
    ).catch()
  }

  function handleGetById(req, res) {

    const { id } = req.query;
    let sql = 'SELECT * from movie WHERE id=$1;'
    let value = [id];
    client.query(sql, value).then((result) => {
      // console.log(result);
      res.json(result.rows);
    }).catch();
  }

function handelGet(req,res){
let sql = 'SELECT * from movie;'
client.query(sql).then((result)=>{
  console.log(result);
  res.json(result.rows);
}).catch((err) => {
  handleError(err, req, res);
});
}

function handleError(error, req, res) {
    res.status(500).send(error)
}

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

    const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`;
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
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieName}&page=2`
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
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieId}&page=2`;
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

// after connection to db, start the server
client.connect().then(()=>{
  app.listen(port, ()=> {
    console.log(`Example app listening on port ${port}`)
  });

})




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




