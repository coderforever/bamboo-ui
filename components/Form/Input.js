import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { BAMBOO_INTERNAL_REF } from '../utils/componentUtil';

import Icon from '../Icon';

export const BAMBOO_FORM_INPUT = 'BAMBOO_FORM_INPUT';

const Input = (props) => {
	const { size, icon, className, ...rest } = props;
	const setRef = rest[BAMBOO_INTERNAL_REF];
	delete rest[BAMBOO_INTERNAL_REF];

	const $input = (
		<input
			className={classNames(
				'bmbo-input',
				icon && 'bmbo-with-icon',
				`bmbo-${size || 'md'}`,
				className,
			)}
			ref={setRef}
			{...rest}
		/>
	);

	if (icon) {
		return (
			<div
				className={classNames(
					'bmbo-input-container',
					`bmbo-${size || 'md'}`,
				)}
			>
				{$input}
				<Icon name={icon} size={size} className="bmbo-input-icon" />
			</div>
		);
	}

	return $input;
};

Input.propTypes = {
	size: PropTypes.string,
	icon: PropTypes.string,
	className: PropTypes.string,
};

Input[BAMBOO_FORM_INPUT] = BAMBOO_FORM_INPUT;

export default Input;
