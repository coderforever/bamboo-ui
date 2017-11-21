import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Loading from './Loading';
import Caret from './Caret';

const Icon = ({ name, spin, className }) => (
	<span className={classNames(`fa fa-${name} bmbo-icon`, spin && 'fa-spin', className)} />
);

Icon.propTypes = {
	name: PropTypes.string,
	spin: PropTypes.bool,
	className: PropTypes.string,
};

Icon.Loading = Loading;
Icon.Caret = Caret;

export default Icon;
