import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Tooltip from './Tooltip';

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
		const { hover } = this.state;

		return (
			<div
				className="bmbo-tooltip-holder"
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
			>
				{children}
				<Tooltip visible={hover} />
			</div>
		);
	}
}

TooltipHolder.propTypes = {
	children: PropTypes.node,
};

export default TooltipHolder;
