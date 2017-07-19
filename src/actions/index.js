import { LOADED_FROM_DB, DELETE_TASK_FROM_DB, UPDATE_USER_TO_EDIT} from '../constants';

export const action__loadedDataFromDB = function(users) {
	console.log("loadedDataFromDB(users)::users === ",  users);
	return {
		type: LOADED_FROM_DB,
		users
	}	
}

export const action__deleteTaskFromDB = function(taskToDelete) {
	console.log("action__deleteTaskFromDB(taskToDelete)", taskToDelete);
	return {
		type: DELETE_TASK_FROM_DB,
		taskToDelete
	}	
}

export const action__updateUserToEdit = function(userToEdit) {
	console.log("action__updateUserToEdit(userToEdit)", userToEdit);
	return {
		type: UPDATE_USER_TO_EDIT,
		userToEdit
	}	
}