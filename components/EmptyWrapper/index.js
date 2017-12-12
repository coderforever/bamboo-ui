import React from 'react';
import PropTypes from 'prop-types';

class EmptyWrapper extends React.Component {
	render() {
		const { children, ...props } = this.props;
		return React.cloneElement(children, props);
	}
}

EmptyWrapper.propTypes = {
	children: PropTypes.node,
};

export default EmptyWrapper;
