import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const BAMBOO_FORM_RADIO = 'BAMBOO_FORM_RADIO';

import { wrapperEventValue } from '../utils/componentUtil';

class Radio extends React.Component {
	onClick = (...args) => {
		const { onClick, onChange, value } = this.props;
		const event = args[0];

		if (onClick) onClick(...args);
		if (onChange) onChange(wrapperEventValue(event, event.target, value));
	};

	render() {
		const { children, checked } = this.props;

		return (
			<div
				className={classNames('bmbo-radio', checked && 'bmbo-checked')}
				role="button"
				tabIndex={0}
				onClick={this.onClick}
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

	checked: PropTypes.bool,
	onClick: PropTypes.func,
	onChange: PropTypes.func,
	value: PropTypes.node,
};

Radio[BAMBOO_FORM_RADIO] = BAMBOO_FORM_RADIO;

export default Radio;
