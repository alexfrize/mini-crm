import {
		LOADED_FROM_DB,
		DELETE_TASK_FROM_DB,
		UPDATE_USER_TO_EDIT,
		UPDATE_TASKS_FOR_ONE_USER_DB,
		UPDATE_ONE_TASK_IN_TASK_LIST,
		CREATE_NEW_USER_DB_FULFILLED,
		UPDATE_USER_PROFILE_DB
	} from '../constants';

// ===============================================================================================
function deleteFromDB(taskToDelete) {
	var _url = "/api/deletetask";
	fetch(_url, {
		method : "DELETE",
		headers: {
			"Content-Type" : "application/json"
		},
		body: taskToDelete
	})
	.catch(err => {
		console.error(err);
	});
}

// ===============================================================================================
function updateTasksForOneUserDB(userToEdit) {
	var _url = "/api/updatealltasksforoneuser";
	fetch(_url, {
		method : "PUT",
		headers: {
			"Content-Type" : "application/json"
		},
		body: JSON.stringify(userToEdit)
	})
	.catch(err => {
		console.error(err);
	});
}

// ===============================================================================================
function updateOneTaskDB(taskToUpdate) {
	var _url="/api/updatetask";
	var dataToUpdate = JSON.stringify(taskToUpdate);
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
}

// ===============================================================================================
function updateUserProfileDB(userToUpdate) {
	var _url="/api/updateuserprofile";
	var dataToUpdate = JSON.stringify(userToUpdate);
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
}

// ===============================================================================================
export function mainReducer(state = {users : [], userToEdit: {} }, action) {
	switch (action.type) {
		case LOADED_FROM_DB :
								return Object.assign({}, { users: action.users,  userToEdit: state.userToEdit });

		case UPDATE_USER_TO_EDIT :
								return Object.assign({}, { users: state.users , userToEdit: action.userToEdit });

		case DELETE_TASK_FROM_DB :
								deleteFromDB(action.taskToDelete);
								return Object.assign({}, { users: state.users,  userToEdit: state.userToEdit });

		case UPDATE_TASKS_FOR_ONE_USER_DB : 
								updateTasksForOneUserDB(action.userToEdit);
								console.log("UPDATE_TASKS_FOR_ONE_USER_DB",action.userToEdit);
								return Object.assign({}, { users: state.users,  userToEdit: action.userToEdit });

		case UPDATE_ONE_TASK_IN_TASK_LIST :
								updateOneTaskDB(action.taskToUpdate);				
								return Object.assign({}, { users: state.users,  userToEdit: state.userToEdit });

		case CREATE_NEW_USER_DB_FULFILLED :
								return Object.assign({}, { users: [...state.users, action.payload],  userToEdit: action.payload });

		case UPDATE_USER_PROFILE_DB :
								console.log("UPDATE_USER_PROFILE_DB::action.userToEdit",action.userToEdit);
								updateUserProfileDB(action.userToEdit);
								return Object.assign({}, { users: action.users , userToEdit: action.userToEdit });

		default: return Object.assign({}, { users: state.users,  userToEdit: state.userToEdit });
	}
}