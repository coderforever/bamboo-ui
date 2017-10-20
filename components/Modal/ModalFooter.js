import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { BAMBOO_COMPONENT } from '../utils/componentUtil';

export const BAMBOO_MODAL_FOOTER = 'BAMBOO_MODAL_FOOTER';

const ModalFooter = ({ children, className, ...props }) => (
	<div className={classNames('bmbo-modal-footer', className)} {...props}>
		{children}
	</div>
);

ModalFooter.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

ModalFooter[BAMBOO_COMPONENT] = BAMBOO_MODAL_FOOTER;

export default ModalFooter;
