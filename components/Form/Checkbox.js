import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { BAMBOO_COMPONENT } from '../utils/componentUtil';

export const BAMBOO_FORM_CHECKBOX = 'BAMBOO_FORM_CHECKBOX';

const Checkbox = ({ children, checked, disabled, size, onClick, className, ...props }) => (
	<div
		className={classNames(
			'bmbo-checkbox',
			`bmbo-${size || 'md'}`,
			checked && 'bmbo-checked',
			disabled && 'bmbo-disabled',
			className,
		)}
		role="button"
		tabIndex={0}
		onClick={disabled ? null : onClick}
		{...props}
	>
		<input type="checkbox" checked={checked} disabled={disabled} readOnly />
		<span className="bmbo-checkbox-check" />

		<div className="bmbo-checkbox-content">{children}</div>
	</div>
);

Checkbox.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	size: PropTypes.string,
	disabled: PropTypes.bool,

	checked: PropTypes.bool,
	onClick: PropTypes.func,
};

Checkbox[BAMBOO_COMPONENT] = BAMBOO_FORM_CHECKBOX;

export default Checkbox;
