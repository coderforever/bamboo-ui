import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { parseDate } from '../utils/dateUtils';

import PinBox from '../PinBox';
import Input from '../Form/Input';
import PickerDialog from './PickerDialog';


class DatePicker extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		const { size, className, date, ...props } = this.props;
		const myDate = parseDate(date || '');
		console.log('~>', myDate);

		let $date = '\u00A0';
		if (myDate) {
			$date = (
				<span>
					<span>{myDate.year}</span>
					<span>-</span>
					<span>{myDate.month}</span>
					<span>-</span>
					<span>{myDate.date}</span>
				</span>
			);
		}

		return (
			<div
				className={classNames(
					'bmbo-date-picker',
					`bmbo-${size || 'md'}`,
					className,
				)}
				{...props}
			>
				{$date}

				<PickerDialog size={size} {...myDate} />
			</div>
		);
	}
}

DatePicker.propTypes = {
	size: PropTypes.string,
	className: PropTypes.string,
	date: PropTypes.string,
};

export default DatePicker;
