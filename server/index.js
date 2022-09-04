const cool = require('cool-ascii-faces');
const express = require('express');
let app = express();
let helper = require('../helpers/github.js');
const { StringDecoder } = require('node:string_decoder');
const decoder = new StringDecoder('utf8');
const db = require('../database/index.js');
const PORT = process.env.PORT || 5000

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
  const returnObj = {};
  return db.find()
  .then((repos) => {
    returnObj.info = repos
    return db.count()
  })
  .then((number) => {
   returnObj.count = number;
   res.send(JSON.stringify(returnObj))
  })

});

app.get('/cool', (req, res) => res.send(cool()))

//let port = 1128;

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});

