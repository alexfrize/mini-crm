import React, { Component } from 'react';
import './Menu.component.css';
import menu__addUser from './img/menu__add-user.svg';
import menu__allUsers from './img/menu__all-users.svg';
import menu__tasks from './img/menu__tasks.svg';
export default class Menu extends Component {

	render() {
		return (
		<div>
		
			<ul className="Menu">
				<li><img src={menu__addUser} alt="icon" />Add user</li>
				<li><img src={menu__allUsers} alt="icon" />All users</li>
				<li><img src={menu__tasks} alt="icon" />Tasks</li>
			</ul>
		</div>
		);
	}
}