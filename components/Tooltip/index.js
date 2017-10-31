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

	onMouseEnter = (event) => {
		const rect = event.currentTarget.getBoundingClientRect();
		this.setState({ hover: true, rect });
	};

	onMouseLeave = () => {
		this.setState({ hover: false });
	};

	render() {
		const { title, children, placement, maxWidth, className, inject, ...props } = this.props;
		const { hover, rect } = this.state;

		if (inject) {
			const childList = React.Children.map(children, node => (
				React.cloneElement(node, {
					onMouseEnter: this.onMouseEnter,
					onMouseLeave: this.onMouseLeave,
					ref: this.setHolderRef,
				})
			));

			return childList.concat(
				<Tooltip key="bmbo-tooltip" visible={hover} rect={rect} placement={placement} maxWidth={maxWidth}>
					{title}
				</Tooltip>,
			);
		}

		return (
			<div
				className={classNames('bmbo-tooltip-holder', className)}
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
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
	inject: PropTypes.bool,
};

export default TooltipHolder;
