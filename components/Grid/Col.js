import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

const REGEX = /^(\d+)\/(\d+)$/;

function getMatch(numerator, denominator, total) {
	const multiple = (total / denominator);
	if (multiple !== Math.floor(multiple)) return null;

	return `${numerator * multiple}-${total}`;
}

function getName(val) {
	const match = val.match(REGEX);

	// Return full row if not match
	if (!match) return '10-10';

	const numerator = Number(match[1]);
	const denominator = Number(match[2]);

	return getMatch(numerator, denominator, 24) || getMatch(numerator, denominator, 10);
}

const Col = ({ xs, sm, md, lg, xl, children }, { rowGutter }) => {
	const xsClassName = xs ? `bmbo-col-xs-${getName(xs)}` : '';
	const smClassName = sm ? `bmbo-col-sm-${getName(sm)}` : '';
	const mdClassName = md ? `bmbo-col-md-${getName(md)}` : '';
	const lgClassName = lg ? `bmbo-col-lg-${getName(lg)}` : '';
	const xlClassName = xl ? `bmbo-col-xl-${getName(xl)}` : '';

	const hg = rowGutter / 2;

	return (
		<div
			className={`bmbo-col ${xsClassName} ${smClassName} ${mdClassName} ${lgClassName} ${xlClassName}`}
			style={{ paddingLeft: `${hg}px`, paddingRight: `${hg}px` }}
		>
			{children}
		</div>
	);
};

Col.propTypes = {
	xs: PropTypes.string,
	sm: PropTypes.string,
	md: PropTypes.string,
	lg: PropTypes.string,
	xl: PropTypes.string,
	children: PropTypes.node,
};

Col.contextTypes = {
	rowGutter: PropTypes.number,
};

export default Col;
