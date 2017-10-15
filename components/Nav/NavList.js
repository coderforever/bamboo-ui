import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
	ANIMATE_STATUS_NONE, ANIMATE_STATUS_SHOWING, ANIMATE_STATUS_SHOWN, ANIMATE_STATUS_HIDING,
	getHolder, getEnablePosition,
} from '../utils/uiUtil';
import Sequence from '../utils/Sequence';

const $holder = getHolder();

class NavList extends React.Component {
	constructor() {
		super();
		this.state = {
			animateStatus: ANIMATE_STATUS_NONE,
			x: 0,
			y: 0,
		};
		this.seq = new Sequence();
	}

	componentWillMount() {
		this.checkUpdate({}, this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.checkUpdate(this.props, nextProps);
	}

	setListRef = (ele) => {
		this.$list = ele;
	};

	checkUpdate = (prevProps, nextProps) => {
		if (!prevProps.visible === !nextProps.visible) return;

		if (nextProps.visible) {
			this.seq.next(() => {
				this.setState({ animateStatus: ANIMATE_STATUS_SHOWING }, () => {
					const { rect } = this.props;
					const listRect = this.$list.getBoundingClientRect();
					this.setState({ ...getEnablePosition(rect, listRect, 'b') });
				});
			}).next(() => {
				this.setState({ animateStatus: ANIMATE_STATUS_SHOWN });
			});
		} else {
			this.seq.next(() => {
				this.setState({ animateStatus: ANIMATE_STATUS_HIDING });
			}).next(() => {
				this.setState({ animateStatus: ANIMATE_STATUS_NONE });
			});
		}
	};

	render() {
		const { title } = this.props;
		const { animateStatus, x, y } = this.state;

		if (animateStatus === ANIMATE_STATUS_NONE) return null;

		return createPortal(
			<div
				className={classNames('bmbo-nav-list', {
					'bmbo-showing': animateStatus === ANIMATE_STATUS_SHOWING,
					// 'bmbo-showing': animateStatus === ANIMATE_STATUS_SHOWN,
				})}
				ref={this.setListRef}
				style={{ left: `${x}px`, top: `${y}px` }}
			>
				Good!
			</div>
		, $holder);
	}
}

NavList.propTypes = {
	title: PropTypes.node,
	visible: PropTypes.bool,

	rect: PropTypes.object,
};

export default NavList;
