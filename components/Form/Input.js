import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const BAMBOO_FORM_INPUT = 'BAMBOO_FORM_INPUT';

const Input = ({ size, className, ...props }) => (
	<input
		className={classNames(
			'bmbo-form-control',
			`bmbo-${size || 'md'}`,
			className,
		)}
		{...props}
	/>
);

Input.propTypes = {
	size: PropTypes.string,
	className: PropTypes.string,
};

Input[BAMBOO_FORM_INPUT] = BAMBOO_FORM_INPUT;

export default Input;
