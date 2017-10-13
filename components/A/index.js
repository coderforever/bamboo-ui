import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const A = ({ className, target, ...props }) => {
	const myProps = { target };
	if (target === '_blank') {
		myProps.rel = 'noopener noreferrer';
	}

	return (
		<a
			className={classNames('bmbo-a', className)}
			{...myProps}
			{...props}
		/>
	);
};

A.propTypes = {
	className: PropTypes.string,
	target: PropTypes.string,
};

export default A;
