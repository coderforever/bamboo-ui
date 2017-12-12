import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { BambooDate } from '../utils/dateUtils';
import { wrapperEventValue } from '../utils/eventUtil';
import { canUseDOM } from '../utils/envUtil';
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
			animateStatus: ANIMATE_STATUS_NONE,

			viewDate: null, // This is used for show current year-month panel
			nextViewDate: null, // This is used for animation panel
		};

		this.seq = new Sequence();
	}

	componentWillMount() {
		this.checkUpdate({}, this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.checkUpdate(this.props, nextProps);
	}

	onSwitchDateView = (nextDate) => {
		if (this.state.animateStatus !== ANIMATE_STATUS_NONE) return;
		this.switchDateView(nextDate);
	};

	onTransitionEnd = (event) => {
		const { animateStatus, nextViewDate } = this.state;

		if (event.target === this.$nextView && animateStatus === ANIMATE_STATUS_SHOWN) {
			this.seq.next(() => {
				this.setState({
					animateStatus: ANIMATE_STATUS_NONE,
					viewDate: nextViewDate,
					nextViewDate: null,
				});
			});
		}
	};

	setRef = (ele) => {
		this.$ele = ele;
	};

	setViewRef = (ele) => {
		this.$view = ele;
	};

	setNextViewRef = (ele) => {
		this.$nextView = ele;
	};

	checkUpdate = (prevProps, nextProps) => {
		if (prevProps.value === nextProps.value) return;

		const { viewDate } = this.state;
		const nextDate = new BambooDate(nextProps.value);

		if (!prevProps.value || (viewDate && viewDate.format('YYYY-MM') === nextDate.format('YYYY-MM'))) {
			this.setState({
				viewDate: nextDate,
			});
		} else {
			const prevDate = new BambooDate(prevProps.value);
			if (prevDate.format('YYYY-MM') === nextDate.format('YYYY-MM')) return;

			this.switchDateView(nextDate);
		}
	};

	switchDateView = (nextDate) => {
		this.seq
			.next((done) => {
				this.setState({
					animateStatus: ANIMATE_STATUS_SHOWING,
					nextViewDate: nextDate,
				}, done);
			})
			.next((done) => {
				this.setState({
					animateStatus: ANIMATE_STATUS_SHOWN,
				}, done);
			});
	};

	triggerChangeEvent = (event, date) => {
		const { onChange } = this.props;
		if (onChange) {
			onChange(wrapperEventValue(event, this.$ele, date.format('YYYY-MM-DD')));
		}
	};

	render() {
		const { animateStatus, viewDate, nextViewDate } = this.state;
		if (!viewDate) return null;

		const { value, className, ...props } = this.props;
		delete props.onChange;

		const date = new BambooDate(value);

		const isShowing = animateStatus === ANIMATE_STATUS_SHOWING;
		const isShown = animateStatus === ANIMATE_STATUS_SHOWN;

		// Current view
		const startDate = viewDate.clone().setDate(1);
		const endDate = viewDate.clone().setDate(1);
		startDate.setDay(0);
		endDate.setMonth(endDate.getMonth() + 1).setDate(0).setDay(6);
		const $view = (
			<DatePanel
				date={date}
				viewDate={viewDate}
				startDate={startDate}
				endDate={endDate}
				triggerChangeEvent={this.triggerChangeEvent}
				setRef={this.setViewRef}
				className={classNames({
					'bmbo-left': isShown && nextViewDate.getTime() > viewDate.getTime(),
					'bmbo-right': isShown && nextViewDate.getTime() < viewDate.getTime(),
				})}
			/>
		);

		// Next view
		let $nextView;
		if (animateStatus !== ANIMATE_STATUS_NONE) {
			const nextStartDate = nextViewDate.clone().setDate(1);
			const nextEndDate = nextViewDate.clone().setDate(1);
			nextStartDate.setDay(0);
			nextEndDate.setMonth(nextEndDate.getMonth() + 1).setDate(0).setDay(6);
			$nextView = (
				<DatePanel
					date={date}
					viewDate={nextViewDate}
					startDate={nextStartDate}
					endDate={nextEndDate}
					setRef={this.setNextViewRef}
					onTransitionEnd={this.onTransitionEnd}
					className={classNames(
						'bmbo-target',
						{
							'bmbo-left': isShowing && nextViewDate.getTime() < viewDate.getTime(),
							'bmbo-right': isShowing && nextViewDate.getTime() > viewDate.getTime(),
						},
					)}
				/>
			);
		}

		// Content style
		const contentStyle = {};
		if (canUseDOM) {
			if (isShowing && this.$view) {
				contentStyle.height = `${this.$view.clientHeight}px`;
			} else if (!isShowing && this.$nextView) {
				contentStyle.height = `${this.$nextView.clientHeight}px`;
			}
		}

		return (
			<div
				className={classNames('bmbo-date-picker', className)}
				ref={this.setRef}
				{...props}
			>
				<div className="bmbo-date-picker-header">
					<a
						role="button"
						tabIndex={-1}
						aria-label="Prev Year"
						className="bmbo-date-picker-operation bmbo-year-prev"
						onClick={() => {
							this.onSwitchDateView(viewDate.clone().setFullYear(viewDate.getFullYear() - 1));
						}}
					/>
					<a
						role="button"
						tabIndex={-1}
						aria-label="Prev Month"
						className="bmbo-date-picker-operation bmbo-month-prev"
						onClick={() => {
							this.onSwitchDateView(viewDate.clone().setMonth(viewDate.getMonth() - 1));
						}}
					/>

					{viewDate.format('YYYY-MM')}

					<a
						role="button"
						tabIndex={-1}
						aria-label="Next Year"
						className="bmbo-date-picker-operation bmbo-year-next"
						onClick={() => {
							this.onSwitchDateView(viewDate.clone().setFullYear(viewDate.getFullYear() + 1));
						}}
					/>
					<a
						role="button"
						tabIndex={-1}
						aria-label="Next Month"
						className="bmbo-date-picker-operation bmbo-month-next"
						onClick={() => {
							this.onSwitchDateView(viewDate.clone().setMonth(viewDate.getMonth() + 1));
						}}
					/>
				</div>

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
					style={contentStyle}
				>
					{$view}
					{$nextView}
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
