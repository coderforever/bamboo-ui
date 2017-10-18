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

	componentDidMount() {
		this.checkUpdate({}, this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.checkUpdate(this.props, nextProps);
	}

	onTransitionEnd = (event) => {
		if (this.state.animateStatus === ANIMATE_STATUS_HIDING && event.target === this.$list) {
			this.seq.next(() => {
				this.setState({ animateStatus: ANIMATE_STATUS_NONE });
			});
		}
	};

	setListRef = (ele) => {
		const { setRef } = this.props;
		this.$list = ele;
		setRef(ele);
	};

	checkUpdate = (prevProps, nextProps) => {
		if (!prevProps.visible === !nextProps.visible) return;

		if (nextProps.visible) {
			this.seq.next(() => {
				this.setState({
					animateStatus: ANIMATE_STATUS_INIT,
					x: 0,
					y: 0,
				});
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
				const { animateStatus } = this.state;
				if (animateStatus === ANIMATE_STATUS_NONE || animateStatus === ANIMATE_STATUS_INIT) {
					return false;
				}
				this.setState({ animateStatus: ANIMATE_STATUS_HIDING });
				return true;
			}).next(() => {
				this.setState({ animateStatus: ANIMATE_STATUS_NONE });
			}, { delay: 1000 });
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
					'bmbo-hiding': animateStatus === ANIMATE_STATUS_HIDING,
				},
				`bmbo-${navType || 'lead'}`,
				direct && `bmbo-${direct}`,
				)}
				ref={this.setListRef}
				style={{ left: `${x}px`, top: `${y}px`, minWidth: `${rect.width}px` }}
				onTransitionEnd={this.onTransitionEnd}
			>
				{children}
			</div>
		, $holder);
	}
}

NavList.propTypes = {
	visible: PropTypes.bool,
	rect: PropTypes.object,

	setRef: PropTypes.func,

	children: PropTypes.node,
};

NavList.contextTypes = {
	navType: PropTypes.string,
};

export default NavList;
