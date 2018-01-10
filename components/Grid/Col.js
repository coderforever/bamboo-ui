import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const REGEX = /^(\d+)\/(\d+)$/;

function getMatch(numerator, denominator, total) {
	const multiple = (total / denominator);
	if (multiple !== Math.floor(multiple)) return null;

	return `${numerator * multiple}-${total}`;
}

function getName(val) {
	const myVal = val === '1' ? '1/1' : val;
	const match = Array.isArray(myVal) ? [null, ...myVal] : myVal.match(REGEX);

	// Return full row if not match
	if (!match) return '10-10';

	const numerator = Number(match[1]);
	const denominator = Number(match[2]);

	return getMatch(numerator, denominator, 24) || getMatch(numerator, denominator, 10);
}

const Col = (props, context) => {
	const {
		xs, sm, md, lg, xl,
		xsOffset, smOffset, mdOffset, lgOffset, xlOffset,
		children, className, ...rest
	} = props;
	const { rowGutter } = context;

	const xsClassName = xs ? `bmbo-col-xs-${getName(xs)}` : '';
	const smClassName = sm ? `bmbo-col-sm-${getName(sm)}` : '';
	const mdClassName = md ? `bmbo-col-md-${getName(md)}` : '';
	const lgClassName = lg ? `bmbo-col-lg-${getName(lg)}` : '';
	const xlClassName = xl ? `bmbo-col-xl-${getName(xl)}` : '';

	const xsOffsetClassName = xsOffset ? `bmbo-col-xs-offset-${getName(xsOffset)}` : '';
	const smOffsetClassName = smOffset ? `bmbo-col-sm-offset-${getName(smOffset)}` : '';
	const mdOffsetClassName = mdOffset ? `bmbo-col-md-offset-${getName(mdOffset)}` : '';
	const lgOffsetClassName = lgOffset ? `bmbo-col-lg-offset-${getName(lgOffset)}` : '';
	const xlOffsetClassName = xlOffset ? `bmbo-col-xl-offset-${getName(xlOffset)}` : '';

	const hg = rowGutter / 2;

	return (
		<div
			className={classNames(
				'bmbo-col',
				xsClassName, smClassName, mdClassName, lgClassName, xlClassName,
				xsOffsetClassName, smOffsetClassName,
				mdOffsetClassName, lgOffsetClassName, xlOffsetClassName,
				className,
			)}
			style={{ paddingLeft: `${hg}px`, paddingRight: `${hg}px` }}
			{...rest}
		>
			{children}
		</div>
	);
};

Col.propTypes = {
	className: PropTypes.string,

	xs: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	sm: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	md: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	lg: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	xl: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),

	xsOffset: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	smOffset: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	mdOffset: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	lgOffset: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	xlOffset: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),

	children: PropTypes.node,
};

Col.contextTypes = {
	rowGutter: PropTypes.number,
};

export default Col;
