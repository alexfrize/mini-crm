import { REDIRECT_TO, REDIRECT_CLEAR } from '../constants/redirect';

export const action__redirectTo = function(url) {
	return {
		type : REDIRECT_TO,
		redirectTo : url
	}
}

export const action__clearRedirectTo = function() {
	return {
		type : REDIRECT_CLEAR,
		redirectTo : undefined
	}
}