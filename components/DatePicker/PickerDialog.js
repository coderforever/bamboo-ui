import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
	createPortal,
} from '../utils/uiUtil';

class PickerDialog extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		const { size, year, month, date } = this.props;

		return createPortal(
			<div
				className={classNames(
					'bmbo-box-absolute',
					'bmbo-date-picker-dialog',
					`bmbo-${size || 'md'}`,
					)}
			>
				<div className="bmbo-date-picker-header">
					<span className="bmbo-date-picker-year">{year}</span>
					<span className="bmbo-date-picker-month">{month}</span>
				</div>
			</div>,
		);
	}
}

PickerDialog.propTypes = {
	size: PropTypes.string,
	year: PropTypes.number,
	month: PropTypes.number,
	date: PropTypes.number,
};

export default PickerDialog;
