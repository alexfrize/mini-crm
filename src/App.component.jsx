import React, { Component } from 'react';
import './App.component.css';
import Menu from './Menu/Menu.component.jsx';
import UserProfile from './UserProfile/UserProfile.component.jsx';
import AllTasks from './AllTasks/AllTasks.component.jsx';
import AllUsers from './AllUsers/AllUsers.component.jsx';
import Modal from './Modal/Modal.component.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { action__loadedDataFromDB } from './actions';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class App extends Component {
  constructor(props) {
  	super(props);
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
      this.props.action__loadedDataFromDB(users); // dispatch an action that data is loaded
      this.setState({ users : this.props.users });
    })
    .catch(error => console.error("Error loading data: \r\n", error));
  }

  /* ============================================================================================================ */	
  componentDidMount() {

  }

  /* ============================================================================================================ */	
  render() {
    return (
      <div className="App">
        <Modal />
        <Menu />
        <div>  
          <Route exact path="/" component={AllUsers} />
          <Route path="/alltasks" component={AllTasks} />
          <Route path="/userprofile" component={UserProfile} />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators( { action__loadedDataFromDB }, dispatch);
}

function mapStateToProps(users) {
  return { users }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
