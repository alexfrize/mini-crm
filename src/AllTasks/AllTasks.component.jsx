import React, { Component } from 'react';
import './AllTasks.component.css';
import allTasks__done from './img/all-tasks__done.svg';
import allTasks__edit from './img/all-tasks__edit.svg';
import allTasks__profile from './img/all-tasks__profile.svg';
import moment from 'moment';

export default class AllTasks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users : [],
			tasks: [],
			isEditMode : false,
			editTask : null
		};
		this.editTask = this.editTask.bind(this);
		
	}

	/* ============================================================================================================ */	
	componentWillMount() {
		this.setState({tasks: this.getTasksArray()});
	}

	/* ============================================================================================================ */	
	getTasksArray() {
		var alltasks = [];
		var taskObject = {};
		for (let userNum=0; userNum < this.props.users.length; userNum++ ) {
			for (let taskNum=0; taskNum < this.props.users[userNum].tasks.length; taskNum++) {
				if (this.props.users[userNum].tasks[taskNum].description !== "") {
					taskObject = {
						task : this.props.users[userNum].tasks[taskNum],
						user: this.props.users[userNum].profile
					};
					alltasks.push(taskObject);
				}
				else console.log(`User "${this.props.users[userNum].profile.name}" has an empty task!`)
			}
		}		
		console.log("alltasks===",alltasks);

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
	componentDidMount() {
		console.log("this.state.tasks===",this.state.tasks);
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
		
		console.log("overdueTasks",overdueTasks);
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
		console.log(this.state.tasks[taskNum]);
		this.setState({
			isEditMode : !this.state.isEditMode,
			editTask : taskNum
		});
		
	}

	/* ============================================================================================================ */	
	getUserName(taskNum) {
		return (this.state.isEditMode && this.state.editTask === taskNum) ? 
			<td><input className="AllTasks__table__editmode__input" value={this.state.tasks[taskNum].user.name} /></td> :
			<td>{this.state.tasks[taskNum].user.name}</td>
			
	}
	/* ============================================================================================================ */	
	render() {
		var tasksTable = [];
		for (let i=0; i<this.state.tasks.length; i++) {
			tasksTable.push(
						<tr key={"tablerow"+i}>
							<td className={this.isOverdueClassName(i)}>{this.state.tasks[i].task.time}</td>
							<td className={this.isOverdueClassName(i)}>
								{this.state.tasks[i].task.date}
								<p className={this.isOverdueClassName__smallWarning(i)}>
									{this.isOverdueText(i)}
								</p>
							</td>
							<td>{this.state.tasks[i].task.description}
								<table className="AllTasks__table__sub-table">
									<tbody>
										<tr>
											{this.getUserName(i)}
											<td>{this.state.tasks[i].user.phone}</td>
											<td>{this.state.tasks[i].user.email}</td>
										</tr>
									</tbody>
								</table>
							</td>
							<td>
								<img onClick={this.editTask.bind(this,i)} className="AllTasks__table__img" src={allTasks__edit} alt="" />
								<img className="AllTasks__table__img" src={allTasks__profile} alt="" />
								<img className="AllTasks__table__img" src={allTasks__done} alt="" />
							</td>
						</tr>
			)
		}

		return (
			<div className="AllTasks">
				<div className="AllTasks__header">
					<h2 className="h2">All tasks: {this.getOverdueTasks()}</h2>
					<div className="AllTasks__search-box">
						<input className="AllTasks__search-box__input" type="input" placeholder="Search"/>
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