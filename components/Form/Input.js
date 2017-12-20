import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { BAMBOO_INTERNAL_REF } from '../utils/componentUtil';

import Icon from '../Icon';

export const BAMBOO_FORM_INPUT = 'BAMBOO_FORM_INPUT';

class Input extends React.PureComponent {
	setRef = (ele) => {
		const setRef = this.props[BAMBOO_INTERNAL_REF];
		this.$input = ele;

		if (setRef) setRef(ele);
	};

	focus = () => {
		if (this.$input) {
			this.$input.focus();
		}
	};

	render() {
		const { size, type, icon, className, ...rest } = this.props;
		delete rest[BAMBOO_INTERNAL_REF];

		const $input = (
			<input
				className={classNames(
					'bmbo-input',
					icon && 'bmbo-with-icon',
					`bmbo-${size || 'md'}`,
					type && `bmbo-${type}`,
					className,
				)}
				ref={this.setRef}
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
	}
}

Input.propTypes = {
	size: PropTypes.string,
	type: PropTypes.string,
	icon: PropTypes.string,
	className: PropTypes.string,
};

Input[BAMBOO_FORM_INPUT] = BAMBOO_FORM_INPUT;

export default Input;
