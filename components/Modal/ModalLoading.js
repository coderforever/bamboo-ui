import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { BAMBOO_COMPONENT } from '../utils/componentUtil';
import Icon from '../Icon';

export const BAMBOO_MODAL_LOADING = 'BAMBOO_MODAL_LOADING';

class ModalLoading extends React.Component {
	render() {
		const { children, loading, defaultView } = this.props;
		// const { animationStatus } = this.state;

		let $content = children;

		if (defaultView) {
			$content = (
				<div className="bmbo-default-loading">
					<Icon.Loading />
				</div>
			);
		}

		return (
			<div
				className={classNames('bmbo-modal-loading', {
					'bmbo-shown': loading,
				})}
			>
				{$content}
			</div>
		);
	}
}

ModalLoading.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.node,
	defaultView: PropTypes.bool,
};

ModalLoading[BAMBOO_COMPONENT] = BAMBOO_MODAL_LOADING;

export default ModalLoading;
