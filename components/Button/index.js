import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Button extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		const { type } = this.props;

		return (
			<button className={classNames('bmbo-button', type && `bmbo-${type}`)}>
				Hello world
			</button>
		);
	}
}

Button.propTypes = {
	type: PropTypes.string,
};

export default Button;
