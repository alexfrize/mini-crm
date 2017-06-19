import React, { Component } from 'react';
import './App.component.css';
import Menu from './Menu/Menu.component.jsx';
import UserProfile from './UserProfile/UserProfile.component.jsx';
import AllTasks from './AllTasks/AllTasks.component.jsx';
import userJSON from "./data/users.json"; 

class App extends Component {
  constructor() {
  	super();
  	this.state = {
  		users : [],
  	};
  }

  /* ============================================================================================================ */	
  componentWillMount() {
  	this.setState({
	  		users: userJSON,
	  	});
  }

  /* ============================================================================================================ */	
  componentDidMount() {
	console.log("APP: _state === ", this.state.users);

  	/*
  	var _url = "./data/users.json"; 
  	fetch(_url)
  	.then((res) => res.json())
  	.then((res) => console.log(res))
  	.catch((err) => console.error("Error loading data from JSON: ", err));
  	*/
  }

  /* ============================================================================================================ */	
  render() {
    return (
      <div className="App">
        <Menu />
        <AllTasks users={this.state.users} />
        <UserProfile />

      </div>
    );
  }
}

export default App;
