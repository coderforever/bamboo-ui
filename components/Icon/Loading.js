import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Loading = ({ id, classname }) => (
	<span
		className={classNames('bmbo-icon bmbo-loading', id && `bmbo-loading-${id}`, classname)}
	/>
);

Loading.propTypes = {
	id: PropTypes.number,
	className: PropTypes.string,
};

export default Loading;
