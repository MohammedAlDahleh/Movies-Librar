# Movies-Librar

# Project Name - Movies Librar

**Author Name**: Mohammed Al-Dahleh

## WRRC
![assests](/assests/WRRC.PNG)
![assests](/assests/WRRC%20with%20API.PNG)
![assests](/assests/WRRC%20with%20DB.PNG)

## Overview
I build server to send data to frontend,git Home Page and /favorite, Handle errors (status 500,status 404);

## Getting Started
1) npm init -y 
2) create an index.js , this is the main.
3) Install express package to use itnpm install express
4) added the server code inside index.js
 **1. require the package**
 **2. create an Express app**
 **3. the server is listening on port 3000 or 3001**
 **4. creating a route**
5) run the server using node index.js
6) npm install axios dotenv
7) Get api and api key
8) Create GET request to the api
9) Get the trending movies data (/trending)
10) Search for a movie name (/search)

## Creating the database
1. in terminal: make sure the sql server is running
  * psql
  * CREATE DATABASE databasename;
  * \l will list the databases
  * \q to quit psql
2. Creating the table
  * create a schema.sql file in my project
  * CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    column3 datatype,
   ....
);
3. Connecting the database with the table

  * psql demo2 to connect to my db
  * \d to describe the table
  * \q to quit
  * psql -d demo2 -f schema.sql
4. Write qureis in my server:

 * npm install pg
 * In index.js:

const url="postgres://username:password@localhost:5432/databaseName" // store it in the .env file
// create a new client instance
const { Client } = require('pg')
const client = new Client(url)
// connect to db
client.connect().then(() => {

    app.listen(PORT, () => {
        console.log(`Server is listening ${PORT}`);
    });
})

 * use client.query() to do CRUD

## Project Features
<!-- What are the features included in you app -->