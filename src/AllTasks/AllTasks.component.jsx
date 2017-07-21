import React, { Component } from 'react';
import './AllTasks.component.css';
import allTasks__done from './img/all-tasks__done.svg';
import allTasks__edit from './img/all-tasks__edit.svg';
import allTasks__profile from './img/all-tasks__profile.svg';
import allTasks__cancel from './img/all-tasks__cancel.svg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { action__deleteTaskFromDB } from '../actions';

import moment from 'moment';


import DatePicker from 'react-datepicker';
import './../datepicker/datepicker.css';

class AllTasks extends Component {
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
			}
		};
		this.editTask = this.editTask.bind(this);
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
			tasks : this.getTasksArray(newProps)
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
	isOverdue(taskNum) {
		var timeNow = moment();
		let taskDate = moment(this.state.tasks[taskNum].task.date + " " + this.state.tasks[taskNum].task.time, 'MM/DD/YYYY hh:mm');
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
		let overdueTasks=0;
		for (let i=0; i < this.state.tasks.length; i++) {
			if (this.isOverdue(i)) overdueTasks++;
		}

		return (overdueTasks !== 0) ?
			(
				<span>{this.state.tasks.length}
					&nbsp;&nbsp;&nbsp;
					<span className="AllTasks__header__overdue-tasks">
						Overdue tasks: {overdueTasks}
					</span>
				</span>
			) :
			(
				<span>
					{this.state.tasks.length}
				</span>
			)
	}

	/* ============================================================================================================ */	
	editTask(taskNum, event) {
		let isEditMode;
		if (taskNum !== this.state.editTask.taskNum) isEditMode = true;
		else isEditMode = !this.state.isEditMode;

		let editTask = {
			taskNum: taskNum,
			task_id: this.state.tasks[taskNum].task.task_id,
			time: this.state.tasks[taskNum].task.time,
			date: moment(this.state.tasks[taskNum].task.date, 'MM/DD/YYYY'),
			description: this.state.tasks[taskNum].task.description,
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
		return (this.state.isEditMode && this.state.editTask.taskNum === taskNum) ? 
			(<td>
				{this.render__getTaskTime__timeValues()}
			</td>) :
			<td className={this.isOverdueClassName(taskNum)}><div className="AllTasks__table__view-mode__input">{this.state.tasks[taskNum].task.time}</div></td>
	
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
			<textarea className="AllTasks__table__edit-mode__textarea" value={this.state.editTask.description} onChange={this.getTaskDescription__handleChange}></textarea> 
		) :
			<div className="AllTasks__table__view-mode__textarea">{this.state.tasks[taskNum].task.description}</div>;
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
		// let task_id_toDelete = this.state.tasks[taskNumToMarkAsDone].task.task_id;
		// var taskToDelete = JSON.stringify(this.state.tasks[taskNumToMarkAsDone].task);
		var taskToDelete = JSON.stringify({task_id : this.state.tasks[taskNumToMarkAsDone].task.task_id});
		tasks.splice(taskNumToMarkAsDone,1);
		console.log("taskToDelete === ", taskToDelete);
		// console.log("----------------", task_id_toDelete);
		/*
			******************************

			IMPORTANT!
			Dont' forget to modify users array and save it to DB!

			******************************
		*/
		


		this.props.action__deleteTaskFromDB(taskToDelete);

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
		// console.log("confirmIfTaskIsDone");
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
		// console.log("dataToUpdate === ", dataToUpdate);


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
	getSmallIcons(taskNum) {
		return (this.state.isEditMode && this.state.editTask.taskNum === taskNum) ? 
			(
				<td>
					<img onClick={this.showModal.bind(this, "MODAL::SaveChanges")} className="AllTasks__table__img" src={allTasks__done} alt="" />
					<img onClick={this.cancelTask} className="AllTasks__table__img" src={allTasks__cancel} alt="" />
				</td>
			) :
			(
				<td>
					<img onClick={this.editTask.bind(this,taskNum)} className="AllTasks__table__img" src={allTasks__edit} alt="" />
					<img className="AllTasks__table__img" src={allTasks__profile} alt="" />
					<img onClick={this.confirmIfTaskIsDone.bind(this, taskNum)} className="AllTasks__table__img" src={allTasks__done} alt="" />
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
		// console.log(tasks_untouched);
		let searchFilter = event.target.value;
		var tasks = tasks_untouched.filter(element => {
			return (element.task.description.toUpperCase().search(searchFilter.toUpperCase()) !== -1);
	 	});

		// console.log(searchFilter);
		// console.log("tasks==",tasks);

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
			if (this_state.tasks_untouched.length === 0) return "All tasks:";
			return (this_state.tasks.length === this_state.tasks_untouched.length) ? "All tasks:" : "Filtered tasks:";
		}
		var tasksTable = [];
		for (let i=0; i<this.state.tasks.length; i++) {
			tasksTable.push(
						<tr key={"tablerow"+i}>
							{this.getTaskTime(i)}
							{this.getTaskDate(i)}
							<td>
								{this.getTaskDescription(i)}
								<table className="AllTasks__table__sub-table">
									<tbody>
										<tr>
											<td>{this.state.tasks[i].user.name}</td>
											<td>{this.state.tasks[i].user.phone}</td>
											<td>{this.state.tasks[i].user.email}</td>
										</tr>
									</tbody>
								</table>
							</td>
							{this.getSmallIcons(i)}
						</tr>
			)
		}

		return (
			
			<div className="AllTasks">

				{this.initModal()}

				<div className="AllTasks__header">
					<h2 className="h2">{allOrFiltered()} {this.getOverdueTasks()}</h2>
					<div className="AllTasks__search-box">
						<input onChange={this.filterTasks.bind(this)} value={this.state.searchFilter}className="AllTasks__search-box__input" type="input" placeholder="Search"/>
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
	return bindActionCreators({ action__deleteTaskFromDB }, dispatch);
}

function mapStateToProps(data) {
	return { 
		users : data.users,
		userToEdit: data.userToEdit
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AllTasks);