import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import './../datepicker/datepicker.css';
import moment from 'moment';

import './UserProfileTasks.component.css';
import { connect } from 'react-redux';


class UserProfileTasks extends Component {
	constructor(props) {
		super(props);
		var timeArr = ["12:00 AM"];
		var taskDescriptionArr = [""];
		var tasks = [{
					task_id : this.generateTaskID(),
					date: moment(),
					time: "12:00 AM",
					description: ""
				}];
		
		this.state = { tasks }; 

		this.handleDateChange = this.handleDateChange.bind(this);
		this.addNewTask = this.addNewTask.bind(this);
		this.saveTasks = this.saveTasks.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleTimeChange = this.handleTimeChange.bind(this);
	}
	
	/* ============================================================================================================ */
	componentWillReceiveProps(nextProps) {
		console.log("UUUUU :: nextProps", nextProps);

	}

	/* ============================================================================================================ */
	handleDateChange(taskItemNum, date) {
		var { tasks } = this.state;
		tasks[taskItemNum].date = date;
		this.setState({
			tasks
		});
	}

	/* ============================================================================================================ */
	handleDescriptionChange(taskItemNum, event) {
		var { tasks } = this.state;
		tasks[taskItemNum].description = event.target.value;
		this.setState({ tasks });
	}

	/* ============================================================================================================ */
	handleTimeChange(taskItemNum, event) {
		var { tasks } = this.state;
		tasks[taskItemNum].time = event.target.value;
		this.setState({
			tasks
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
		var totalTasks = this.state.tasks.length;
		for (let i=0; i<totalTasks; i++) {
			taskItems.push(
				<div key={"taskItem"+i} className="UserProfile__tasks__task">
					<div className="UserProfile__tasks__task__input-group">
						<DatePicker className="UserProfile__tasks__task__input"
						    selected={this.state.tasks[i].date}
						    onChange={this.handleDateChange.bind(this,i)}
						/>
						{this.render_UserProfile__tasks__select(i)}
					</div>
					<textarea onChange={this.handleDescriptionChange.bind(this,i)} className="UserProfile__tasks__task__task-description" placeholder="Task description:" />
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
		for (let i=0; i < 8; i++) {
			task_id += String.fromCharCode(Math.floor(Math.random()*26)+65);
			task_id += String.fromCharCode(Math.floor(Math.random()*26)+97);
			task_id += String.fromCharCode(Math.floor(Math.random()*10)+48);
		}
		console.log("New task_id === " , task_id); 
		return task_id;
	}

	/* ============================================================================================================ */
	addNewTask() {
		var { tasks }= this.state;
		tasks.push({
			task_id : this.generateTaskID(),
			date: moment(),
			time: "12:00 AM",
			description: ""
		});
		this.setState ({ tasks });
	}

	/* ============================================================================================================ */
	saveTasks() {
		console.log(this.state);
	}

	/* ============================================================================================================ */
	render() {
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
	return {
		users : data.users,
		userToEdit : data.userToEdit
	}
}

export default connect(mapStateToProps, null)(UserProfileTasks);