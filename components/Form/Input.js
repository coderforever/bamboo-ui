import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

class Input extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<input className="bmbo-form-control" />
		);
	}
}

Input.propTypes = {
};

export default Input;
