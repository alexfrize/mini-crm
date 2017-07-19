import React, { Component } from 'react';
import './UserProfileProfile.component.css';
import { connect } from 'react-redux';

class UserProfileProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
		var { profile } = nextProps.userToEdit;
		if (profile !== undefined) {
			this.setState({ profile });
			console.log("profile===", profile);
		}
		console.log("USERPROFILE::profile.description", profile);
		console.log("USERPROFILE::this.state.profile === ", this.state.profile);
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
		if (_value.match(/^[a-zA-Z_0-9\.@]*$/ig)) this.setState({ profile });
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
			if (!this.state.profile.email.match(/^[a-zA-Z0-9\.-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}$/ig)) errorsDescription += "email, ";
			if (!this.state.profile.phone.match(/^\+*[0-9-]{9,15}[0-9]$/ig))  errorsDescription += "phone";
			let _ed = errorsDescription;
			let _edl = errorsDescription.length;
			if (_ed.slice(-2) == ", ") errorsDescription = errorsDescription.slice(0,_edl - 2);
			if (errorsDescription === _ERRORS_IN) errorsDescription = "";
		}
		this.setState({ errorsDescription });
		return (errorsDescription === "");
	}

	saveUserData(e) {
		e.preventDefault();
		if (!this.checkValuesOnSubmit()) return;
		console.log(this.state);
		var profile = {
			name : "",
			email : "",
			phone : "",
			description : ""
		}			
		this.setState({
			profile,	
			errorsDescription : ""
		})

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

export default connect(mapStateToProps, null)(UserProfileProfile);