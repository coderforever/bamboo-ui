import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Caret from '../Icon/Caret';
import DatePanel from './DatePanel';

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
					<span className="bmbo-date-picker-year">
						<Caret direct="left" />
						{year}
						<Caret />
					</span>
					<span className="bmbo-date-picker-month">
						<Caret direct="left" />
						{month + 1}
						<Caret />
					</span>
				</div>

				<div>
					<DatePanel year={year} month={month} />
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
