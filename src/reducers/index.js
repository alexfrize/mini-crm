import { LOADED_FROM_DB, DELETE_TASK_FROM_DB, UPDATE_USER_TO_EDIT } from '../constants';

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

export function mainReducer(state = {users : [], userToEdit: {} }, action) {
	switch (action.type) {
		case UPDATE_USER_TO_EDIT : console.log("UPDATE_USER_TO_EDIT");
								return Object.assign({}, { users: state.users , userToEdit: action.userToEdit });

		case DELETE_TASK_FROM_DB : console.log("DELETE_TASK_FROM_DB", action.taskToDelete);
								deleteFromDB(action.taskToDelete);
								return Object.assign({}, { users: action.users,  userToEdit: state.userToEdit });

		case LOADED_FROM_DB : console.log("LOADED_FROM_DB");
								return Object.assign({}, { users: action.users,  userToEdit: state.userToEdit });
		default: return state;
	}
}