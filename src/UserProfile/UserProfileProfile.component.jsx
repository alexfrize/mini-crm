import React, { Component } from 'react';
import './UserProfileProfile.component.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { action_createNewUserDB } from '../actions';
import { action_updateUserDB } from '../actions';

class UserProfileProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users : [],
			// userToEdit : {},
			userID : null,
			profile : {
				name : "Lorem Ipsum",
				email : "",
				phone : "+8-565-214-154-1",
				description: ""
			},
			errorsDescription : ""
		}
	}

	componentWillReceiveProps(nextProps) {
		console.log("USERPROFILE::nextProps === ", nextProps);
		var { users } = nextProps;
		// var { userToEdit } = nextProps;
		var { profile } = nextProps.userToEdit;
		var userID;
		if (profile !== undefined) {
			userID = nextProps.userToEdit._id;
			console.log("User ID is loaded: ", userID);
			// console.log("New user data: ", nextProps.userToEdit);
			this.setState({ users, profile, userID });
		}

	}
	checkUserName(event) {
		var _value = event.target.value;
		var { profile } = this.state;
		profile.name = _value;
		if (_value.match(/^[a-zA-Z 0-9]*$/ig)) this.setState({ profile });
	}
	checkUserEmail(event) {
		var _value = event.target.value;
		var profile = this.state.profile;
		profile.email = _value;
		if (_value.match(/^[a-zA-Z_0-9.@]*$/ig)) this.setState({ profile });
	}

	checkUserPhone(event) {
		var _value = event.target.value;
		var profile = this.state.profile;
		profile.phone = _value;
		if (_value.match(/^\+*[0-9-]*$/ig)) this.setState({ profile });
	}

	checkUserDescription(event) {
		var _value = event.target.description;
		var profile = this.state.profile;
		profile.description = _value;
		this.setState({ profile });
	}

	checkValuesOnSubmit() {
		const _ERRORS_IN = "Errors in: ";
		var errorsDescription = "";
		if (this.state.profile.name === "" && this.state.profile.email === "" && this.state.profile.phone === "") errorsDescription = "Please, fill all fields";
		 else {
			errorsDescription = _ERRORS_IN;
			if (this.state.profile.name === "") errorsDescription += "name, ";
			if (!this.state.profile.email.match(/^[a-zA-Z0-9.-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}$/ig)) errorsDescription += "email, ";
			if (!this.state.profile.phone.match(/^\+*[0-9-]{9,15}[0-9]$/ig))  errorsDescription += "phone";
			let _ed = errorsDescription;
			let _edl = errorsDescription.length;
			if (_ed.slice(-2) === ", ") errorsDescription = errorsDescription.slice(0,_edl - 2);
			if (errorsDescription === _ERRORS_IN) errorsDescription = "";
		}
		this.setState({ errorsDescription });
		return (errorsDescription === "");
	}

	saveUserData(e) {
		e.preventDefault();
		if (!this.checkValuesOnSubmit()) return;
		
		var { profile } = this.state;
		var { userID } = this.state;
		var { users } = this.state;
		if (!userID) {
			this.props.action_createNewUserDB(profile);
			console.log("saveUserData(e)::userID === NO_USER_ID", userID);	
		} else {
			console.log("saveUserData(e)::userID", userID);
			for (let user of users) {
				if (user._id === userID) {
					user.profile.username = profile.name;
					user.profile.email = profile.email;
					user.profile.phone = profile.phone;
					user.profile.description = profile.description;
				}
			}
			this.setState( { users });
			//let userToEdit = this.state.userToEdit;
			//userToEdit._id = userID;
			//userToEdit.profile = profile;
			//console.warn("userToEdit ==", userToEdit);
			console.warn("profile ==", profile);
			this.props.action_updateUserDB(users, profile);
		}

	}

	render() {
		return (
					<div className="UserProfile__profile">
						<h2 className="h2">Profile:</h2>
						<form className="UserProfile__profile__form">
							<input className="UserProfile__profile__form__input" placeholder="Name:" value={this.state.profile.name} onChange={(event) => this.checkUserName(event)} />
							<input className="UserProfile__profile__form__input" placeholder="E-mail:" value={this.state.profile.email} onChange={(event) => this.checkUserEmail(event)} />
							<input className="UserProfile__profile__form__input" placeholder="Phone:" value={this.state.profile.phone} onChange={(event) => this.checkUserPhone(event)} />
							<textarea className="UserProfile__profile__form__textarea" value={this.state.profile.description} onChange={(event) => this.checkUserDescription(event)} placeholder="Description:" />
							<div className="UserProfile__profile__form__errors-description">
								{this.state.errorsDescription}
							</div>
							<div className="UserProfile__profile__form__button-container">
								<button className="UserProfile__profile__form__button" onClick={(e) => this.saveUserData(e)} >Save</button>
							</div>
						</form>
					</div>
			);
	}
}

function mapStateToProps(data) {
	return {
		users : data.users,
		userToEdit : data.userToEdit
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators( { action_createNewUserDB, action_updateUserDB }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileProfile);