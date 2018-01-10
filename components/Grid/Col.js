import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const REGEX = /^(\d+)\/(\d+)$/;

function getMatch(numerator, denominator, total) {
	const multiple = (total / denominator);
	if (multiple !== Math.floor(multiple)) return null;

	return `${numerator * multiple}-${total}`;
}

function getName(prefix, val) {
	if (!val) return '';
	if (val === '0') return `${prefix}0`;

	const myVal = val === '1' ? '1/1' : val;
	const match = Array.isArray(myVal) ? [null, ...myVal] : myVal.match(REGEX);

	// Return full row if not match
	if (!match) return '10-10';

	const numerator = Number(match[1]);
	const denominator = Number(match[2]);

	const cal = getMatch(numerator, denominator, 24) || getMatch(numerator, denominator, 10);
	return `${prefix}${cal}`;
}

const Col = (props, context) => {
	const {
		xs, sm, md, lg, xl,
		xsOffset, smOffset, mdOffset, lgOffset, xlOffset,
		children, className, ...rest
	} = props;
	const { rowGutter } = context;

	const xsClassName = getName('bmbo-col-xs-', xs);
	const smClassName = getName('bmbo-col-sm-', sm);
	const mdClassName = getName('bmbo-col-md-', md);
	const lgClassName = getName('bmbo-col-lg-', lg);
	const xlClassName = getName('bmbo-col-xl-', xl);

	const xsOffsetClassName = getName('bmbo-col-xs-offset-', xsOffset);
	const smOffsetClassName = getName('bmbo-col-sm-offset-', smOffset);
	const mdOffsetClassName = getName('bmbo-col-md-offset-', mdOffset);
	const lgOffsetClassName = getName('bmbo-col-lg-offset-', lgOffset);
	const xlOffsetClassName = getName('bmbo-col-xl-offset-', xlOffset);

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
