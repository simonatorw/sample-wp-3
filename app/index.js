import React from 'react';
import { render } from 'react-dom';

import App from './components/App';
import './Index.css';

const elem = document.createElement('div');
elem.setAttribute('id', 'app');
document.body.appendChild(elem);

render(
	<App />, 
	document.getElementById('app')
);
