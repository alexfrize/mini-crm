import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import './../datepicker/datepicker.css';
import moment from 'moment';

import './UserProfileTasks.component.css';

export default class UserProfileTasks extends Component {
	constructor(props) {
		super(props);
		var dateArr = [moment()];
		var timeArr = ["12:00 AM"];
		var taskDescriptionArr = [""];
		this.state = {
			taskStartDate: dateArr,
			taskStartTime: timeArr,
			taskDescription: taskDescriptionArr
		}; 
		this.handleDateChange = this.handleDateChange.bind(this);
		this.addNewTask = this.addNewTask.bind(this);
		this.saveTasks = this.saveTasks.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleTimeChange = this.handleTimeChange.bind(this);
		console.log("dateArr==",dateArr);
	}
	
	/* ============================================================================================================ */
	handleDateChange(taskItemNum, date) {
		var dateArr = this.state.taskStartDate;
		dateArr[taskItemNum] = date;
		this.setState({
			taskStartDate: dateArr
		});
	}

	/* ============================================================================================================ */
	handleDescriptionChange(taskItemNum, event) {
		var taskDescriptionArr = this.state.taskDescription;
		taskDescriptionArr[taskItemNum] = event.target.value;
		this.setState({taskDescription : taskDescriptionArr});
	}

	/* ============================================================================================================ */
	handleTimeChange(taskItemNum, event) {
		var timeArr = this.state.taskStartTime;
		timeArr[taskItemNum] = event.target.value;
		this.setState({
			taskStartTime: timeArr
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
		var totalTasks = this.state.taskStartDate.length;
		for (let i=0; i<totalTasks; i++) {
			taskItems.push(
				<div key={"taskItem"+i} className="UserProfile__tasks__task">
					<div className="UserProfile__tasks__task__input-group">
						<DatePicker className="UserProfile__tasks__task__input"
						    selected={this.state.taskStartDate[i]}
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
	addNewTask() {
		var dateArr = this.state.taskStartDate;
		dateArr.push(moment());
		var timeArr = this.state.taskStartTime;
		timeArr.push("12:00 AM");
		var taskDescriptionArr = this.state.taskDescription;
		taskDescriptionArr.push("");
		this.setState ({
			taskStartDate: dateArr,
			taskStartTime: timeArr,
			taskDescription: taskDescriptionArr
		});				
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