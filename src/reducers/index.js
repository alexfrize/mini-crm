import { LOADED_FROM_DB, DELETE_TASK_FROM_DB, UPDATE_USER_TO_EDIT, UPDATE_TASKS_FOR_ONE_USER_DB } from '../constants';

function deleteFromDB(taskToDelete) {
	var _url = "/api/deletetask";
	fetch(_url, {
		method : "DELETE",
		headers: {
			"Content-Type" : "application/json"
		},
		body: taskToDelete
	});
}

function updateTasksForOneUserDB(userToEdit) {
	var _url = "/api/updatealltasksforoneuser";
	fetch(_url, {
		method : "PUT",
		headers: {
			"Content-Type" : "application/json"
		},
		body: JSON.stringify(userToEdit)
	});
	console.log("OBJ:",userToEdit);
	console.log("updating tasks...");
}


export function mainReducer(state = {users : [], userToEdit: {} }, action) {
	switch (action.type) {
		case UPDATE_USER_TO_EDIT : console.log("UPDATE_USER_TO_EDIT");
								return Object.assign({}, { users: state.users , userToEdit: action.userToEdit });

		case DELETE_TASK_FROM_DB : console.log("DELETE_TASK_FROM_DB", action.taskToDelete);
								deleteFromDB(action.taskToDelete);
								return Object.assign({}, { users: action.users,  userToEdit: state.userToEdit });

		case UPDATE_TASKS_FOR_ONE_USER_DB : console.log("UPDATE_TASKS_FOR_ONE_USER_DB", action.userToEdit);
								updateTasksForOneUserDB(action.userToEdit);
								return Object.assign({}, { users: state.users,  userToEdit: action.userToEdit });
								

		case LOADED_FROM_DB : console.log("LOADED_FROM_DB");
								return Object.assign({}, { users: action.users,  userToEdit: state.userToEdit });
		default: return state;
	}
}