import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import './../datepicker/datepicker.css';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { action_updateTasksForOneUserDB } from '../actions';
import './UserProfileTasks.component.css';
import { connect } from 'react-redux';

// Uses for creating local objects, whitch have _date__Moment parameter inside
const _PUBLIC = 'public',
	  _LOCAL = 'local';


class UserProfileTasks extends Component {
	constructor(props) {
		super(props);
		
		this.state = { 
			userToEdit : {
				tasks : this.generateEmptyTask(_PUBLIC)
			},
			userToEdit_local : {
				tasks : this.generateEmptyTask(_LOCAL)
			},
			users : []
		 }; 

		this.handleDateChange = this.handleDateChange.bind(this);
		this.addNewTask = this.addNewTask.bind(this);
		this.saveTasks = this.saveTasks.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleTimeChange = this.handleTimeChange.bind(this);
	}
	

	generateEmptyTask(isLocal) {
		var emptyTask = {
				task_id : this.generateTaskID(),
				date: moment().format('MM/DD/YYYY'),
				time: "12:00 AM",
				description: ""
			}
		if (isLocal === _LOCAL)	emptyTask._date__Moment = moment();
		return emptyTask;
	}
	/* ============================================================================================================ */
	componentWillReceiveProps(nextProps) {
		// console.log("UUUUU :: nextProps", nextProps);
		console.warn("Got new props: ", nextProps.userToEdit);
		var userToEdit_local = JSON.parse(JSON.stringify(nextProps.userToEdit));
		setTimeout(()=> {
			userToEdit_local = JSON.parse(JSON.stringify(nextProps.userToEdit));
			console.warn("Got new props:: userToEdit_local ", userToEdit_local);
		},100);

		if (!userToEdit_local.tasks) userToEdit_local.tasks = [];
		// console.log("UU::userToEdit_local.tasks ===", userToEdit_local.tasks);

		if (userToEdit_local.tasks.length) {
			userToEdit_local.tasks.map(task => task._date__Moment = moment(task.date, 'MM/DD/YYYY'));
		}
		else {
			userToEdit_local.tasks = [this.generateEmptyTask(_LOCAL)];
			// console.log("generated new tasks array: ", userToEdit_local.tasks);
		}

		var users = nextProps.users;
		this.setState({ userToEdit_local, users });

	}

	/* ============================================================================================================ */
	handleDateChange(taskItemNum, newDate) {
		var { userToEdit_local } = this.state;
		userToEdit_local.tasks[taskItemNum]._date__Moment = newDate;
		userToEdit_local.tasks[taskItemNum].date = newDate.format('MM/DD/YYYY');
		this.setState({
			userToEdit_local
		});
	}

	/* ============================================================================================================ */
	handleDescriptionChange(taskItemNum, event) {
		var { userToEdit_local } = this.state;
		userToEdit_local.tasks[taskItemNum].description = event.target.value;
		this.setState({ userToEdit_local });
	}

	/* ============================================================================================================ */
	handleTimeChange(taskItemNum, event) {
		var { userToEdit_local } = this.state;
		userToEdit_local.tasks[taskItemNum].time = event.target.value;
		this.setState({
			userToEdit_local
		});
		console.log("this.state.userToEdit_local.tasks[taskItemNum].time ===", this.state.userToEdit_local.tasks[taskItemNum].time);
	}

	/* ============================================================================================================ */
	render_UserProfile__tasks__select(taskItemNum) {
		// console.log("render_UserProfile__tasks__select, this.state.userToEdit_local.tasks[taskItemNum].time", this.state.userToEdit_local.tasks[taskItemNum].time);
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
			<select value={this.state.userToEdit_local.tasks[taskItemNum].time} onChange={this.handleTimeChange.bind(this,taskItemNum)} className="UserProfile__tasks__task__input">
				{options}
			</select>
		);
	}

	/* ============================================================================================================ */
	renderTaskItems() {
		var taskItems = [];
		var totalTasks = this.state.userToEdit_local.tasks.length;
		for (let i=0; i<totalTasks; i++) {
			taskItems.push(
				<div key={"taskItem"+i} className="UserProfile__tasks__task">
					<div className="UserProfile__tasks__task__input-group">
						<DatePicker className="UserProfile__tasks__task__input"
						    selected={this.state.userToEdit_local.tasks[i]._date__Moment}
						    onChange={this.handleDateChange.bind(this,i)}
						/>
						{this.render_UserProfile__tasks__select(i)}
					</div>
					<textarea onChange={this.handleDescriptionChange.bind(this,i)} value={this.state.userToEdit_local.tasks[i].description} className="UserProfile__tasks__task__task-description" placeholder="Task description:" />
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
		var { userToEdit_local } = this.state;
		userToEdit_local.tasks.push(this.generateEmptyTask(_LOCAL));
		this.setState ({ userToEdit_local });
	}

	/* ============================================================================================================ */
	saveTasks() {
		var userToEdit = JSON.parse(JSON.stringify(this.state.userToEdit_local));
		console.warn("JSON.parse(JSON.stringify(this.state.userToEdit_local)) === userToEdit === ", userToEdit);
		if (userToEdit.tasks) {
			if (userToEdit.tasks.length) {
				for (let i=0; i<userToEdit.tasks.length; i++) {
					userToEdit.tasks[i].date = moment(this.state.userToEdit_local.tasks[i]._date__Moment, 'MM/DD/YYYY').format("MM/DD/YYYY");
					delete userToEdit.tasks[i]._date__Moment;
				}
			}
			// We use only tasks with description
			userToEdit.tasks = userToEdit.tasks.filter(task => task.description !== "");
			console.log("==== userToEdit.tasks ==== ",userToEdit.tasks);

		}
		if (userToEdit.tasks.length) this.setState( { userToEdit });

		// console.log("userToEdit._id",userToEdit._id);

		// Check if user has a name or not
		var users = this.state.users;
		console.warn("userToEdit._id =====", userToEdit._id);
		if (userToEdit._id) {

			for (let user of users) {
				if (user._id === userToEdit._id) {
					user.tasks = userToEdit.tasks.slice(); 
				}

			}
			this.setState({ users });
			this.props.action_updateTasksForOneUserDB(userToEdit);

		}
		else alert("You can't save tasks for undefined user. Please, input user name");
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
	var { userToEdit } = data,
		{ users } = data;

	return {
		users,
		userToEdit
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators( { action_updateTasksForOneUserDB }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileTasks);