import React, { Component } from 'react';
import './App.component.css';
import Menu from './Menu/Menu.component.jsx';
import UserProfile from './UserProfile/UserProfile.component.jsx';
import AllTasks from './AllTasks/AllTasks.component.jsx';
import AllUsers from './AllUsers/AllUsers.component.jsx';

class App extends Component {
  constructor() {
  	super();
  	this.state = {
  		users : [],
  	};
  }

  /* ============================================================================================================ */	
  componentWillMount() {
    var _url = "/api/getusers/";
    fetch(_url)
    .then((response) => response.json())
    .then(users => {
      this.setState({ users });
      console.log("Loaded data:", users);
    })
    .catch(error => console.error("Error loading data\r\n",error));
  }

  /* ============================================================================================================ */	
  componentDidMount() {

  }

  /* ============================================================================================================ */	
  render() {
    return (
      <div className="App">
        <Menu />
        <AllUsers users={this.state.users} />
        <AllTasks users={this.state.users} />
        <UserProfile />

      </div>
    );
  }
}

export default App;
