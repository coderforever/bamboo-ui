import React from 'react';
import PropTypes from 'prop-types';
import { BAMBOO_COMPONENT } from '../utils/componentUtil';

export const BAMBOO_MODAL_BODY = 'BAMBOO_MODAL_BODY';

const ModalBody = ({ children }) => (
	<div className="bmbo-modal-body">
		{children}
	</div>
);

ModalBody.propTypes = {
	children: PropTypes.node,
};

ModalBody[BAMBOO_COMPONENT] = BAMBOO_MODAL_BODY;

export default ModalBody;
