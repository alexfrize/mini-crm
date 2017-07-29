import React, { Component } from 'react';
import { connect } from 'react-redux';

class Modal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: {
				type: "",
				message : ""
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		var { modal } = nextProps;
		console.log("MODAL::nextProps", nextProps);
		this.setState( { modal });
	}

	render() {
		var activeModalHTML = null;
		
		switch (this.state.modal.type) {
			case "MODAL::MarkAsDone" : 
				activeModalHTML = (
					<div className="overlay">
						<div className="modal">
					 		<p>
					 			Test modal window :) Mark as done?
					 		</p>
					 		<div className="modal__button-container">
					 			<button onClick={this.markTaskAsDone} className="modal__button">
					 				Yes
					 			</button>
					 			<button onClick={this.dontMarkTaskAsDone} className="modal__button">
					 				No
					 			</button>			 			
					 		</div>
						</div>
					</div>
				);
				break;

			case "MODAL::Hide" : 
				activeModalHTML = null;

			default: break;

		}

		
		return activeModalHTML;
	}
}

function mapStateToProps(state) {
	return {
		modal : state.modal
	}
}

export default connect(mapStateToProps, null)(Modal);