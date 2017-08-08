import React, { Component } from 'react';
import './AllTasks.component.css';
import allTasks__done from './img/all-tasks__done.svg';
import allTasks__edit from './img/all-tasks__edit.svg';
import allTasks__profile from './img/all-tasks__profile.svg';
import allTasks__cancel from './img/all-tasks__cancel.svg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { action__deleteTaskFromDB } from '../actions';
import { action_updateOneTaskDB } from '../actions';
import { action__updateUserToEdit } from '../actions';

import { action_showModal } from '../actions/modal';
import { action__clearModalState } from '../actions/modal';


import moment from 'moment';


import DatePicker from 'react-datepicker';
import './../datepicker/datepicker.css';

class AllTasks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users : [],
			filteredTasks: [],
			allTasks: [],
			userToEdit: {},
			isEditMode : false,
			searchFilter : "",
			modal: {},
			editTask : {
				taskNum : null
			}
		};
		this.editTask = this.editTask.bind(this);
		this.cancelTask = this.cancelTask.bind(this);
		this.markTaskAsDone = this.markTaskAsDone.bind(this);
		this.getTaskTime__handleChange = this.getTaskTime__handleChange.bind(this);
		this.getTaskDate__handleChange = this.getTaskDate__handleChange.bind(this);
		this.getTaskDescription__handleChange = this.getTaskDescription__handleChange.bind(this);
		// this.filterTasks = this.filterTasks.bind(this);
	}

	/* ============================================================================================================ */	
	emptyEditTaskObj() {
		let editTask = {
			task_id : null,
			taskNum : null,
			date: null,
			time: null,
			description : null
		}
		return editTask;
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
	getFilteredTasks(tasks, searchFilter = "") {
		var filteredTasks = tasks.filter(task => {
			let found = false;
			if ((task.task.description.toUpperCase().search(searchFilter.toUpperCase()) !== -1) ||
				(task.user.email.toUpperCase().search(searchFilter.toUpperCase()) !== -1) ||
				(task.user.name.toUpperCase().search(searchFilter.toUpperCase()) !== -1)) found = true; 
			return found;
		});
		return filteredTasks;
	}

	componentDidMount() {
		this.componentWillReceiveProps(this.props)
	}

	/* ============================================================================================================ */	
	componentWillReceiveProps(newProps){
		if (newProps.modal) this.checkModalState(newProps.modal);
		var allTasks = this.getTasksArray(newProps);
		var filteredTasks = this.getFilteredTasks(allTasks, this.state.searchFilter);
		this.setState({
			modal: newProps.modal,
			userToEdit : newProps.userToEdit,
			users: newProps.users,
			filteredTasks : filteredTasks,
			allTasks : allTasks
		})

	}	
	
	/* ============================================================================================================ */	
	checkModalState(modal) {
		switch (modal.answer) {
			case "MODAL::MarkAsDone::Yes" :
											this.markTaskAsDone(modal.taskId);
											break;
			case "MODAL::MarkAsDone::No" :
											this.props.action__clearModalState();
											break;
			case "MODAL::SaveChanges::Yes" :
											this.saveTask();
											break;
			case "MODAL::SaveChanges::No" :
											let editTask = this.emptyEditTaskObj();
											this.setState({ editTask });
											this.props.action__clearModalState();
											break;
			default:
											break;											
		}
		
	}
	
	/* ============================================================================================================ */	
	isOverdue(taskNum) {
		var filteredTasks = this.state.filteredTasks;
		var timeNow = moment();
		let taskDate = moment(filteredTasks[taskNum].task.date + " " + filteredTasks[taskNum].task.time, 'MM/DD/YYYY hh:mm');
		return (moment(timeNow).isAfter(taskDate));
	}

	/* ============================================================================================================ */	
	isOverdueClassName(taskNum) {
		return this.isOverdue(taskNum) ? "AllTasks__table__overdue" : "";
	}

	/* ============================================================================================================ */	
	isOverdueText(taskNum) {
		return this.isOverdue(taskNum) ? "Task is overdue!" : "";		
	}

	/* ============================================================================================================ */	
	isOverdueClassName__smallWarning(taskNum) {
		return this.isOverdue(taskNum) ? "AllTasks__table__small-warning" : "AllTasks__table__display-none";
	}

	/* ============================================================================================================ */	
	getOverdueTasks() {
		var filteredTasks = this.state.filteredTasks;
		let overdueTasks=0;
		for (let i=0; i < filteredTasks.length; i++) {
			if (this.isOverdue(i)) overdueTasks++;
		}

		return (overdueTasks !== 0) ?
			(
				<span>{filteredTasks.length}
					&nbsp;&nbsp;&nbsp;
					<span className="AllTasks__header__overdue-tasks">
						Overdue tasks: {overdueTasks}
					</span>
				</span>
			) :
			(
				<span>
					{filteredTasks.length}
				</span>
			)
	}

	/* ============================================================================================================ */	
	editTask(taskNum, event) {
		var filteredTasks = this.state.filteredTasks;
		let isEditMode;
		if (taskNum !== this.state.editTask.taskNum) isEditMode = true;
		else isEditMode = false;

		let editTask = {
			taskNum: taskNum,
			task_id: filteredTasks[taskNum].task.task_id,
			time: filteredTasks[taskNum].task.time,
			date: moment(filteredTasks[taskNum].task.date, 'MM/DD/YYYY'),
			description: filteredTasks[taskNum].task.description,
		};

		this.setState({
			isEditMode,
			editTask
		});
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
			<select className="AllTasks__table__edit-mode__input" onChange={this.getTaskTime__handleChange} value={this.state.editTask.time}>
				{options}
			</select>
		);
	}

	/* ============================================================================================================ */	
	getTaskTime(taskNum) {
		var filteredTasks = this.state.filteredTasks;
		return (this.state.isEditMode && this.state.editTask.taskNum === taskNum) ? 
			(<td>
				{this.render__getTaskTime__timeValues()}
			</td>) :
			<td className={this.isOverdueClassName(taskNum)}><div className="AllTasks__table__view-mode__input">{filteredTasks[taskNum].task.time}</div></td>
	}
	
	/* ============================================================================================================ */	
	getTaskDate__handleChange(date) {
		let editTask = this.state.editTask;
		editTask.date = date;
		this.setState({
			editTask
		});
	}
	
	/* ============================================================================================================ */	
	getTaskDate(taskNum) {
		var filteredTasks = this.state.filteredTasks;
		return (this.state.isEditMode && this.state.editTask.taskNum === taskNum) ?
			(
				<td>
					<DatePicker className="AllTasks__table__edit-mode__input"
					    selected={this.state.editTask.date}
					    onChange={this.getTaskDate__handleChange}
					/>
				</td>
			) :
			(

				<td className={this.isOverdueClassName(taskNum)}>
					{filteredTasks[taskNum].task.date}
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
		var filteredTasks = this.state.filteredTasks;
		return (this.state.isEditMode && this.state.editTask.taskNum === taskNum) ?
		(
			<textarea className="AllTasks__table__edit-mode__textarea" value={this.state.editTask.description} onChange={this.getTaskDescription__handleChange}></textarea> 
		) :
			<div className="AllTasks__table__view-mode__textarea">{filteredTasks[taskNum].task.description}</div>;
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
	getTaskNumByTaskId(taskId) {
		var filteredTasks = this.state.filteredTasks;
		for (let i = 0; i < filteredTasks.length; i++) {
			if (filteredTasks[i].task.task_id === taskId) return i;
		}
	}

	/* ============================================================================================================ */	
	markTaskAsDone(taskId) {
		var filteredTasks = this.state.filteredTasks;
		var users = this.state.users;
		var taskNumToMarkAsDone = this.getTaskNumByTaskId(taskId);
		for (let user of users) {
			user.tasks = user.tasks.filter(task => task.task_id !== taskId);
		}
		
		var taskToDelete = JSON.stringify(filteredTasks[taskNumToMarkAsDone].task);
		taskToDelete = JSON.stringify({task_id : taskId});
		
		this.props.action__deleteTaskFromDB(taskToDelete);
		this.props.action__clearModalState(); 
	}

	/* ============================================================================================================ */	
	saveTask() {
		if (!this.state.isEditMode) return;
		var _this = this;

		// ************************
		function updateUsersArray() {
			for (let user of _this.state.users) {
				for (let task of user.tasks) {
					if (task.task_id === taskToUpdate.task_id) {
						task.time = taskToUpdate.time;
						task.date = taskToUpdate.date;
						task.description = taskToUpdate.description;
					}	
				}
			}
		}

		// ************************
		function updateUserToEdit() {
			if (!_this.state.userToEdit.tasks) return;
			var userToEdit;
			for (let user of _this.state.users) {
				for (let i=0; i < user.tasks.length; i++) {
					if (user.tasks[i].task_id === taskToUpdate.task_id) {
						userToEdit = Object.assign({}, user);
						userToEdit.tasks[i] = taskToUpdate;
					}	
				}
			}
			_this.props.action__updateUserToEdit(userToEdit);
		}
		// ************************		

		let taskNum = this.state.editTask.taskNum;
		var filteredTasks = this.state.filteredTasks;

		filteredTasks[taskNum].task = {
			task_id : this.state.editTask.task_id,
			time : this.state.editTask.time,
			date : this.state.editTask.date.format("MM/DD/YYYY"),
			description: this.state.editTask.description
		}
		var taskToUpdate = filteredTasks[taskNum].task;
		updateUserToEdit();
		this.props.action_updateOneTaskDB(taskToUpdate);
		updateUsersArray();
		let editTask = this.emptyEditTaskObj();
		this.setState({
				editTask,
				isEditMode : false
		});
	}
	/* ============================================================================================================ */	
	setUserToEdit(taskID) {
		var userToEdit;
		for (let user of this.state.users) {
			for (let task of user.tasks) {
				if (task.task_id === taskID) {
					userToEdit = user;
				}	
			}
		}
		this.props.action__updateUserToEdit(userToEdit);
	}

	/* ============================================================================================================ */	
	getSmallIcons(taskNum) {
		var filteredTasks = this.state.filteredTasks;
		return (this.state.isEditMode && this.state.editTask.taskNum === taskNum) ? 
			(
				<td>
					<img onClick={ () => this.props.action_showModal({ type : "MODAL::SaveChanges", taskId : filteredTasks[taskNum].task.task_id }) } className="AllTasks__table__img" src={allTasks__done} alt="" />
					<img onClick={this.cancelTask} className="AllTasks__table__img" src={allTasks__cancel} alt="" />
				</td>
			) :
			(
				<td>
					<img onClick={this.editTask.bind(this,taskNum)} className="AllTasks__table__img" src={allTasks__edit} alt="" />
					<img onClick={ () => this.setUserToEdit(filteredTasks[taskNum].task.task_id) } className="AllTasks__table__img" src={allTasks__profile} alt="" />
					<img onClick={ () => this.props.action_showModal({ type : "MODAL::MarkAsDone", taskId : filteredTasks[taskNum].task.task_id }) } className="AllTasks__table__img" src={allTasks__done} alt="" />
				</td>
			);
	}

	/* ============================================================================================================ */	
	setFilter(e) {
		var searchFilter = e.target.value;
		var filteredTasks = this.getFilteredTasks(this.state.allTasks, searchFilter);
		this.setState({ searchFilter, filteredTasks });
	}

	/* ============================================================================================================ */	
	render() {
		var this_state = this.state;
		
		function allOrFiltered() {
			return (this_state.searchFilter === "") ? "All tasks:" : "Filtered tasks:";
		}

		var tasksTable = [];

		var filteredTasks = this.state.filteredTasks;
		// var tasks = filteredTasks;
		if (filteredTasks.length) {
			for (let i=0; i<filteredTasks.length; i++) {
				tasksTable.push(
							<tr key={"tablerow"+i}>
								{this.getTaskTime(i)}
								{this.getTaskDate(i)}
								<td>
									{this.getTaskDescription(i)}
									<table className="AllTasks__table__sub-table">
										<tbody>
											<tr>
												<td>{filteredTasks[i].user.name}</td>
												<td>{filteredTasks[i].user.phone}</td>
												<td>{filteredTasks[i].user.email}</td>
											</tr>
										</tbody>
									</table>
								</td>
								{this.getSmallIcons(i)}
							</tr>
				)
			}
		}
		else tasksTable.push(<tr key={"not_found"}><td>Sorry, no results found for «{this.state.searchFilter}»</td></tr>);

		return (
			
			<div className="AllTasks">

				<div className="AllTasks__header">
					<h2 className="h2">{allOrFiltered()} {this.getOverdueTasks()}</h2>
					<div className="AllTasks__search-box">
						<input onChange={(e) => this.setFilter(e)} value={this.state.searchFilter} className="AllTasks__search-box__input" type="input" placeholder="Search"/>
					</div>
				</div>
				
				<table className="AllTasks__table">
					<tbody>
						{ tasksTable }																				
					</tbody>
				</table>

			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ action__updateUserToEdit, action__deleteTaskFromDB, action_updateOneTaskDB, action_showModal, action__clearModalState }, dispatch);
}

function mapStateToProps(data) {
	return { 
		users : data.users,
		userToEdit: data.userToEdit,
		modal: data.modal
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllTasks));