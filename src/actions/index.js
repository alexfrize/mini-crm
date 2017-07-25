import {
		LOADED_FROM_DB,
		DELETE_TASK_FROM_DB,
		UPDATE_USER_TO_EDIT,
		UPDATE_TASKS_FOR_ONE_USER_DB,
		UPDATE_ONE_TASK_IN_TASK_LIST,
		CREATE_NEW_USER_DB
	} from '../constants';

export const action__loadedDataFromDB = function(users) {
	return {
		type: LOADED_FROM_DB,
		users
	}	
}

export const action__deleteTaskFromDB = function(taskToDelete) {
	return {
		type: DELETE_TASK_FROM_DB,
		taskToDelete
	}	
}

export const action_updateTasksForOneUserDB = function(userToEdit) {
	return {
		type: UPDATE_TASKS_FOR_ONE_USER_DB,
		userToEdit
	}
}

export const action__updateUserToEdit = function(userToEdit) {
	return {
		type: UPDATE_USER_TO_EDIT,
		userToEdit
	}	
}

export const action_updateOneTaskDB = function(taskToUpdate) {
	return {
		type: UPDATE_ONE_TASK_IN_TASK_LIST,
		taskToUpdate
	}
}

export const action_createNewUserDB = function(newUserProfile) {
	return {
		type: CREATE_NEW_USER_DB ,
		newUserProfile
	}
}