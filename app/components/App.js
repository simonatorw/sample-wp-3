import React, { Component } from 'react';

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
		});
	}
	render() {
		const { Lazy } = this.state;
		return (
			<div>
				hello <span className="redText">simon</span>
				<a href="#" onClick={ this.lazyLoad.bind(this) }>Get helloworld</a>
				{ Lazy && <Lazy /> }
			</div>
		);
	}
}