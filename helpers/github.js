const axios = require('axios');
const config = require('../config.js');
const { Octokit } = require("@octokit/core");
const token = config.TOKEN;

let getReposByUsername = (username) => {
  username = username.toString()
  const octokit = new Octokit({ auth: config.other });
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
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
      "name": repo.name,
      "watchers_count": repo.watchers_count,
      "watchers": repo.watchers,
      "html_url": repo.html_url,
      "owner":
      {
          "ownerId": repo.owner.id,
          "login": repo.owner.login
      }}
    })

    return resultObj;
  })
  .then((dataObj) => {
    console.log(dataObj)
  })
  .catch(function (error) {
    console.log('This Did Not Work')
    console.log(error);
  })
}

module.exports.getReposByUsername = getReposByUsername;