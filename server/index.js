const express = require('express');
let app = express();
let helper = require('../helpers/github.js');
const { StringDecoder } = require('node:string_decoder');
const decoder = new StringDecoder('utf8');
const db = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.urlencoded({extended: true}));

app.post('/repos', function (req, res) {
  var data = req.body
  var userArr = Object.keys(data)
  var userName = userArr[0];
  helper.getReposByUsername(userName)
  .then((data) => {
    res.end()
  })
});

app.get('/repos', function (req, res) {
  return db.find()
  .then((repos) => {
    console.log(repos)
    res.send(JSON.stringify(repos))
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

