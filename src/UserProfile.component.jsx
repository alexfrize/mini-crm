import React, { Component } from 'react';
import './UserProfile.component.css';
import progress__newLead from './img/progress__new-lead.svg';
import progress__phoneCall from './img/progress__phone-call.svg';
import progress__presentation from './img/progress__presentation.svg';
import progress__contract from './img/progress__contract.svg';
import progress__done from './img/progress__done.svg';

export default class UserProfile extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	render() {
		return (
			<div className="UserProfile">
				<div className="UserProfile__progress">
					<h2 className="h2">Progress:</h2>
					<div className="ProgressItem">
						<div className="ProgressItem__img-and-text">
							<img className="ProgressItem__img" src={progress__newLead} alt="" />
							<p className="ProgressItem__img-caption">New lead</p>
						</div>

						<textarea className="ProgressItem__comment-textarea" placeholder= "Enter description here..." />
					</div>
					<div className="ProgressItem">
						<div className="ProgressItem__img-and-text">
							<img className="ProgressItem__img" src={progress__phoneCall} alt="" />
							<p className="ProgressItem__img-caption">Phone call</p>
						</div>
						<textarea className="ProgressItem__comment-textarea" />					

					</div>
					<div className="ProgressItem">
						<div className="ProgressItem__img-and-text">
							<img className="ProgressItem__img" src={progress__presentation} alt="" />
							<p className="ProgressItem__img-caption">Presentation</p>
						</div>
						<textarea className="ProgressItem__comment-textarea" />					
					</div>	
					<div className="ProgressItem">
						<div className="ProgressItem__img-and-text">
							<img className="ProgressItem__img" src={progress__contract} alt="" />
							<p className="ProgressItem__img-caption">Contract</p>
						</div>
						<textarea className="ProgressItem__comment-textarea" />					
					</div>	
					<div className="ProgressItem">
						<div className="ProgressItem__img-and-text">
							<img className="ProgressItem__img" src={progress__done} alt="" />
							<p className="ProgressItem__img-caption">Done!</p>
						</div>
						<textarea className="ProgressItem__comment-textarea" />					
					</div>	
					<div className="UserProfile__progress__form__button-container">
						<button className="UserProfile__progress__form__button">Save</button>
					</div>					
				</div>
				<div className="UserProfile__column2">
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
					<div className="UserProfile__tasks">
						<h2 className="h2">Tasks:</h2>
							<div className="UserProfile__tasks__task">
								<div className="UserProfile__tasks__task__input-group">
									<input className="UserProfile__tasks__task__input" placeholder="Name:"/>
									<select className="UserProfile__tasks__task__input">
									  <option value="12:00 AM">12:00 AM</option>
									  <option value="12:30 AM">12:30 AM</option>
									  <option value="01:00 AM">01:00 AM</option>
									  <option value="01:30 AM">01:30 AM</option>
									</select>

								</div>
								<textarea className="UserProfile__tasks__task__task-description" placeholder="Task description:" />
							</div>
							<div className="UserProfile__tasks__form__button-container">
								<button className="UserProfile__tasks__form__button">Add task</button>
							</div>
							<div className="UserProfile__tasks__form__button-container">
								<button className="UserProfile__tasks__form__button">Save</button>
							</div>						
					</div>
				</div>				
			</div>
		);
	}
}