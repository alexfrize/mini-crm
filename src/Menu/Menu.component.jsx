import React, { Component } from 'react';
import './Menu.component.css';
import menu__addUser from './img/menu__add-user.svg';
import menu__allUsers from './img/menu__all-users.svg';
import menu__tasks from './img/menu__tasks.svg';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { action__updateUserToEdit } from '../actions';
import { EMPTY_USER } from '../constants/emptyuser';

class Menu extends Component {
	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		console.log("MENU::nextProps => ", nextProps);
	}

	addNewUserAndRedirect() {
		var userToEdit = Object.assign({}, EMPTY_USER);
		console.log(userToEdit);
		this.props.action__updateUserToEdit(userToEdit);
		this.props.history.push("/userprofile");
	}
	render() {
		return (
			<div>
				<ul className="Menu">
					<li onClick={() => this.addNewUserAndRedirect()} ><img src={menu__addUser} alt="icon" />Add user</li>
					<Link to="/"><li><img src={menu__allUsers} alt="icon" />All users</li></Link>
					<Link to="/alltasks"><li><img src={menu__tasks} alt="icon" />Tasks</li></Link>
				</ul>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ action__updateUserToEdit }, dispatch)
}

export default withRouter(connect(null, mapDispatchToProps)(Menu));