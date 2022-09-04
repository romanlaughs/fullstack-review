import React from 'react';
//import Repo from './components/Repo.jsx';

const RepoList = (props) => (
  <>
    <div>
      <h4> Top 25 *Star* Repos </h4>
      <h6>These are Repos you have searched and ordered by top 25</h6>
      <ul>
      {props.repos.map((repo) => <ul key={repo.repoId}><a href={repo.html_url} target="_blank">{repo.name} </a> by <b id='name'>{repo.login}</b> - Star Count: {repo.stargazers_count}</ul>)}
    </ul>
    </div>
    <div>
      There are {props.count} total repos in the database.
    </div>
  </>
)

export default RepoList;