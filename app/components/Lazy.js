import React, { Component } from 'react';
import { connect } from 'react-redux';
import { array } from 'prop-types';

import './Lazy.css';

class Lazy extends Component {
	state = {
		col: {
			makeAsc: true,
			modelAsc: true,
			priceAsc: true,
			current: ''
		}
	};
	static propTypes = {
		data: array.isRequired
	};
	sort(col) {
		let bool;
		const data = this.props.data.sort((a, b) => {
			if (this.state.col[col + 'Asc']) {
				bool = false;
				return a[col] > b[col];
			} else {
				bool = true;
				return a[col] < b[col];
			}
		});
		this.setState({ data, col: { [col + 'Asc']: bool, current: col }});
	}
	render() {
		return (
			<table>
				<thead>
					<tr>
						<th onClick={ this.sort.bind(this, 'make') } 
							className={ this.state.col.current === 'make' ? 
								(this.state.col.makeAsc ? 'des' : 'asc') : '' }>Make</th>
						<th onClick={ this.sort.bind(this, 'model') } 
							className={ this.state.col.current === 'model' ? 
								(this.state.col.modelAsc ? 'des' : 'asc') : '' }>Model</th>
						<th onClick={ this.sort.bind(this, 'price') } 
							className={ this.state.col.current === 'price' ? 
								(this.state.col.priceAsc ? 'amt des' : 'amt asc') : '' }>Price</th>
					</tr>
				</thead>
				<tbody>
					{ this.props.data.map((item, i) => {
						return (
							<tr key={i + '_' + item.make}>
								<td>{item.make}</td>
								<td>{item.model}</td>
								<td className="amt">{item.price}</td>
							</tr>
						);
					}) }
				</tbody>
			</table>
		);		
	}
}

function mapStateToProps(store) {	
	return {
		data: store.data
	};
}

export default connect(mapStateToProps)(Lazy);