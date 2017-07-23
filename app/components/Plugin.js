import React, { Component } from 'react';
import $ from 'jquery';

export default class Plugin extends Component {
	componentDidMount() {
		$('#plugin').html('helloworld');
	}
	render() {
		return (
			<div id="plugin">jquery</div>
		);
	}
}