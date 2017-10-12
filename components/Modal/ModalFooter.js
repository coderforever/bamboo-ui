import React from 'react';
import PropTypes from 'prop-types';
import { BAMBOO_COMPONENT } from '../utils/componentUtil';

export const BAMBOO_MODAL_FOOTER = 'BAMBOO_MODAL_FOOTER';

const ModalFooter = ({ children }) => (
	<div className="bmbo-modal-footer">
		{children}
	</div>
);

ModalFooter.propTypes = {
	children: PropTypes.node,
};

ModalFooter[BAMBOO_COMPONENT] = BAMBOO_MODAL_FOOTER;

export default ModalFooter;
