const axios = require('axios');
const config = require('../config.js');
const token = config.TOKEN;
const db = require('../database/index.js');


let getReposByUsername = (username) => {
  username = username.toString()
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${token}`
    }
  };

  return axios(options)
    .then(function (response) {
      console.log('Data Retrieved from GitHub')
      var resultArr = [];
      response.data.map((repo) => {
        resultArr.push({
        "repoId": repo.id,
        "name": repo.name,
        "stargazers_count": repo.stargazers_count,
        "html_url": repo.html_url,
        "ownerId": repo.owner.id,
        "login": repo.owner.login
        })
      })
      return resultArr;
    })
    .then((dataArr) => {
      var done = db.check(dataArr)
    })
    .catch(function (error) {
      console.log('This Did Not Work')
      console.log(error.message);
    })
  }

module.exports.getReposByUsername = getReposByUsername;