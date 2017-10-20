import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { BAMBOO_COMPONENT } from '../utils/componentUtil';

export const BAMBOO_MODAL_TITLE = 'BAMBOO_MODAL_TITLE';

const ModalTitle = ({ children, className, ...props }) => (
	<div className={classNames('bmbo-modal-title', className)} {...props}>
		{children}
	</div>
);

ModalTitle.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

ModalTitle[BAMBOO_COMPONENT] = BAMBOO_MODAL_TITLE;

export default ModalTitle;
