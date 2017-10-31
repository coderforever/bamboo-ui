import React from 'react';
import PropTypes from 'prop-types';

import Sequence from '../utils/Sequence';

class DynamicNumber extends React.Component {
	constructor() {
		super();
		this.state = {
			origin: 0,
			passTime: 0,
		};
		this.seq = new Sequence();
	}

	componentWillMount() {
		this.doAnimation(this.props.value);
	}

	componentWillReceiveProps(nextProps) {
		this.doAnimation(nextProps.value);
	}

	componentWillUnmount() {
		this.seq.destroy();
	}

	doAnimation = (nextValue) => {
	};

	render() {
		return (
			<span>
				Hello world
			</span>
		);
	}
}

DynamicNumber.propTypes = {
	value: PropTypes.number,
	duration: PropTypes.number,
};

DynamicNumber.defaultProps = {
	duration: 1000,
};

export default DynamicNumber;
