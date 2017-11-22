import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

class DatePanel extends React.Component {
	constructor() {
		super();
		this.state = {
			startDate: null,
			endDate: null,
		};
	}

	componentWillMount() {
		this.checkUpdate({}, this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.checkUpdate(this.props, nextProps);
	}

	checkUpdate = (prevProps, nextProps) => {
		const { year, month } = nextProps;
		if (prevProps.year === year && prevProps.month === month) return;

		const startDate = new Date();
		const endDate = new Date();

		startDate.setFullYear(year, month, 1);
		endDate.setFullYear(year, month + 1, 0);

		this.setState({
			startDate,
			endDate,
		});
	};

	render() {
		const { startDate, endDate } = this.state;
		if (!startDate || !endDate) return null;

		const start = startDate.getDate();
		const end = endDate.getDate();
		const startDay = startDate.getDay();
		const endDay = endDate.getDay();
		console.log(start, end, startDay, endDay);

		for (let date = 2 - startDay; date <= end + (7 - endDay); date += 1) {
			console.log('~~>', date);
		}

		return (
			<div>
				{startDate.getDate()}
				-
				{endDate.getDate()}
			</div>
		);
	}
}

DatePanel.propTypes = {
	year: PropTypes.number,
	month: PropTypes.number,
};

export default DatePanel;
