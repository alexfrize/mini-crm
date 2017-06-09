import React, { Component } from 'react';

import progress__newLead from './img/progress__new-lead.svg';
import progress__phoneCall from './img/progress__phone-call.svg';
import progress__presentation from './img/progress__presentation.svg';
import progress__contract from './img/progress__contract.svg';
import progress__done from './img/progress__done.svg';

import './UserProfileProgress.component.css';

const progressItems_static = {
		images : [progress__newLead, progress__phoneCall, progress__presentation, progress__contract, progress__done],
		captions: ["New lead", "Phone call", "Presentation", "Contract", "Done!"]

	};

export default class UserProfileProgress extends Component {
	constructor(props) {
		super(props);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.saveProgressDescriptions = this.saveProgressDescriptions.bind(this);
		var progressDescription = new Array(5).fill("");
		this.state = {
			progressDescription : progressDescription
		};
	}

	/* ============================================================================================================ */	
	handleDescriptionChange(progressItemNum, event) {
		var progressDescription = this.state.progressDescription;
		progressDescription[progressItemNum] = event.target.value;
		this.setState({
			progressDescription
		});
	}

	/* ============================================================================================================ */
	saveProgressDescriptions(progressItemNum, event) {
		console.log(this.state.progressDescription);
	}

	/* ============================================================================================================ */
	renderProgressItems() {
		var progressItemsJSX = [];
		for (let i=0; i < progressItems_static.images.length; i++) {
			progressItemsJSX.push(
					<div key={"progressItem"+i} className="ProgressItem">
						<div className="ProgressItem__img-and-text">
							<img className="ProgressItem__img" src={progressItems_static.images[i]} alt="" />
							<p className="ProgressItem__img-caption">{progressItems_static.captions[i]}</p>
						</div>
						<textarea onChange={this.handleDescriptionChange.bind(this, i)} className="ProgressItem__comment-textarea" placeholder= "Enter description here..." />
					</div>
				);
		}
		return (<div>{progressItemsJSX}</div>)
	}

	/* ============================================================================================================ */	
	render() { 

		return (
				<div className="UserProfile__progress">
					<h2 className="h2">Progress:</h2>
					
					{this.renderProgressItems()}


					<div className="UserProfile__progress__form__button-container">
						<button onClick={this.saveProgressDescriptions}className="UserProfile__progress__form__button">Save</button>
					</div>					
				</div>
			);
	}
}

