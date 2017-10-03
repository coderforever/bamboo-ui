import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const BAMBOO_FORM_CHECKBOX = 'BAMBOO_FORM_CHECKBOX';

const Checkbox = ({ children, checked, onClick }) => (
	<div
		className={classNames('bmbo-checkbox', checked && 'bmbo-checked')}
		role="button"
		tabIndex={0}
		onClick={onClick}
	>
		<input type="checkbox" checked={checked} readOnly />
		<span className="bmbo-checkbox-check" />

		<div className="bmbo-checkbox-content">{children}</div>
	</div>
);

Checkbox.propTypes = {
	children: PropTypes.node,

	checked: PropTypes.bool,
	onClick: PropTypes.func,
};

Checkbox[BAMBOO_FORM_CHECKBOX] = BAMBOO_FORM_CHECKBOX;

export default Checkbox;
