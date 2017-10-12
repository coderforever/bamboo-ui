import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { getHolder } from '../utils/uiUtil';

const $holder = getHolder();

class Modal extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		const { visible } = this.props;
		if (!visible) return null;

		const $modal = (
			<div className="bmbo-dialog">
				test
			</div>
		);

		return createPortal(
			<div className="bmbo-modal">
				<div className="bmbo-dialog-holder">
					{$modal}
				</div>
			</div>
		, $holder);
	}
}

Modal.propTypes = {
	visible: PropTypes.bool,
};

export default Modal;
