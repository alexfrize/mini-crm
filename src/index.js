import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App.component.jsx';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

function mainReducer(state = [], action) {
	switch (action.type) {
		case 'UPDATE_TASK_DB' : console.log("UPDATE_TASK_DB");
								break;
		case 'DELETE_TASK_DB' : console.log("DELETE_TASK_DB");
								break;
		default: return state;
	}
}

const store = createStore(mainReducer);

var render = () => ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		 document.getElementById('root')
		);
store.subscribe(render);
render();
store.dispatch({ type : 'UPDATE_TASK_DB'});
registerServiceWorker();

