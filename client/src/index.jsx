import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      count: 0
    }
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.getTop25();
  }


  getTop25() {
    $.ajax({
      url: '/repos',
      type: 'GET',
    })
    .then((data) => {
      var fetchedData = JSON.parse(data);
      var usableRepos = fetchedData.info;
      var currentCount =fetchedData.count;
        this.setState({repos: usableRepos, count: currentCount})
        console.log(this.state.repos);
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      method: 'POST',
      url: "/repos",
      data: term
    })
    .then((returned) => {
      this.getTop25()
    })
  }



  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} count={this.state.count} />
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));