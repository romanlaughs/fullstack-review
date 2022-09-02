const axios = require('axios');
const config = require('../config.js');
const { Octokit } = require("@octokit/core");
const token = config.TOKEN;
const db = require('../database/index.js');

let getReposByUsername = (username) => {
  username = username.toString()
  const octokit = new Octokit({ auth: config.other });
  let options = {
    url: 'https://api.github.com/',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${token}`
    }
  };


  axios.get(options.url)
  .then(() => {
    return octokit.request('GET /users/{username}/repos', {
      username: username
    })
  })
  .then(function (response) {
    console.log('This Worked:')
    var resultObj = {};
    response.data.map((repo) => {
      resultObj[repo.id] = {
      "repoId": repo.id,
      "name": repo.name,
      "watchers_count": repo.watchers_count,
      "watchers": repo.watchers,
      "html_url": repo.html_url,
      "ownerId": repo.owner.id,
      "login": repo.owner.login
      }
    })

    return resultObj;
  })
  .then((dataObj) => {
      db.save(dataObj)
    console.log('It didn\'t crash')
    return dataObj
  })
  .then((savedObj) => {
    console.log('Made it here!')
  })
  .catch(function (error) {
    console.log('This Did Not Work')
    console.log(error);
  })
}

module.exports.getReposByUsername = getReposByUsername;