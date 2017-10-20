import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { BAMBOO_COMPONENT } from '../utils/componentUtil';

export const BAMBOO_MODAL_CONTENT = 'BAMBOO_MODAL_CONTENT';

const ModalContent = ({ children, className, ...props }) => (
	<div className={classNames('bmbo-modal-body', className)} {...props}>
		{children}
	</div>
);

ModalContent.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

ModalContent[BAMBOO_COMPONENT] = BAMBOO_MODAL_CONTENT;

export default ModalContent;
