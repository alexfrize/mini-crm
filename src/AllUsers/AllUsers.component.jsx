import React, { Component } from 'react';
import './AllUsers.component.css';
import AllUsers__done from './img/all-tasks__done.svg';
import AllUsers__edit from './img/all-users__edit.svg';
import AllUsers__profile from './img/all-tasks__profile.svg';
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

import moment from 'moment';

import DatePicker from 'react-datepicker';
import './../datepicker/datepicker.css';

class AllUsers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users : [],
			tasks: [],
			tasks_untouched: [],
			isEditMode : false,
			searchFilter : "",
			activeModal: {
				id: null,
				answer : null
			},
			editTask : {
				taskNum : null
			},
			doneTask : {
				taskNum : null
			},
			userToEdit: {}
		};
		this.editUser = this.editUser.bind(this);
		this.cancelTask = this.cancelTask.bind(this);
		this.confirmIfTaskIsDone = this.confirmIfTaskIsDone.bind(this);
		this.markTaskAsDone = this.markTaskAsDone.bind(this);
		this.dontMarkTaskAsDone = this.dontMarkTaskAsDone.bind(this);
		this.getTaskTime__handleChange = this.getTaskTime__handleChange.bind(this);
		this.getTaskDate__handleChange = this.getTaskDate__handleChange.bind(this);
		this.getTaskDescription__handleChange = this.getTaskDescription__handleChange.bind(this);
		this.MODALSaveChanges__setAnswer = this.MODALSaveChanges__setAnswer.bind(this);

		this.filterTasks = this.filterTasks.bind(this);
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
	getTasksArray(newProps) {
		var alltasks = [];
		var taskObject = {};
		for (let userNum=0; userNum < newProps.users.length; userNum++ ) {
			for (let taskNum=0; taskNum < newProps.users[userNum].tasks.length; taskNum++) {
				if (newProps.users[userNum].tasks[taskNum].description !== "") {
					taskObject = {
						task : newProps.users[userNum].tasks[taskNum],
						user: newProps.users[userNum].profile
					};
					alltasks.push(taskObject);
				}
				else console.log(`User "${newProps.users[userNum].profile.name}" has an empty task!`)
			}
		}		
		// console.log("alltasks===",alltasks);

		alltasks.sort((task1, task2) => {
			let date1 = moment(task1.task.date, 'MM/DD/YYYY');
			let date2 = moment(task2.task.date, 'MM/DD/YYYY');
			if (moment(date1).isSame(date2)) {
				let time1 = moment(task1.task.time, 'hh:mm');
				let time2 = moment(task2.task.time, 'hh:mm');
				if (moment(time1).isBefore(time2)) return -1; else return 1;
			}
			if (moment(date1).isBefore(date2)) return -1; else return 1;
		});
		return alltasks;
	}

	/* ============================================================================================================ */	
	editUser(userNum, event) {
		this.setState({
			userToEdit : this.state.users[userNum]
		});

		this.props.action__updateUserToEdit(this.state.users[userNum])

	}

	/* ============================================================================================================ */	
	getTaskTime__handleChange(event) {
		let editTask = this.state.editTask;
		editTask.time = event.target.value;
		this.setState({
			editTask
		});		
	}

	/* ============================================================================================================ */
	render__getTaskTime__timeValues() {
		var options = [];
		var val = new Array(4);
		var am_pm = "";
		var timeHour = 0;
		for (let i=0; i<=23; i++) {
			if (i < 12) {
				am_pm = " AM";
				timeHour = i;
			}
			else {
				am_pm = " PM";
				timeHour = i - 12; 
			}
			if (timeHour === 0) {
				val[0] = "12:00" + am_pm;
				val[1] = "12:15" + am_pm;
				val[2] = "12:30" + am_pm;
				val[3] = "12:45" + am_pm;
			}
			else {
				val[0] = (timeHour >= 10) ? timeHour+":00" + am_pm : "0"+timeHour+":00" + am_pm;
				val[1] = (timeHour >= 10) ? timeHour+":15" + am_pm : "0"+timeHour+":15" + am_pm;
				val[2] = (timeHour >= 10) ? timeHour+":30" + am_pm : "0"+timeHour+":30" + am_pm;
				val[3] = (timeHour >= 10) ? timeHour+":45" + am_pm : "0"+timeHour+":45" + am_pm;												
			}
			for (let c=0; c<4; c++) {
				options.push(<option key={i+"0"+c} value={val[c]}>{val[c]}</option>);
			}
		}
		return (
			<select className="AllUsers__table__edit-mode__input" onChange={this.getTaskTime__handleChange} value={this.state.editTask.time}>
				{options}
			</select>
		);
	}

	/* ============================================================================================================ */	
	getTaskTime(taskNum) {
		return (this.state.isEditMode && this.state.editTask.taskNum === taskNum) ? 
			(<td>
				{this.render__getTaskTime__timeValues()}
			</td>) :
			<td className={this.isOverdueClassName(taskNum)}><div className="AllUsers__table__view-mode__input">{this.state.tasks[taskNum].task.time}</div></td>
	
	}
	
	/* ============================================================================================================ */	
	getTaskDate__handleChange(date) {
		console.log("date:",date);
		console.log('this.state.editTask.date ==',this.state.editTask.date);
		let editTask = this.state.editTask;
		editTask.date = date;
		this.setState({
			editTask
		});
	}
	
	/* ============================================================================================================ */	
	getTaskDate(taskNum) {
		return (this.state.isEditMode && this.state.editTask.taskNum === taskNum) ?
			(
				<td>
					<DatePicker className="AllUsers__table__edit-mode__input"
					    selected={this.state.editTask.date}
					    onChange={this.getTaskDate__handleChange}
					/>
				</td>
			) :
			(

				<td className={this.isOverdueClassName(taskNum)}>
					{this.state.tasks[taskNum].task.date}
					<p className={this.isOverdueClassName__smallWarning(taskNum)}>
						{this.isOverdueText(taskNum)}
					</p>
				</td>
			);
	}

	/* ============================================================================================================ */	
	getTaskDescription__handleChange(event) {
		let editTask = this.state.editTask;
		editTask.description = event.target.value;
		this.setState({
			editTask
		});
	}

	/* ============================================================================================================ */	
	getTaskDescription(taskNum) {
		return (this.state.isEditMode && this.state.editTask.taskNum === taskNum) ?
		(
			<textarea className="AllUsers__table__edit-mode__textarea" value={this.state.editTask.description} onChange={this.getTaskDescription__handleChange}></textarea> 
		) :
			<div className="AllUsers__table__view-mode__textarea">{this.state.tasks[taskNum].task.description}</div>;
	}

	/* ============================================================================================================ */	
	showModal(modalId, event) {
		this.setState({
			activeModal : {
				id: modalId,
				answer: null
			}
		});
		/* IMPORTANT: CHECK ALL CHANGES IN initModal() */
	}

	/* ============================================================================================================ */	
	hideModal() {
		this.setState({
			activeModal : {
				id: null,
				answer: null
			}
		});
	}

	/* ============================================================================================================ */	
	cancelTask() {
		let editTask = {
			taskNum : null,
			date: null,
			time: null,
			description : null
		}
		this.setState({
			editTask
		});
	}

	/* ============================================================================================================ */	
	clearDoneTaskInfo() {
		let doneTask = {
			taskNum : null
		}
		this.setState({
			doneTask
		});
	}
	/* ============================================================================================================ */	
	markTaskAsDone() {
		let taskNumToMarkAsDone = this.state.doneTask.taskNum;
		console.log(`Task ${taskNumToMarkAsDone} is marked as done:`, this.state.tasks[taskNumToMarkAsDone]);
		let tasks = this.state.tasks;
		var taskToDelete = JSON.stringify(this.state.tasks[taskNumToMarkAsDone].task);
		tasks.splice(taskNumToMarkAsDone,1);
		console.log("taskToDelete === ", taskToDelete);
		/*
			******************************

			IMPORTANT!
			Dont' forget to modify users array and save it to DB!

			******************************
		*/
		var _url = "/api/deletetask";
		fetch(_url, {
			method : "PUT",
			headers: {
				"Content-Type" : "application/json"
			},
			body: taskToDelete
		});
		
		this.clearDoneTaskInfo();
		this.hideModal();
		this.setState({
			tasks
		})
	}

	/* ============================================================================================================ */	
	dontMarkTaskAsDone() {
		this.clearDoneTaskInfo();
		this.hideModal();
	}

	/* ============================================================================================================ */	
	confirmIfTaskIsDone(taskNum, event) {
		this.setState({
			doneTask: {
				taskNum
			}
		});
		this.showModal("MODAL::MarkAsDone", event);
		console.log("confirmIfTaskIsDone");
	}

	/* ============================================================================================================ */	
	saveTask() {

		let taskNum = this.state.editTask.taskNum;
		var tasks = this.state.tasks;
		tasks[taskNum].task = {
			task_id : this.state.editTask.task_id,
			time : this.state.editTask.time,
			date : this.state.editTask.date.format("MM/DD/YYYY"),
			description: this.state.editTask.description
		}

		var _url="/api/updatetask";

		var dataToUpdate = JSON.stringify(tasks[taskNum].task);

		fetch(_url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: dataToUpdate

		})
		.catch(err => {
			console.error(err);
			
		});
		console.log("dataToUpdate === ", dataToUpdate);


		let editTask = {
			task_id : null,
			taskNum : null,
			date: null,
			time: null,
			description : null
		}
		this.setState({
			tasks,
			editTask
		});

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
	getProgressIcons(taskNum) {
		return (this.state.isEditMode && this.state.editTask.taskNum === taskNum) ? 
			(
				<td>
					<img onClick={this.showModal.bind(this, "MODAL::SaveChanges")} className="AllUsers__table__img" src={AllUsers__done} alt="" />
					<img onClick={this.cancelTask} className="AllUsers__table__img" src={AllUsers__delete} alt="" />
				</td>
			) :
			(
				<td>
				
					<img className="AllUsers__table__progress-img" src={AllUsers__progress__newLead} alt="" />
					<img className="AllUsers__table__progress-img-arrow" src={AllUsers__progress__arrow} alt="" />
					<img className="AllUsers__table__progress-img" src={AllUsers__progress__phoneCall} alt="" />
					<img className="AllUsers__table__progress-img-arrow" src={AllUsers__progress__arrow} alt="" />
					<img className="AllUsers__table__progress-img" src={AllUsers__progress__presentation} alt="" />
					<img className="AllUsers__table__progress-img-arrow" src={AllUsers__progress__arrow} alt="" />
					<img className="AllUsers__table__progress-img" src={AllUsers__progress__contract} alt="" />
					<img className="AllUsers__table__progress-img-arrow" src={AllUsers__progress__arrow} alt="" />
					<img className="AllUsers__table__progress-img" src={AllUsers__progress__done} alt="" />
					
				</td>
			);
	}
	/* ============================================================================================================ */	
	MODALSaveChanges__setAnswer(answer, event) {
		let activeModal = this.state.activeModal;
		activeModal = {
			answer : answer,
			id: null
		}
		this.setState({
			activeModal
		});
		
		if (answer.toUpperCase() === "YES") this.saveTask();
		else this.cancelTask();
		this.hideModal();
	}

	/* ============================================================================================================ */	
	filterTasks(event) {
		var tasks_untouched;
		if (!this.state.tasks_untouched.length) {
			tasks_untouched = this.state.tasks;
		} 
		else tasks_untouched = this.state.tasks_untouched;
		console.log(tasks_untouched);
		let searchFilter = event.target.value;
		var tasks = tasks_untouched.filter(element => {
			return (element.task.description.toUpperCase().search(searchFilter.toUpperCase()) !== -1);
	 	});

		console.log(searchFilter);
		console.log("tasks==",tasks);

		this.setState({
			searchFilter,
			tasks_untouched,
			tasks
		});
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
			if (this_state.users.length === 0) return "All users:";
			return (this_state.tasks.length === this_state.tasks_untouched.length) ? "All users:" : "Filtered users:";
		}
		var tasksTable = [];
		console.log("==>this.state.users",this.state.users);
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
													Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
													tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
													quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
													consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
												</td>
												{this.getProgressIcons(i)}
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

				{this.initModal()}

				<div className="AllUsers__header">
					<h2 className="h2">{allOrFiltered()}</h2>
					<div className="AllUsers__search-box">
						<input onChange={this.filterTasks.bind(this)} value={this.state.searchFilter} className="AllUsers__search-box__input" type="input" placeholder="Search"/>
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