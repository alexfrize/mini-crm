import React, { Component } from 'react';
import { connect } from 'react-redux';
import { action_hideModal } from '../actions/modal';
import { bindActionCreators } from 'redux';

class Modal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: this.emptyModal()
		}
	}

	/*
		*********************************************************************************************************
		Modal structure has:
			type - type of modal (defines text in modal window), e.g. "MODAL::SaveChanges"
			answer - answer (Yes or No) - defines last modal type + answer, e.g. "MODAL::SaveChanges::Yes"
			taskId - this parameter is used when we manipulate task object, e.g. save changes to task
			userId - this parameter is used when we mmanipulate user object, e.g. delete user
		*********************************************************************************************************
	*/

	emptyModal() {
		return {
			type: "",
			answer : "",
			taskId : "",
			userId: ""
		}
	}
	
	// =======================================================================================================
	componentWillReceiveProps(nextProps) {
		var { modal } = nextProps;
		// console.log("MODAL::nextProps", nextProps);
		this.setState( { modal });
		if (modal.answer) console.log("Answer is ", modal.answer);
	}

	// =======================================================================================================
	setModalAnswer(answer) {
		
		var { modal } = this.state;
		modal.answer = answer;
		this.props.action_hideModal(modal);
	}

	// =======================================================================================================
	render() {
		var activeModalHTML = null;
		var modalTypeNum = -1;
		const MODAL_Types = [
								"MODAL::MarkAsDone",
								"MODAL::SaveChanges",
								"MODAL::UserNameNotDefined",
								"MODAL::DeleteUser"
							];
		const MODAL_Messages = ["Are you sure you want to mark this task as done?",
								"Do you want to save changes?",
								"Cannot save progress for undefined user. Please fill user name, email and phone.",
								"Are you sure you want to delete this user from database?"
							];

		const MODAL_WindowType = ["Dialog",
								  "Dialog",
								  "Message",
								  "Dialog"];

		for (let i=0; i < MODAL_Types.length; i++) {
			if (this.state.modal.type === MODAL_Types[i]) modalTypeNum = i;
		}

		var _this = this;
		// ==============================================
		function dialogOrMessage() {
			return (MODAL_WindowType[modalTypeNum] === "Dialog") ? (
							<div className="modal__button-container">
					 			<button onClick={ () => _this.setModalAnswer(MODAL_Types[modalTypeNum]+"::Yes") } className="modal__button">
					 				Yes
					 			</button>
					 			<button onClick={ () => _this.setModalAnswer(MODAL_Types[modalTypeNum]+"::No") } className="modal__button">
					 				No
					 			</button>			 			
					 		</div>
				) :
			(
							<div className="modal__button-container">
					 			<button onClick={ () => _this.setModalAnswer(MODAL_Types[modalTypeNum]+"::OK") } className="modal__button">
					 				OK
					 			</button>
					 		</div>

				)
		}
		// ==============================================

		activeModalHTML = (modalTypeNum !== -1) ?
				(
					<div className="overlay">
						<div className="modal">
					 		<p>
					 			{ MODAL_Messages[modalTypeNum] }
					 		</p>

					 		{ dialogOrMessage() }
					 		
						</div>
					</div>
				) : null;

		return activeModalHTML;
	}
}


function mapStateToProps(state) {
	return {
		modal : state.modal
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ action_hideModal }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);