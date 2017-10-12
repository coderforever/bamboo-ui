import React from 'react';
import PropTypes from 'prop-types';

import { BAMBOO_COMPONENT } from '../utils/componentUtil';

export const BAMBOO_MODAL_TITLE = 'BAMBOO_MODAL_TITLE';

const ModalTitle = ({ children }) => (
	<div className="bmbo-modal-title">
		{children}
	</div>
);

ModalTitle.propTypes = {
	children: PropTypes.node,
};

ModalTitle[BAMBOO_COMPONENT] = BAMBOO_MODAL_TITLE;

export default ModalTitle;
