import React, { Component } from 'react';

import progress__newLead from './img/progress__new-lead.svg'; // './img/progress__new-lead.svg';
import progress__phoneCall from './img/progress__phone-call.svg';
import progress__presentation from './img/progress__presentation.svg';
import progress__contract from './img/progress__contract.svg';
import progress__done from './img/progress__done.svg';
import progress__arrow from './img/progress__arrow.svg';
import { connect } from 'react-redux';

import './UserProfileProgress.component.css';

const progressItems_static = {
		images : [progress__newLead, progress__phoneCall, progress__presentation, progress__contract, progress__done],
		captions: ["New lead", "Phone call", "Presentation", "Contract", "Done!"]

	};

class UserProfileProgress extends Component {
	constructor(props) {
		super(props);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.saveProgressDescriptions = this.saveProgressDescriptions.bind(this);
		this.activateNthProgressSchemeItem = this.activateNthProgressSchemeItem.bind(this);
		var progressDescription = new Array(5).fill("");
		var activeProgressStep = 0;
		this.state = {
			progressDescription : progressDescription,
			activeProgressStep: activeProgressStep
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
	getClassOfProgressItemElement(i) {
		const baseClassName = "ProgressItem";
		return (i <= this.state.activeProgressStep) ? 
			baseClassName + " " + baseClassName + "_active" : 
			baseClassName + " " + baseClassName + "_non-active";		
	}

	/* ============================================================================================================ */
	renderProgressItems() {

		this.getClassOfProgressItemElement();
		var progressItemsJSX = [];
		for (let i=0; i < progressItems_static.images.length; i++) {
			progressItemsJSX.push(
					<div key={"progressItem"+i} className={this.getClassOfProgressItemElement(i)}>
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
	activateNthProgressSchemeItem(i, event) {
		console.log(i);
		this.setState({activeProgressStep : i});
	}

	/* ============================================================================================================ */
	getSchemeItemClass(i) {
		const baseClassName = "UserProfile__progress__progress-scheme__item";
		return (i <= this.state.activeProgressStep) ? 
			baseClassName + " " + baseClassName + "_active" : 
			baseClassName + " " + baseClassName + "_non-active";
	
	}

	/* ============================================================================================================ */
	renderProgressScheme() {
		function exeptLastArrow(i) {
			return (i === progressItems_static.images.length-1) ? "display-none" : "";
		}

		var scheme = [];
		
		for (let i=0; i < progressItems_static.images.length; i++) {
			scheme.push(

					<div key={"scheme"+i} className={this.getSchemeItemClass(i)}>
						<div onClick={this.activateNthProgressSchemeItem.bind(this, i)} className="UserProfile__progress__progress-scheme__item__figure">
							<img  className="UserProfile__progress__progress-scheme__item__figure__img" src={progressItems_static.images[i]} alt="" />
							<p className="UserProfile__progress__progress-scheme__item__figure__text">{progressItems_static.captions[i]}</p>
						</div>
						<div className={exeptLastArrow(i)}>
							<img className="UserProfile__progress__progress-scheme__item__arrow" src={progress__arrow} alt=""/>
						</div>
					</div>
				);
		}

		return (
				<div className="UserProfile__progress__progress-scheme">
					{scheme}
				</div>
			);
	}

	/* ============================================================================================================ */	
	render() { 

		return (
				<div className="UserProfile__progress">
					<h2 className="h2">Progress:</h2>
					
					{this.renderProgressScheme()}

					{this.renderProgressItems()}

					<div className="UserProfile__progress__form__button-container">
						<button onClick={this.saveProgressDescriptions}className="UserProfile__progress__form__button">Save</button>
					</div>					
				</div>
			);
	}
}



export default connect(null, null)(UserProfileProgress);