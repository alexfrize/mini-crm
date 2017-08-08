import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './App.component.jsx';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { mainReducer } from './reducers';
import promise from 'redux-promise-middleware';
import { BrowserRouter } from 'react-router-dom';

const store = createStore( mainReducer , applyMiddleware(promise()));

var render = () => ReactDOM.render(
		<Provider store={store}>
			<BrowserRouter>
			  <App />
			</BrowserRouter>
		</Provider>,
		 document.getElementById('root')
		);

store.subscribe(render);
render();
registerServiceWorker();

