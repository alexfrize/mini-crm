import {
		LOADED_FROM_DB,
		DELETE_TASK_FROM_DB,
		UPDATE_USER_TO_EDIT,
		UPDATE_TASKS_FOR_ONE_USER_DB,
		UPDATE_ONE_TASK_IN_TASK_LIST,
		CREATE_NEW_USER_DB_FULFILLED,
		UPDATE_USER_PROFILE_DB
	} from '../constants';
import { MODAL_SHOW, MODAL_HIDE } from '../constants/modal';
import { deleteFromDB, updateTasksForOneUserDB, updateOneTaskDB, updateUserProfileDB } from './db';

// ===============================================================================================
export const mainReducer = function(state = {users : [], userToEdit: {} , modal: { type : "", text: "" } }, action) {
	switch (action.type) {
		case LOADED_FROM_DB :
								return Object.assign({}, { users: action.users,  userToEdit: state.userToEdit, modal: state.modal });

		case UPDATE_USER_TO_EDIT :
								return Object.assign({}, { users: state.users, userToEdit: action.userToEdit, modal: state.modal });

		case DELETE_TASK_FROM_DB :
								deleteFromDB(action.taskToDelete);
								return Object.assign({}, { users: state.users,  userToEdit: state.userToEdit, modal: state.modal });

		case UPDATE_TASKS_FOR_ONE_USER_DB : 
								updateTasksForOneUserDB(action.userToEdit);
								return Object.assign({}, { users: state.users,  userToEdit: action.userToEdit, modal: state.modal });

		case UPDATE_ONE_TASK_IN_TASK_LIST :
								updateOneTaskDB(action.taskToUpdate);				
								return Object.assign({}, { users: state.users,  userToEdit: state.userToEdit, modal: state.modal });

		case CREATE_NEW_USER_DB_FULFILLED :
								return Object.assign({}, { users: [...state.users, action.payload],  userToEdit: action.payload, modal: state.modal });

		case UPDATE_USER_PROFILE_DB :
								updateUserProfileDB(action.userToEdit);
								return Object.assign({}, { users: action.users , userToEdit: action.userToEdit, modal: state.modal });
		
		// ================== MODAL ACTIONS ==================
		case MODAL_SHOW :

								return Object.assign({}, { users: state.users , userToEdit: state.userToEdit, modal: action.modal });
		case MODAL_HIDE :
								let modalObj = {
									type : "MODAL::Hide",
									text : ""
								}
								return Object.assign({}, { users: state.users , userToEdit: state.userToEdit, modal: modalObj });		

		default: return Object.assign({}, { users: state.users,  userToEdit: state.userToEdit, modal: state.modal });
	}
}