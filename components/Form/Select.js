import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import classNames from 'classnames';
import { requestAnimationFrame } from '../utils/uiUtil';
import { addUniqueListener, removeUniqueListener, isSameSource, wrapEvent } from '../utils/eventUtil';

import SelectList from './SelectList';
import SelectOption from './SelectOption';

class Select extends React.Component {
	constructor() {
		super();
		this.state = {
			open: false,
		};
	}

	getChildContext() {
		return {
			bmboSelectSize: this.props.size,
			bmboOnSelectValue: this.onSelectValue,
		};
	}

	onWindowHide = (event) => {
		if (isSameSource(event, this.$ele)) return;

		removeUniqueListener('mousedown', this.onWindowHide);
		removeUniqueListener('blur', this.onWindowHide);

		this.setState({ open: false });
	};

	onTitleMouseDown = () => {
		this.setState(({ open }) => {
			const newState = {
				open: !open,
			};

			// Show animation
			if (newState.open) {
				if (!this.$ele) return null;

				newState.rect = this.$ele.getBoundingClientRect();

				requestAnimationFrame(() => {
					addUniqueListener('mousedown', this.onWindowHide);
					addUniqueListener('blur', this.onWindowHide);
				});
			}

			return newState;
		});
	};

	onSelectValue = (value, event) => {
		const { onChange } = this.props;

		if (onChange) {
			console.log('~~>', event, value);
			onChange(wrapEvent({
				...event,
				target: this.$ele,
				currentTarget: this.$ele,
			}, value, 'onChange'));
		}

		this.setState({ open: false });
	};

	setRef = (ele) => {
		this.$ele = ele;
	};

	render() {
		const { size, className, value, children, ...props } = this.props;
		const { open, rect } = this.state;

		delete props.onChange;

		return (
			<div
				className="bmbo-select"
				{...props}
				ref={this.setRef}
			>
				<div
					className={classNames(
						'bmbo-select-value',
						`bmbo-${size || 'md'}`,
						className,
					)}

					role="button"
					tabIndex={0}
					onMouseDown={this.onTitleMouseDown}
				>
					{value || '\u00A0'}
					<span className="bmbo-caret bmbo-caret-down" />
				</div>

				<SelectList size={size} open={open} rect={rect}>
					{children}
				</SelectList>
			</div>
		);
	}
}

Select.propTypes = {
	onChange: PropTypes.func,
	size: PropTypes.string,
	className: PropTypes.string,
	value: PropTypes.any,
	children: PropTypes.node,
};

Select.childContextTypes = {
	bmboSelectSize: PropTypes.string,
	bmboOnSelectValue: PropTypes.func,
};

Select.Option = SelectOption;

export default Select;
