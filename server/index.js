const express = require('express');
let app = express();
let helper = require('../helpers/github.js');
const { StringDecoder } = require('node:string_decoder');
const decoder = new StringDecoder('utf8');

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  req.on('data', function (data) {
    console.log('DATA: ', decoder.write(data))
    helper.getReposByUsername(data);
  });

  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

