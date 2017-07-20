import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import './../datepicker/datepicker.css';
import moment from 'moment';

import './UserProfileTasks.component.css';
import { connect } from 'react-redux';


class UserProfileTasks extends Component {
	constructor(props) {
		super(props);
		var tasks = [this.generateEmptyTask()];
		
		this.state = { userToEdit : {
			tasks
		} }; 

		this.handleDateChange = this.handleDateChange.bind(this);
		this.addNewTask = this.addNewTask.bind(this);
		this.saveTasks = this.saveTasks.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleTimeChange = this.handleTimeChange.bind(this);
	}
	

	generateEmptyTask() {
		return {
					task_id : this.generateTaskID(),
					_date__Moment: moment(),
					date: moment().format('MM/DD/YYYY'),
					time: "12:00 AM",
					description: ""
				}
	}
	/* ============================================================================================================ */
	componentWillReceiveProps(nextProps) {
		console.log("UUUUU :: nextProps", nextProps);
		var { userToEdit } = nextProps;
		if (!userToEdit.tasks) userToEdit.tasks = [];
		console.log("UU::userToEdit.tasks ===", userToEdit.tasks);

		if (userToEdit.tasks.length) {
			console.log("FROM PROPS::tasks", userToEdit.tasks);
			userToEdit.tasks.map(task => task._date__Moment = moment(task.date, 'MM/DD/YYYY'));
		}
		else userToEdit.tasks = [this.generateEmptyTask()];

		this.setState({ userToEdit });

	}

	/* ============================================================================================================ */
	handleDateChange(taskItemNum, date) {
		var { userToEdit } = this.state;
		userToEdit.tasks[taskItemNum].date = date;
		this.setState({
			userToEdit
		});
	}

	/* ============================================================================================================ */
	handleDescriptionChange(taskItemNum, event) {
		var { userToEdit } = this.state;
		userToEdit.tasks[taskItemNum].description = event.target.value;
		this.setState({ userToEdit });
	}

	/* ============================================================================================================ */
	handleTimeChange(taskItemNum, event) {
		var { userToEdit } = this.state;
		userToEdit.tasks[taskItemNum].time = event.target.value;
		this.setState({
			userToEdit
		});
	}

	/* ============================================================================================================ */
	render_UserProfile__tasks__select(taskItemNum) {
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
			<select onChange={this.handleTimeChange.bind(this,taskItemNum)} className="UserProfile__tasks__task__input">
				{options}
			</select>
		);
	}

	/* ============================================================================================================ */
	renderTaskItems() {
		var taskItems = [];
		var totalTasks = this.state.userToEdit.tasks.length;
		for (let i=0; i<totalTasks; i++) {
			taskItems.push(
				<div key={"taskItem"+i} className="UserProfile__tasks__task">
					<div className="UserProfile__tasks__task__input-group">
						<DatePicker className="UserProfile__tasks__task__input"
						    selected={this.state.userToEdit.tasks[i]._date__Moment}
						    onChange={this.handleDateChange.bind(this,i)}
						/>
						{this.render_UserProfile__tasks__select(i)}
					</div>
					<textarea onChange={this.handleDescriptionChange.bind(this,i)} value={this.state.userToEdit.tasks[i].description} className="UserProfile__tasks__task__task-description" placeholder="Task description:" />
				</div>
			);
		}
		return (
			<div>
				{taskItems}
			</div>
			);
	}

	/* ============================================================================================================ */
	generateTaskID() {
		var task_id = "";
		for (let i=0; i < 4; i++) {
			task_id += String.fromCharCode(Math.floor(Math.random()*26)+65);
			task_id += String.fromCharCode(Math.floor(Math.random()*26)+97);
			task_id += String.fromCharCode(Math.floor(Math.random()*10)+48);
		}
		// console.log("New task_id === " , task_id); 
		return task_id;
	}

	/* ============================================================================================================ */
	addNewTask() {
		var { userToEdit }= this.state;
		userToEdit.tasks.push(this.generateEmptyTask());
		this.setState ({ userToEdit });
	}

	/* ============================================================================================================ */
	saveTasks() {
		console.log(this.state);
	}

	/* ============================================================================================================ */
	render() {
		console.log("UserProfileTasks::this.state.users === ", this.state.users);
		return (
				<div className="UserProfile__tasks">
					<h2 className="h2">Tasks:</h2>
						{this.renderTaskItems()}
						<div className="UserProfile__tasks__form__button-container">
							<button onClick={this.addNewTask} className="UserProfile__tasks__form__button">Add task</button>
						</div>
						<div className="UserProfile__tasks__form__button-container">
							<button onClick={this.saveTasks} className="UserProfile__tasks__form__button">Save</button>
						</div>						
				</div>
		);
	}
}

function mapStateToProps(data) {
	var userToEdit = data.userToEdit;
	if (userToEdit.tasks) {
		if (userToEdit.tasks.length) userToEdit.tasks.map(task => task.date = moment(task.date, 'MM/DD/YYYY').format("MM/DD/YYYY"));
	}
	return {
		users: data.users,
		userToEdit
	}
}

export default connect(mapStateToProps, null)(UserProfileTasks);