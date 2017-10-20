import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
		const { title, children, placement, maxWidth, className, ...props } = this.props;
		const { hover, rect } = this.state;

		return (
			<div
				className={classNames('bmbo-tooltip-holder', className)}
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
				ref={this.setHolderRef}
				{...props}
			>
				{children}
				<Tooltip visible={hover} rect={rect} placement={placement} maxWidth={maxWidth}>
					{title}
				</Tooltip>
			</div>
		);
	}
}

TooltipHolder.propTypes = {
	className: PropTypes.string,
	title: PropTypes.string,
	children: PropTypes.node,
	placement: PropTypes.string,
	maxWidth: PropTypes.number,
};

export default TooltipHolder;
