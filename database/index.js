const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  {
      "repoId": Number,
      "name": String,
      "watchers_count": Number,
      "watchers": Number,
      "html_url": String,
      "owner":
      {
          "ownerId": Number,
          "login": String
      }
  }
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;