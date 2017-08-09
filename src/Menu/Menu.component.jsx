import React, { Component } from 'react';
import './Menu.component.css';
import menu__addUser from './img/menu__add-user.svg';
import menu__allUsers from './img/menu__all-users.svg';
import menu__tasks from './img/menu__tasks.svg';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Menu extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<ul className="Menu">
					<Link to="/userprofile"><li><img src={menu__addUser} alt="icon" />Add user</li></Link>
					<Link to="/"><li><img src={menu__allUsers} alt="icon" />All users</li></Link>
					<Link to="/alltasks"><li><img src={menu__tasks} alt="icon" />Tasks</li></Link>
				</ul>
			</div>
		);
	}
}

export default Menu;