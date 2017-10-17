import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

class TooltipHolder extends React.Component {
	constructor() {
		super();
		this.state = {
			hover: false,
		};
	}

	onMouseEnter = () => {
		this.setState({ hover: true });
	};

	onMouseLeave = () => {
		this.setState({ hover: false });
	};

	render() {
		const { children } = this.props;

		return (
			<div
				className="bmbo-tooltip"
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
			>
				{children}
			</div>
		);
	}
}

TooltipHolder.propTypes = {
	children: PropTypes.node,
};

export default TooltipHolder;
