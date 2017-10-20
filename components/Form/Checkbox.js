import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { BAMBOO_COMPONENT } from '../utils/componentUtil';

export const BAMBOO_FORM_CHECKBOX = 'BAMBOO_FORM_CHECKBOX';

const Checkbox = ({ children, checked, onClick, className, ...props }) => (
	<div
		className={classNames('bmbo-checkbox', checked && 'bmbo-checked', className)}
		role="button"
		tabIndex={0}
		onClick={onClick}
		{...props}
	>
		<input type="checkbox" checked={checked} readOnly />
		<span className="bmbo-checkbox-check" />

		<div className="bmbo-checkbox-content">{children}</div>
	</div>
);

Checkbox.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,

	checked: PropTypes.bool,
	onClick: PropTypes.func,
};

Checkbox[BAMBOO_COMPONENT] = BAMBOO_FORM_CHECKBOX;

export default Checkbox;
