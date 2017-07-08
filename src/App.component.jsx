import React, { Component } from 'react';
import './App.component.css';
import Menu from './Menu/Menu.component.jsx';
import UserProfile from './UserProfile/UserProfile.component.jsx';
import AllTasks from './AllTasks/AllTasks.component.jsx';
import AllUsers from './AllUsers/AllUsers.component.jsx';

class App extends Component {
  constructor(props) {
  	super(props);
    console.log("constructor() :: ", this.props);
     console.log("constructor() :: context ", this.context);
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
    this.store = this.props.store;
    const { store } = this.context;
    console.log("store === ", store);
    setTimeout(() => console.log("this.props.dispatch === ", this.props.dispatch), 1000);
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
