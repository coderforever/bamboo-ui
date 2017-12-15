import React from 'react';
import PropTypes from 'prop-types';

import { BAMBOO_INTERNAL_REF } from '../utils/componentUtil';
import { wrapperEventValue } from '../utils/eventUtil';

import PinBox from '../PinBox';
import Input from '../Form/Input';

import DatePicker from './DatePicker';

class Picker extends React.Component {
	onChange = (event) => {
		const { onChange } = this.props;
		if (onChange) {
			onChange(wrapperEventValue(event, this.$input, event.target.value));
		}
	};

	setRef = (ele) => {
		this.$input = ele;
	};

	render() {
		const { value } = this.props;

		const $pin = (
			<DatePicker value={value} onChange={this.onChange} />
		);

		return (
			<PinBox pin={$pin} backdrop>
				<Input {...{ [BAMBOO_INTERNAL_REF]: this.setRef }} {...this.props} />
			</PinBox>
		);
	}
}

Picker.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func,
};

export default Picker;
