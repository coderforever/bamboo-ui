import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Col from './Col';

const DEFAULT_GUTTER = 15;

class Row extends React.PureComponent {
	getChildContext() {
		const { gutter = DEFAULT_GUTTER } = this.props;

		return {
			rowGutter: gutter,
		};
	}

	render() {
		const { gutter = DEFAULT_GUTTER, children, className, ...props } = this.props;
		const hg = gutter / 2;

		return (
			<div className={classNames('bmbo-row', className)} {...props}>
				<div style={{ marginLeft: `-${hg}px`, marginRight: `-${hg}px` }}>
					{children}
				</div>
			</div>
		);
	}
}

Row.propTypes = {
	gutter: PropTypes.number,
	children: PropTypes.node,
	className: PropTypes.string,
};

Row.childContextTypes = {
	rowGutter: PropTypes.number,
};

Row.Col = Col;

export default Row;
