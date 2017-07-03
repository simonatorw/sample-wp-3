import React, { Component } from 'react';

import './Lazy.css';

export default class Lazy extends Component {
	state = {
		data: [
			{ make: 'Ferrari', model: '458', price: 250000 },
			{ make: 'Lambo', model: 'LP560-4', price: 150000 },
			{ make: 'Porsche', model: '911 4S', price: 100000 }
		],
		col: {
			makeAsc: true,
			modelAsc: true,
			priceAsc: true,
			current: ''
		}
	};
	sort(col) {
		let bool;
		const data = this.state.data.sort((a, b) => {
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
					{ this.state.data.map((item, i) => {
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