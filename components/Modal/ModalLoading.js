import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { BAMBOO_COMPONENT } from '../utils/componentUtil';
import Icon from '../Icon';

export const BAMBOO_MODAL_LOADING = 'BAMBOO_MODAL_LOADING';

const ModalLoading = ({ children, loading, defaultView, className, ...props }) => {
	let $content = children;

	if (defaultView) {
		$content = (
			<div className={classNames('bmbo-default-loading')}>
				<Icon.Loading />
			</div>
		);
	}

	return (
		<div
			className={classNames('bmbo-modal-loading', {
				'bmbo-shown': loading,
				className,
			})}
			{...props}
		>
			{$content}
		</div>
	);
};

ModalLoading.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
	defaultView: PropTypes.bool,
};

ModalLoading[BAMBOO_COMPONENT] = BAMBOO_MODAL_LOADING;

export default ModalLoading;
