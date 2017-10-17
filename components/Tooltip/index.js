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
		const rect = this.$holder.getBoundingClientRect();
		this.setState({ hover: true, rect });
	};

	onMouseLeave = () => {
		this.setState({ hover: false });
	};

	setHolderRef = (ele) => {
		this.$holder = ele;
	};

	render() {
		const { title, children } = this.props;
		const { hover, rect } = this.state;

		return (
			<div
				className="bmbo-tooltip-holder"
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
				ref={this.setHolderRef}
			>
				{children}
				<Tooltip visible={hover} rect={rect}>
					{title}
				</Tooltip>
			</div>
		);
	}
}

TooltipHolder.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node,
};

export default TooltipHolder;
