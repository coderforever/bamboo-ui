import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { BAMBOO_COMPONENT, wrapperEventValue } from '../utils/componentUtil';

export const BAMBOO_FORM_RADIO = 'BAMBOO_FORM_RADIO';


class Radio extends React.Component {
	onClick = (...args) => {
		const { onClick, onChange, value, children } = this.props;
		const event = args[0];

		if (onClick) onClick(...args);
		if (onChange) {
			onChange(wrapperEventValue(event, event.target, value !== undefined ? value : children));
		}
	};

	render() {
		const { children, checked, className, ...props } = this.props;

		delete props.checked;
		delete props.onClick;
		delete props.onChange;
		delete props.value;

		return (
			<div
				className={classNames('bmbo-radio', checked && 'bmbo-checked', className)}
				role="button"
				tabIndex={0}
				onClick={this.onClick}
				{...props}
			>
				<input type="radio" checked={checked} readOnly />
				<span className="bmbo-radio-check" />

				<div className="bmbo-radio-content">{children}</div>
			</div>
		);
	}
}

Radio.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,

	checked: PropTypes.bool,
	onClick: PropTypes.func,
	onChange: PropTypes.func,
	value: PropTypes.node,
};

Radio[BAMBOO_COMPONENT] = BAMBOO_FORM_RADIO;

export default Radio;
