import { MODAL_SHOW, MODAL_HIDE, MODAL_CLEAR } from '../constants/modal';


/* 
	(modal) parameter is a modal object with all nessasary properties
 */
export function action_showModal(modal) {
	console.log("action_showModal(modal)");
	return {
		type : MODAL_SHOW,
		modal
	}
}

export function action_hideModal(modal) {
	console.log("action_hideModal(modal)");
	return {
		type : MODAL_HIDE,
		modal
	}
}

export function action__clearModalState() {
	return {
		type : MODAL_CLEAR
	}
}