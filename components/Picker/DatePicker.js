import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { parseDate, toDate, BambooDate } from '../utils/dateUtils';

const DATE_LIST = [
	'SUN',
	'MON',
	'TUE',
	'WED',
	'THU',
	'FRI',
	'SAT',
];

class DatePicker extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		const { date = '' } = this.props;
		const myDate = new BambooDate(date);

		const startDate = myDate.clone().setDate(1).setDay(0);
		const endDate = myDate.clone().setMonth(myDate.getMonth() + 1).setDate(0).setDay(6);

		// Get date points
		const $dateList = [];
		const currentDate = startDate.clone();
		while (currentDate.getTime() <= endDate.getTime()) {
			$dateList.push(
				<li
					key={currentDate.getTime()}
					className={classNames({
						'bmbo-deprecated': currentDate.getMonth() !== myDate.getMonth(),
					})}
				>
					{currentDate.getDate()}
				</li>,
			);

			currentDate.setDate(currentDate.getDate() + 1);
		}

		return (
			<div className="bmbo-date-picker">
				<ul className="bmbo-date-picker-title">
					{DATE_LIST.map(str => (
						<li key={str}>
							<strong>{str}</strong>
						</li>
					))}
				</ul>
				<ul className="bmbo-date-picker-content">
					{$dateList}
				</ul>
			</div>
		);
	}
}

DatePicker.propTypes = {
	date: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
};

export default DatePicker;
