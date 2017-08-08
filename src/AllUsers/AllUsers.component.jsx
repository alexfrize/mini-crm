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
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { action__updateUserToEdit, action__deleteUserFromDB } from '../actions';
import { action_showModal, action__clearModalState } from '../actions/modal';

class AllUsers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users : [],
			searchFilter : "",
			userToEdit: {},
			modal : {}
		};
		this.editUser = this.editUser.bind(this);
	}

	/* ============================================================================================================ */	
	componentWillMount() {
	}

	/* ============================================================================================================ */	
	componentDidMount() {
		this.componentWillReceiveProps(this.props)
	}

	componentWillReceiveProps(newProps){
		if (newProps.modal) {
			if (newProps.modal.answer === "MODAL::DeleteUser::Yes") { 
				console.warn("newProps.modal.answer:==",newProps.modal.answer);
				this.deleteUser(newProps.modal.userId); 
				this.props.action__clearModalState();
			}
		}

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
	deleteUser(userId) {
		console.log("Deleting user ", userId);
		this.props.action__deleteUserFromDB({ _id : userId });
	}
	/* ============================================================================================================ */	
	getSmallIcons(userNum) {
			return (
				<td>
					<img onClick={this.editUser.bind(this,userNum)} className="AllUsers__table__img" src={AllUsers__edit} alt="" />
					<img onClick={() => this.props.action_showModal({ type: "MODAL::DeleteUser", userId: this.state.users[userNum]._id }) } className="AllUsers__table__img" src={AllUsers__delete} alt="" />
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
	//filterUsers
	/* ============================================================================================================ */	
	setSearchFilter(e) {
		console.log("filterUsers()");
		let searchFilter = e.target.value;
		this.setState({ searchFilter });
	}

	/* ============================================================================================================ */	
	render() {
		var this_state = this.state;
		function allOrFiltered() {
			return (this_state.searchFilter === "") ? "All users:" : "Filtered users:";
		}
		var usersTable = [];
		// console.log("==>this.state.users",this.state.users);
		var filteredUsers = this.state.users.filter(user => {
			let found = false;
			if ((user.profile.name.toUpperCase().search(this_state.searchFilter.toUpperCase()) !== -1) ||
				(user.profile.email.toUpperCase().search(this_state.searchFilter.toUpperCase()) !== -1) ||
				(user.profile.description.toUpperCase().search(this_state.searchFilter.toUpperCase()) !== -1)) found = true; 
			return found;
		});

		if (filteredUsers.length !== 0) {
			for (let i=0; i<filteredUsers.length; i++) {
				usersTable.push(
							<tr key={"tablerow"+i}>
								<td>
									<table className="AllUsers__table__sub-table">
											<tbody>
												<tr>
													<td>{filteredUsers[i].profile.name}</td>
													<td>{filteredUsers[i].profile.phone}</td>
													<td>{filteredUsers[i].profile.email}</td>
													<td>Tasks: {filteredUsers[i].tasks.length}</td>
												</tr>
												<tr>
													<td colSpan="3" className="AllUsers__table__sub-table__description">
														{filteredUsers[i].profile.description}
													</td>
													{this.getProgressIcons(filteredUsers[i].progress)}
												</tr>	
											</tbody>
									</table>
								</td>

								{this.getSmallIcons(i)}
							</tr>
				)
			}
		} else usersTable.push(<tr key={"not_found"}><td>Sorry, no results found for «{this.state.searchFilter}»</td></tr>);

		return (
			<div className="AllUsers">

				<div className="AllUsers__header">
					<h2 className="h2">{allOrFiltered()}</h2>
					<div className="AllUsers__search-box">
						<input onChange={(e) => this.setSearchFilter(e) } value={this.state.searchFilter} className="AllUsers__search-box__input" type="input" placeholder="Search"/>
					</div>
				</div>
				
				<table className="AllUsers__table">
					<tbody>
						{ usersTable }																				
					</tbody>
				</table>

			</div>
		);
	}
}

function mapStateToProps(data) {
	return { 
		users: data.users,
		userToEdit: data.userToEdit,
		modal: data.modal
	 };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ action__updateUserToEdit, action__deleteUserFromDB, action_showModal, action__clearModalState }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllUsers));