import React from 'react';
import PropTypes from 'prop-types';

import { BAMBOO_COMPONENT } from '../utils/componentUtil';

export const BAMBOO_MODAL_LOADING = 'BAMBOO_MODAL_LOADING';

const ModalLoading = ({ children }) => (
	<div className="bmbo-modal-loading">
		{children}
	</div>
);

ModalLoading.propTypes = {
	children: PropTypes.node,
};

ModalLoading[BAMBOO_COMPONENT] = BAMBOO_MODAL_LOADING;

export default ModalLoading;
