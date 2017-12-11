import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import PinBox from '../PinBox';
import Input from '../Form/Input';

import DatePicker from './DatePicker';

class Sample extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		const { value, ...props } = this.props;

		const $pin = (
			<DatePicker />
		);

		return (
			<PinBox pin={$pin} backdrop>
				<Input value={value} {...props} />
			</PinBox>
		);
	}
}

Sample.propTypes = {
	value: PropTypes.string,
};

export default Sample;
