import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Caret = ({ direct = 'right', className }) => (
	<span
		className={classNames('bmbo-icon bmbo-caret', direct && `bmbo-caret-${direct}`, className)}
	/>
);

Caret.propTypes = {
	direct: PropTypes.string,
	className: PropTypes.string,
};

export default Caret;
