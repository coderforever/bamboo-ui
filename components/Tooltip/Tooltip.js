import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import {
	ANIMATE_STATUS_NONE, ANIMATE_STATUS_INIT,
	ANIMATE_STATUS_SHOWING, ANIMATE_STATUS_SHOWN, ANIMATE_STATUS_HIDING,
	createPortal, getEnablePosition,
} from '../utils/uiUtil';
import Sequence from '../utils/Sequence';

const ARROW_DES = 5;

class Tooltip extends React.Component {
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

	onTransitionEnd = (event) => {
		if (this.state.animateStatus === ANIMATE_STATUS_HIDING && event.target === this.$holder) {
			this.seq.next(() => {
				this.setState({ animateStatus: ANIMATE_STATUS_NONE });
			});
		}
	};

	setHolderRef = (ele) => {
		this.$holder = ele;
	};

	checkUpdate = (prevProps, nextProps) => {
		if (!prevProps.visible === !nextProps.visible) return;

		if (nextProps.visible) {
			this.seq.next(() => {
				this.setState({ animateStatus: ANIMATE_STATUS_INIT, x: 0, y: 0 });
			}).next(() => {
				const { rect } = this.props;
				if (!this.$holder) return;

				let ps;
				switch (nextProps.placement) {
					case 'bottom':
						ps = 'b,lr';
						break;
					case 'left':
						ps = 'l,tb';
						break;
					case 'right':
						ps = 'r,tb';
						break;
					default:
						ps = 't,lr';
				}

				const { left, width, top, height } = rect;
				const tgtRect = this.$holder.getBoundingClientRect();
				const { _x, _y, ...pos } = getEnablePosition({
					left: left - ARROW_DES,
					top: top - ARROW_DES,
					width: width + (2 * ARROW_DES),
					height: height + (2 * ARROW_DES),
				}, tgtRect, ps);

				const arrowOffsetX = _x - pos.x;
				const arrowOffsetY = _y - pos.y;

				this.setState({
					animateStatus: ANIMATE_STATUS_SHOWING,
					...pos,
					arrowOffsetX,
					arrowOffsetY,
				});
			}).next(() => {
				this.setState({ animateStatus: ANIMATE_STATUS_SHOWN });
			});
		} else {
			this.seq.next(() => {
				this.setState({ animateStatus: ANIMATE_STATUS_HIDING });
			}).next(() => {
				this.setState({ animateStatus: ANIMATE_STATUS_NONE });
			}, { delay: 1000 });
		}
	};

	render() {
		const { children, placement, maxWidth } = this.props;
		const { animateStatus, x, y, arrowOffsetX, arrowOffsetY } = this.state;

		if (animateStatus === ANIMATE_STATUS_NONE) return null;

		return createPortal(
			<div
				className={classNames(
					'bmbo-tooltip',
					{
						'bmbo-hidden': animateStatus === ANIMATE_STATUS_INIT,
						'bmbo-showing': animateStatus === ANIMATE_STATUS_SHOWING,
						'bmbo-hiding': animateStatus === ANIMATE_STATUS_HIDING,
					},
					`bmbo-${placement || 'top'}`,
				)}
				style={{ left: `${x}px`, top: `${y}px` }}
				ref={this.setHolderRef}
				onTransitionEnd={this.onTransitionEnd}
			>
				<div
					className="bmbo-tooltip-title"
					style={{ maxWidth: maxWidth && `${maxWidth}px` }}
				>
					{children}
				</div>
				<div
					className="bmbo-tooltip-arrow"
					style={{ marginLeft: `${arrowOffsetX}px`, marginTop: `${arrowOffsetY}px` }}
				/>
			</div>,
		);
	}
}

Tooltip.propTypes = {
	visible: PropTypes.bool,
	maxWidth: PropTypes.number,
	rect: PropTypes.object,
	children: PropTypes.node,
	placement: PropTypes.string,
};

export default Tooltip;
