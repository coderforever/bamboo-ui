import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Loading from './Loading';

const Icon = ({ name, spin, className }) => (
	<span className={classNames(`fa fa-${name} bmbo-icon`, spin && 'fa-spin', className)} />
);

Icon.propTypes = {
	name: PropTypes.string,
	spin: PropTypes.bool,
	className: PropTypes.string,
};

Icon.Loading = Loading;

export default Icon;
