import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { getHolder } from '../utils/uiUtil';

const $holder = getHolder();

class Tooltip extends React.Component {
	render() {
		return createPortal(
			<div className="bmbo-tooltip">
				<div className="bmbo-tooltip-title">
					test
				</div>
				<div className="bmbo-tooltip-arrow" />
			</div>
		, $holder);
	}
}

export default Tooltip;
