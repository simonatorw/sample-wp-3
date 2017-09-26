import React, { Component } from 'react';
import * as Chartist from 'chartist';

var data = {
	labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	series: [
		[5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
		[3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
	]
};

export default class Plugin extends Component {
	componentDidMount() {
		new Chartist.Bar('.chart', data);		
	}
	render() {
	
		return (
			<div className="chart"></div>
		);
	}
}