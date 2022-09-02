const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true }, () => {
  console.log('Connected to MongoDB');
});

let repoSchema = mongoose.Schema({
      "repoId": Number,
      "name": String,
      "watchers_count": Number,
      "watchers": Number,
      "html_url": String,
      "ownerId": Number,
      "login": String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = async (repoId) => {
  var gitHubName = null;

  for (var key in repoId) {
    gitHubName = repoId[key].login
  };

  var savingData = (data) => {
    for (var i in data) {
      const Fetched = new Repo({
        "repoId": data[i].repoId,
        "name": data[i].name,
        "watchers_count": data[i].watchers_count,
        "watchers": data[i].watchers,
        "html_url": data[i].html_url,
        "ownerId": data[i].ownerId,
        "login": data[i].login
      })
      Fetched.save()
    }
  }


  var check = Repo.find({login: gitHubName})
  .then((check) => {
    if (check.length) {
      console.log('It Found Previous Data!!')
      Repo.deleteMany({login: gitHubName}, () => {console.log('Deleted!')});
    }
    return repoId
  })
    .then((repos) => {
      savingData(repos)
      console.log('Repo Saved')
    })
    .catch((error) => {
      console.log(error.message);
    })

}

module.exports.save = save;