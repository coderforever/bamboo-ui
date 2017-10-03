import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

const DEFAULT_GUTTER = 15;

class Row extends React.PureComponent {
	getChildContext() {
		const { gutter = DEFAULT_GUTTER } = this.props;

		return {
			rowGutter: gutter,
		};
	}

	render() {
		const { gutter = DEFAULT_GUTTER, children } = this.props;
		const hg = gutter / 2;

		return (
			<div className="bmbo-row">
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
};

Row.childContextTypes = {
	rowGutter: PropTypes.number,
};

export default Row;
