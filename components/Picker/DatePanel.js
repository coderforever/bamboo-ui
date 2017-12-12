import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const DatePanel = ({ date, startDate, endDate, triggerChangeEvent, className, setRef, ...props }) => {
	const $dateList = [];
	const currentDate = startDate.clone();
	while (currentDate.getTime() <= endDate.getTime()) {
		const pointDate = currentDate.clone();

		$dateList.push(
			<li
				key={pointDate.getTime()}
				className={classNames({
					'bmbo-deprecated': date && pointDate.getMonth() !== date.getMonth(),
					'bmbo-active': (
						date &&
						pointDate.getFullYear() === date.getFullYear() &&
						pointDate.getMonth() === date.getMonth() &&
						pointDate.getDate() === date.getDate()
					),
				})}
				role="button"
				tabIndex={-1}
				onClick={(event) => {
					triggerChangeEvent(event, pointDate);
				}}
			>
				{pointDate.getDate()}
			</li>,
		);

		currentDate.setDate(currentDate.getDate() + 1);
	}

	return (
		<ul className={classNames('bmbo-date-picker-panel', className)} ref={setRef} {...props}>
			{$dateList}
		</ul>
	);
};

DatePanel.propTypes = {
	date: PropTypes.object,
	startDate: PropTypes.object,
	endDate: PropTypes.object,
	className: PropTypes.string,
	triggerChangeEvent: PropTypes.func,
	setRef: PropTypes.func,
};

export default DatePanel;
