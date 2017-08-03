import React, { Component } from 'react';
import './AllUsers.component.css';
import AllUsers__edit from './img/all-users__edit.svg';
import AllUsers__delete from './img/all-tasks__delete.svg';
import AllUsers__progress__arrow from './img/all-users__progress__arrow.svg';
import AllUsers__progress__contract from './img/all-users__progress__contract.svg';
import AllUsers__progress__done from './img/all-users__progress__done.svg';
import AllUsers__progress__newLead from './img/all-users__progress__new-lead.svg';
import AllUsers__progress__phoneCall from './img/all-users__progress__phone-call.svg';
import AllUsers__progress__presentation from './img/all-users__progress__presentation.svg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { action__updateUserToEdit } from '../actions';

class AllUsers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users : [],
			searchFilter : "",
			userToEdit: {}
		};
		this.editUser = this.editUser.bind(this);
	}

	/* ============================================================================================================ */	
	componentWillMount() {
	}

	/* ============================================================================================================ */	
	componentDidMount() {

	}

	componentWillReceiveProps(newProps){
		this.setState({
			users: newProps.users,
			userToEdit : newProps.userToEdit
		})

	}	

	/* ============================================================================================================ */	
	editUser(userNum, event) {
		this.setState({
			userToEdit : this.state.users[userNum]
		});

		this.props.action__updateUserToEdit(this.state.users[userNum])
	}

	/* ============================================================================================================ */	
	getSmallIcons(userNum) {
			return (
				<td>
					<img onClick={this.editUser.bind(this,userNum)} className="AllUsers__table__img" src={AllUsers__edit} alt="" />
					<img className="AllUsers__table__img" src={AllUsers__delete} alt="" />
				</td>
			);
	}
	/* ============================================================================================================ */	
	getProgressIcons(userProgress) {
		
		function getImgStyle(iconNum) {
			const op40 = { opacity: "0.4" };
			const op100 = { opacity: "1" };
			return (userProgress.length <= iconNum) ? op40 : op100;
		}
		return 	(
				<td>
					<img style={ getImgStyle(0) } className="AllUsers__table__progress-img" src={AllUsers__progress__newLead} alt="" />
					<img style={ getImgStyle(1) } className="AllUsers__table__progress-img-arrow" src={AllUsers__progress__arrow} alt="" />
					<img style={ getImgStyle(1) } className="AllUsers__table__progress-img" src={AllUsers__progress__phoneCall} alt="" />
					<img style={ getImgStyle(2) } className="AllUsers__table__progress-img-arrow" src={AllUsers__progress__arrow} alt="" />
					<img style={ getImgStyle(2) } className="AllUsers__table__progress-img" src={AllUsers__progress__presentation} alt="" />
					<img style={ getImgStyle(3) } className="AllUsers__table__progress-img-arrow" src={AllUsers__progress__arrow} alt="" />
					<img style={ getImgStyle(3) } className="AllUsers__table__progress-img" src={AllUsers__progress__contract} alt="" />
					<img style={ getImgStyle(4) } className="AllUsers__table__progress-img-arrow" src={AllUsers__progress__arrow} alt="" />
					<img style={ getImgStyle(4) } className="AllUsers__table__progress-img" src={AllUsers__progress__done} alt="" />
					
				</td>
			);
	}

	/* ============================================================================================================ */	
	filterUsers() {
		console.log("filterUsers()");
	}


	/* ============================================================================================================ */	
	initModal() {
		let activeModalHTML;
				if (this.state.activeModal.id === "MODAL::MarkAsDone")
			activeModalHTML = (
				<div className="overlay">
					<div className="modal">
				 		<p>
				 			Are you sure you want to mark this task as done?
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
		else
		if (this.state.activeModal.id === "MODAL::SaveChanges")
			activeModalHTML = (
				<div className="overlay">
					<div className="modal">
				 		<p>
				 			Do you want to save changes?
				 		</p>
				 		<div className="modal__button-container">
				 			<button onClick={this.MODALSaveChanges__setAnswer.bind(this, "yes")} className="modal__button">
				 				Yes
				 			</button>
				 			<button onClick={this.MODALSaveChanges__setAnswer.bind(this, "no")} className="modal__button">
				 				No
				 			</button>			 			
				 		</div>
					</div>
				</div>
			);				
		else activeModalHTML = <div></div>;
		return activeModalHTML;
	}
	/* ============================================================================================================ */	
	render() {
		var this_state = this.state;
		function allOrFiltered() {
			return "All users:"; // : "Filtered users:";
		}
		var tasksTable = [];
		// console.log("==>this.state.users",this.state.users);
		for (let i=0; i<this.state.users.length; i++) {
			tasksTable.push(
						<tr key={"tablerow"+i}>
							<td>
								<table className="AllUsers__table__sub-table">
										<tbody>
											<tr>
												<td>{this.state.users[i].profile.name}</td>
												<td>{this.state.users[i].profile.phone}</td>
												<td>{this.state.users[i].profile.email}</td>
												<td>Tasks: {this.state.users[i].tasks.length}</td>
											</tr>
											<tr>
												<td colSpan="3" className="AllUsers__table__sub-table__description">
													{this.state.users[i].profile.description}
												</td>
												{this.getProgressIcons(this_state.users[i].progress)}
											</tr>	
										</tbody>
								</table>
							</td>

							{this.getSmallIcons(i)}
						</tr>
			)
		}

		return (
			<div className="AllUsers">

				<div className="AllUsers__header">
					<h2 className="h2">{allOrFiltered()}</h2>
					<div className="AllUsers__search-box">
						<input onChange={() => this.filterUsers() } value={this.state.searchFilter} className="AllUsers__search-box__input" type="input" placeholder="Search"/>
					</div>
				</div>
				
				<table className="AllUsers__table">
					<tbody>
						{ tasksTable }																				
					</tbody>
				</table>

			</div>
		);
	}
}

function mapStateToProps(data) {
	return { 
		users: data.users,
		userToEdit: data.userToEdit
	 };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ action__updateUserToEdit }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);