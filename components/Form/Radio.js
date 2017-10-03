import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const BAMBOO_FORM_RADIO = 'BAMBOO_FORM_RADIO';

const Radio = ({ children, checked, onClick }) => (
	<div
		className={classNames('bmbo-radio', checked && 'bmbo-checked')}
		role="button"
		tabIndex={0}
		onClick={onClick}
	>
		<input type="radio" checked={checked} readOnly />
		<span className="bmbo-radio-check" />

		<div className="bmbo-radio-content">{children}</div>
	</div>
);

Radio.propTypes = {
	children: PropTypes.node,

	checked: PropTypes.bool,
	onClick: PropTypes.func,
};

Radio[BAMBOO_FORM_RADIO] = BAMBOO_FORM_RADIO;

export default Radio;
