import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { BambooDate } from '../utils/dateUtils';
import { wrapperEventValue } from '../utils/eventUtil';
import {
	ANIMATE_STATUS_HIDING, ANIMATE_STATUS_NONE, ANIMATE_STATUS_SHOWING,
	ANIMATE_STATUS_SHOWN
} from '../utils/uiUtil';
import Sequence from '../utils/Sequence';

import DatePanel from './DatePanel';

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

		this.state = {
			date: null,
			targetDate: null,
			animateStatus: ANIMATE_STATUS_NONE,
		};

		this.seq = new Sequence();
	}

	componentWillMount() {
		this.checkUpdate({}, this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.checkUpdate(this.props, nextProps);
	}

	onTransitionEnd = (event) => {
		const { animateStatus, targetDate } = this.state;

		if (event.target === this.$transPanel && animateStatus === ANIMATE_STATUS_SHOWN) {
			this.seq.next(() => {
				this.setState({
					animateStatus: ANIMATE_STATUS_NONE,
					date: targetDate,
				});
			});
		}
	};

	setRef = (ele) => {
		this.$ele = ele;
	};

	setTransPanelRef = (ele) => {
		this.$transPanel = ele;
	};

	checkUpdate = (prevProps, nextProps) => {
		if (prevProps.value === nextProps.value) return;

		const { date } = this.state;
		const myDate = new BambooDate(nextProps.value);

		if (!date || date.format('YYYY-MM') === myDate.format('YYYY-MM')) {
			this.setState({ date: myDate });
		} else {
			this.seq
				.next((done) => {
					this.setState({
						animateStatus: ANIMATE_STATUS_SHOWING,
						targetDate: myDate,
					}, done);
				})
				.next((done) => {
					this.setState({
						animateStatus: ANIMATE_STATUS_SHOWN,
					}, done);
				});
		}
	};

	triggerChangeEvent = (event, date) => {
		const { onChange } = this.props;
		if (onChange) {
			onChange(wrapperEventValue(event, this.$ele, date.format('YYYY-MM-DD')));
		}
	};

	render() {
		const { date, targetDate, animateStatus } = this.state;
		if (!date) return null;

		const { className, ...props } = this.props;
		delete props.value;
		delete props.onChange;

		const isShowing = animateStatus === ANIMATE_STATUS_SHOWING;
		const isShown = animateStatus === ANIMATE_STATUS_SHOWN;

		// Current Month
		const startDate = date.clone().setDate(1);
		const endDate = date.clone().setDate(1);
		startDate.setDay(0);
		endDate.setMonth(endDate.getMonth() + 1).setDate(0).setDay(6);
		const $current = (
			<DatePanel
				date={date}
				startDate={startDate}
				endDate={endDate}
				triggerChangeEvent={this.triggerChangeEvent}
				onTransitionEnd={this.onTransitionEnd}
				setRef={this.setTransPanelRef}
				className={classNames({
					'bmbo-left': isShown && targetDate.getTime() > date.getTime(),
					'bmbo-right': isShown && targetDate.getTime() < date.getTime(),
				})}
			/>
		);

		// TargetMonth
		let $target;
		if (animateStatus !== ANIMATE_STATUS_NONE) {
			const targetStartDate = targetDate.clone().setDate(1);
			const targetEndDate = targetDate.clone().setDate(1);
			targetStartDate.setDay(0);
			targetEndDate.setMonth(targetEndDate.getMonth() + 1).setDate(0).setDay(6);
			$target = (
				<DatePanel
					startDate={targetStartDate}
					endDate={targetEndDate}
					className={classNames(
						'bmbo-target',
						{
							'bmbo-left': isShowing && targetDate.getTime() < date.getTime(),
							'bmbo-right': isShowing && targetDate.getTime() > date.getTime(),
						},
					)}
				/>
			);
		}

		return (
			<div
				className={classNames('bmbo-date-picker', className)}
				ref={this.setRef}
				{...props}
			>
				<ul className="bmbo-date-picker-title">
					{DATE_LIST.map(str => (
						<li key={str}>
							<strong>{str}</strong>
						</li>
					))}
				</ul>

				<div
					className={classNames(
						'bmbo-date-picker-content',
						{
							'bmbo-none': animateStatus === ANIMATE_STATUS_NONE,
							'bmbo-showing': isShowing,
						},
					)}
				>
					{$current}
					{$target}
				</div>
			</div>
		);
	}
}

DatePicker.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
	className: PropTypes.string,
	onChange: PropTypes.func,
};

export default DatePicker;
