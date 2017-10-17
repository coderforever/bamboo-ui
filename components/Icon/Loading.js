import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Loading = ({ id }) => (
	<span
		className={classNames('bmbo-icon bmbo-loading', id && `bmbo-loading-${id}`)}
	/>
);

Loading.propTypes = {
	id: PropTypes.number,
};

export default Loading;
