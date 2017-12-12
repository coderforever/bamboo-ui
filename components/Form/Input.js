import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { BAMBOO_INTERNAL_REF } from '../utils/componentUtil';

export const BAMBOO_FORM_INPUT = 'BAMBOO_FORM_INPUT';

const Input = (props) => {
	const { size, className, ...rest } = props;
	const setRef = rest[BAMBOO_INTERNAL_REF];
	delete rest[BAMBOO_INTERNAL_REF];

	return (
		<input
			className={classNames(
				'bmbo-input',
				`bmbo-${size || 'md'}`,
				className,
			)}
			ref={setRef}
			{...rest}
		/>
	);
};

Input.propTypes = {
	size: PropTypes.string,
	className: PropTypes.string,
};

Input[BAMBOO_FORM_INPUT] = BAMBOO_FORM_INPUT;

export default Input;
