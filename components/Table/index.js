import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

class Table extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<div>
				Hello world
			</div>
		);
	}
}

Table.propTypes = {
};

export default Table;
