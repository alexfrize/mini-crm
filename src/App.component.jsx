import React, { Component } from 'react';
import './App.component.css';
import Menu from './Menu.component.jsx';
import UserProfile from './UserProfile.component.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu />
        <UserProfile />
      </div>
    );
  }
}

export default App;
