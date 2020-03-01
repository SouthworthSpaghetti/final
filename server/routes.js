'use strict';

// **** 3rd Party Modules ****
require('dotenv').config();

// Superagent will let us call remote APIs for data
const superagent = require('superagent');

// **** Custom Modules ****

// Our database client. We'll use this to run queries
const database = require('./database.js');
const nextPage = [];//FEB29 counter for number of API pages in home route
// In the routes file, app.get('/') calls this function

function homePageHandler(req, res) {
  // Get page one of the API from star wars
  // THEN, render an EJS Template with that data
  // let X = 1;//FEB28 ANTHONY
  
  fetchCharactersFromSWAPI(1)//FEB28 ANTHONY, ?instead of SWAPI(1)-->SWAPI(X)
    .then(data => {//FEB29 ANTHONY
      // nextPage.push(data.next);
      // console.log("444444444444", data);
      res.render('index', data)
    })//FEB29 ANTHONY
    .catch(error => { throw error; });
}

function updateHomePage(req, res) {
  nextPage.push(req.query.page)
  console.log("*&*&*&*&*", nextPage)
  fetchCharactersFromSWAPI(req.query.page)
    .then(data =>  res.status(200).send(data))
  // res.redirect('/');
  // fetchCharactersFromSWAPI(req.params)
  // .then(data => res.render('index', data))
  // .then(data => console.log("/././.", data))
  // .catch(error => { throw error; });
    // .then(data => res.render('index', data))
    .catch(error => { throw error; });
}

// Use superagent to get the star wars characters, by page
function fetchCharactersFromSWAPI(pageNumber) {
  // Note that the function(s) that use this helper function
  // expect a promise  -- they use .then()
  // therefore, we simply return the call to superagent which will
  // resolve with any data found
  return superagent.get(`https://swapi.co/api/people/?page=${pageNumber}`)
    .then(response => {
      // After we get the data from the remote API, go to the
      // Database and add the number of "likes" for each character
      // from our database, if there are any
      return getNumberOfLikes(response.body)
    })
    .catch(error => { throw error; });
}


// For each individual in the list of results, see if they
// had a database entry and get the number of likes.
// Add a .likes property to the character with that number if found
function getNumberOfLikes(data) {
  let names = data.results.map(person => person.name);
  let SQL = "SELECT * FROM click_counts WHERE remote_id = ANY($1)";
  return database.query(SQL, [names])

    .then(counts => {

      for (let i = 0; i < data.results.length; i++) {
        for (let x = 0; x < counts.rows.length; x++) {
          if (data.results[i].name === counts.rows[x].remote_id) {
            data.results[i].likes = counts.rows[x].clicks;
          }
        }
      }

      return data;
    })
}
 
function updateDatabase(req, res) {
  // let characterCount = req.body;
  let characterName = req.params.name;
  let sql = 'UPDATE click_counts SET clicks = (clicks + 1) WHERE remote_id = $1;';//clicks+=1
  let safeValues = [characterName];
  database.query(sql, safeValues)
    .then(() => {
      res.redirect('/')
})
}

module.exports = { homePageHandler, updateHomePage, updateDatabase };