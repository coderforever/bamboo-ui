import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Search = ({ className }) => (
	<span
		className={classNames('bmbo-icon bmbo-search', className)}
	/>
);

Search.propTypes = {
	className: PropTypes.string,
};

export default Search;
