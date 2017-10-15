import React from 'react';
import PropTypes from 'prop-types';
import { BAMBOO_COMPONENT } from '../utils/componentUtil';

export const BAMBOO_MODAL_CONTENT = 'BAMBOO_MODAL_CONTENT';

const ModalContent = ({ children }) => (
	<div className="bmbo-modal-body">
		{children}
	</div>
);

ModalContent.propTypes = {
	children: PropTypes.node,
};

ModalContent[BAMBOO_COMPONENT] = BAMBOO_MODAL_CONTENT;

export default ModalContent;
