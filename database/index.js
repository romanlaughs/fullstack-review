const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true
}, () => {
  console.log('Connected to MongoDB');
});


let repoSchema = mongoose.Schema({
      "repoId": Number,
      "name": String,
      "stargazers_count": Number,
      "html_url": String,
      "ownerId": Number,
      "login": String
});

repoSchema.query.top25 = function() {
  return this.where({}).sort({stargazers_count: 'desc'}).limit(25);
}

let Repo = mongoose.model('Repo', repoSchema);

let save = async (repo) => {
  for (var i = 0; i < repo.length; i++) {
    const Fetched = new Repo({
      "repoId": repo[i].repoId,
      "name": repo[i].name,
      "stargazers_count": repo[i].stargazers_count,
      "html_url": repo[i].html_url,
      "ownerId": repo[i].ownerId,
      "login": repo[i].login
      })
    Fetched.save()
  }
}



let check = function(repoInfo) {
  var gitHubName = repoInfo[0].login;
  return Repo.find({login: gitHubName})
  .then((value) => {
    if (value.length) {
      Repo.deleteMany({login: gitHubName}, () => {
        console.log('ALL SET!!!!!!!!!!!!!')
      })
      console.log('Deleted!')
    }
    return repoInfo
  })
  .then((repos) => {
      save(repos)
      console.log('Repo Saved')
      return repos
    })
  .then((newData) => {
    console.log('DONE as DINNER')
  })
  .catch((error) => {
      console.log(error.message);
    })
  }


let find = () => {
  console.log('FIND WAS CALLED')
  return Repo.find().top25()
}

let count = () => {
  return Repo.count({});
}

module.exports.save = save;
module.exports.find = find;
module.exports.check = check;
module.exports.count = count;