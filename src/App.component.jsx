import React, { Component } from 'react';
import './App.component.css';
import Menu from './Menu/Menu.component.jsx';
import UserProfile from './UserProfile/UserProfile.component.jsx';
import AllTasks from './AllTasks/AllTasks.component.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu />
        <AllTasks />
        <UserProfile />

      </div>
    );
  }
}

export default App;
