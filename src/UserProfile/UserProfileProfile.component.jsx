import React, { Component } from 'react';
import './UserProfileProfile.component.css';

export default class UserProfileProfile extends Component {
	render() {
		return (
					<div className="UserProfile__profile">
						<h2 className="h2">Profile:</h2>
						<form className="UserProfile__profile__form">
							<input className="UserProfile__profile__form__input" placeholder="Name:"/>
							<input className="UserProfile__profile__form__input" placeholder="E-mail:"/>
							<input className="UserProfile__profile__form__input" placeholder="Phone:"/>
							<textarea className="UserProfile__profile__form__textarea" placeholder="Description:" />
							<div className="UserProfile__profile__form__button-container">
								<button className="UserProfile__profile__form__button">Save</button>
							</div>
						</form>
					</div>
			);
	}
}