import React, { Component } from 'react';

//import Lazy from './Lazy';
import Plugin from './Plugin';
import { store } from '../store/store';
import { fetchData } from '../store/actions/actions';
import './App.css';

export default class App extends Component {
	state = {
		Lazy: null
	};
	lazyLoad(e) {
		e.preventDefault();

		require.ensure([], (require) => {
			const Lazy = require('./Lazy').default;
			this.setState({ Lazy });
			store.dispatch(fetchData());
		});
	}
	componentDidMount() {
		//document.getElementsByTagName('A')[0].click();
	}
	render() {
		const { Lazy } = this.state;
		return (
			<div>
				<div>simon</div>
				<Plugin />
				<h1 className="title">{'Simon\'s Showroom'}</h1>
				{ !Lazy && <a href="#" onClick={ this.lazyLoad.bind(this) }>Show inventory</a> }
				{ Lazy && <Lazy /> }
			</div>
		);
	}
}