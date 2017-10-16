import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
	ANIMATE_STATUS_NONE, ANIMATE_STATUS_INIT,
	ANIMATE_STATUS_SHOWING, ANIMATE_STATUS_SHOWN, ANIMATE_STATUS_HIDING,
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
				this.setState({ animateStatus: ANIMATE_STATUS_INIT });
			}).next(() => {
				const { rect } = this.props;
				const listRect = this.$list.getBoundingClientRect();

				this.setState({
					...getEnablePosition(rect, listRect, 'b'),
					animateStatus: ANIMATE_STATUS_SHOWING,
				});
			}).next(() => {
				this.setState({ animateStatus: ANIMATE_STATUS_SHOWN });
			});
		} else {
			this.seq.next(() => {
				this.setState({ animateStatus: ANIMATE_STATUS_HIDING });
			}).next(() => {
				this.setState({
					animateStatus: ANIMATE_STATUS_NONE,
					x: 0,
					y: 0,
				});
			});
		}
	};

	render() {
		const { children, rect } = this.props;
		const { navType } = this.context;
		const { animateStatus, x, y, direct } = this.state;

		if (animateStatus === ANIMATE_STATUS_NONE) return null;

		return createPortal(
			<div
				className={classNames('bmbo-nav-list', {
					'bmbo-hidden': animateStatus === ANIMATE_STATUS_INIT,
					'bmbo-showing': animateStatus === ANIMATE_STATUS_SHOWING,
					// 'bmbo-showing': animateStatus === ANIMATE_STATUS_SHOWN,
				},
				`bmbo-${navType || 'default'}`,
				direct && `bmbo-${direct}`,
				)}
				ref={this.setListRef}
				style={{ left: `${x}px`, top: `${y}px`, minWidth: `${rect.width}px` }}
			>
				{children}
			</div>
		, $holder);
	}
}

NavList.propTypes = {
	visible: PropTypes.bool,
	rect: PropTypes.object,

	children: PropTypes.node,
};

NavList.contextTypes = {
	navType: PropTypes.string,
};

export default NavList;
