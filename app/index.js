import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import { store } from './store/store';
import './Index.css';

const elem = document.createElement('div');
elem.setAttribute('id', 'app');
document.body.appendChild(elem);

render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('app')
);
