import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ANIMATE_STATUS_NONE, ANIMATE_STATUS_SHOWING, ANIMATE_STATUS_SHOWN, Waiter } from '../utils/uiUtil';
import { BAMBOO_COMPONENT } from '../utils/componentUtil';

export const BAMBOO_MODAL_LOADING = 'BAMBOO_MODAL_LOADING';

class ModalLoading extends React.Component {
	/* constructor() {
		super();
		this.state = {
			animationStatus: ANIMATE_STATUS_NONE,
		};
		this.waiter = new Waiter();
	} */

	/* componentWillMount() {
		this.waiter.immediate(() => {
			this.setState({
				animationStatus: ANIMATE_STATUS_SHOWING,
			});
		});
	}

	componentWillUnmount() {
		this.waiter.destroy();
	} */

	render() {
		const { children, loading } = this.props;
		// const { animationStatus } = this.state;

		return (
			<div
				className={classNames('bmbo-modal-loading', {
					'bmbo-shown': loading,
				})}
			>
				{children}
			</div>
		);
	}
}

ModalLoading.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.node,
};

ModalLoading[BAMBOO_COMPONENT] = BAMBOO_MODAL_LOADING;

export default ModalLoading;
