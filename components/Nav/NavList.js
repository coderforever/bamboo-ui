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

const DRILL_SPEED = 4 / 5;

class NavList extends React.Component {
	constructor() {
		super();
		this.state = {
			animateStatus: ANIMATE_STATUS_NONE,
			x: 0,
			y: 0,
			height: 0,
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
		if (this.context.navInline) {
			if (!prevProps.open === !nextProps.open) return;
			this.doDrillAnimation(nextProps);
		} else {
			if (!prevProps.visible === !nextProps.visible) return;
			this.doFloatAnimation(nextProps);
		}
	};

	doDrillAnimation = (props) => {
		if (props.open) {
			this.seq.next(() => {
				this.setState({
					height: 0,
				});
			}).next(() => {
				const { scrollHeight } = this.$list;
				const height = this.state.height || 0;

				let currentHeight = (height * DRILL_SPEED) + (scrollHeight * (1 - DRILL_SPEED));
				if (scrollHeight - currentHeight <= 1) {
					currentHeight = scrollHeight;
					this.setState({ height: null });
					return false;
				}

				this.setState({ height: currentHeight });

				return true;
			}, {
				loop: true,
			});
		} else {
			this.seq.next(() => {
				this.setState({
					height: null,
				});
			}).next(() => {
				return;
				// TODO: do it!
				const { scrollHeight } = this.$list;
				const height = this.state.height || scrollHeight;

				let currentHeight = (height * DRILL_SPEED) + (scrollHeight * (1 - DRILL_SPEED));
				if (scrollHeight - currentHeight <= 1) {
					currentHeight = scrollHeight;
					this.setState({ height: null });
					return false;
				}

				this.setState({ height: currentHeight });

				return true;
			}, {
				loop: true,
			});
		}
	};

	doFloatAnimation = (props) => {
		if (props.visible) {
			this.seq.next(() => {
				this.setState({
					animateStatus: ANIMATE_STATUS_INIT,
					x: 0,
					y: 0,
				});
			}).next(() => {
				const { rect } = this.props;
				const { navVertical } = this.context;
				const listRect = this.$list.getBoundingClientRect();

				const pos = navVertical ? 'r' : 'b';

				// Add offset to let nav list match with parent
				const superRect = {
					left: rect.left,
					top: rect.top,
					width: rect.width,
					height: rect.height,
				};
				if (navVertical) {
					superRect.top -= 1;
					superRect.height += 2;
				} else {
					superRect.left -= 1;
					superRect.width += 2;
				}

				this.setState({
					...getEnablePosition(superRect, listRect, pos),
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
		const { navType, navVertical, navInline } = this.context;
		const { animateStatus, x, y, height } = this.state;

		if (!navVertical || !navInline) {
			// Float display

			if (animateStatus === ANIMATE_STATUS_NONE) return null;

			return createPortal(
				<div
					className={classNames('bmbo-nav-list', {
							'bmbo-hidden': animateStatus === ANIMATE_STATUS_INIT,
							'bmbo-showing': animateStatus === ANIMATE_STATUS_SHOWING,
							'bmbo-hiding': animateStatus === ANIMATE_STATUS_HIDING,
						},
						`bmbo-${navType || 'lead'}`,
					)}
					ref={this.setListRef}
					style={{ left: `${x}px`, top: `${y}px`, minWidth: `${rect.width}px` }}
					onTransitionEnd={this.onTransitionEnd}
				>
					{children}
				</div>
				, $holder);
		}

		// Inline display
		const style = {};
		if (height !== null) {
			style.height = `${height}px`;
		}

		return (
			<ul
				className="bmbo-nav-list"
				style={style}
				ref={this.setListRef}
			>
				{children}
			</ul>
		);
	}
}

NavList.propTypes = {
	visible: PropTypes.bool,
	open: PropTypes.bool,
	rect: PropTypes.object,

	setRef: PropTypes.func,

	children: PropTypes.node,
};

NavList.contextTypes = {
	navType: PropTypes.string,
	navVertical: PropTypes.bool,
	navInline: PropTypes.bool,
};

export default NavList;
