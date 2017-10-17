import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const BAMBOO_FORM_INPUT = 'BAMBOO_FORM_INPUT';

const Input = ({ size, ...props }) => (
	<input
		className={classNames(
			'bmbo-form-control',
			`bmbo-${size || 'md'}`,
		)}
		{...props}
	/>
);

Input.propTypes = {
	size: PropTypes.string,
};

Input[BAMBOO_FORM_INPUT] = BAMBOO_FORM_INPUT;

export default Input;
