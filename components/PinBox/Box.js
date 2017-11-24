import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
	ANIMATE_STATUS_NONE, ANIMATE_STATUS_INIT,
	ANIMATE_STATUS_SHOWING, ANIMATE_STATUS_SHOWN, ANIMATE_STATUS_HIDING,
	createPortal, getEnablePosition,
} from '../utils/uiUtil';
import Sequence from '../utils/Sequence';

class Box extends React.Component {
	constructor() {
		super();
		this.state = {
			animateStatus: ANIMATE_STATUS_NONE,
			x: 0,
			y: 0,
			width: null,
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
		if (this.state.animateStatus === ANIMATE_STATUS_HIDING && event.target === this.$ele) {
			this.seq.next(() => {
				this.setState({ animateStatus: ANIMATE_STATUS_NONE });
			});
		}
	};

	setRef = (ele) => {
		this.$ele = ele;

		// Let window event handler ignore this element
		if (this.$ele) this.$ele._bmbo_ignore = true;
	};

	checkUpdate = (prevProps, nextProps) => {
		if (!prevProps.visible === !nextProps.visible) return;

		if (nextProps.visible) {
			this.seq
				.next((done) => {
					const { rect, stretch } = nextProps;

					this.setState({
						animateStatus: ANIMATE_STATUS_INIT,
						x: 0,
						y: 0,
						width: stretch ? rect.width : null,
					}, done);
				}, { frame: 1 })
				.next((done) => {
					const { rect } = nextProps;
					const pinRect = this.$ele.getBoundingClientRect();

					this.setState({
						animateStatus: ANIMATE_STATUS_SHOWING,
						...getEnablePosition(rect, pinRect, 'b'),
					}, done);
				}, { frame: 1 })
				.next(() => {
					this.setState({ animateStatus: ANIMATE_STATUS_SHOWN });
				});
		} else {
			this.seq
				.next((done) => {
					this.setState({
						animateStatus: ANIMATE_STATUS_HIDING,
					}, done);
				})
				.next(() => {
					/** Reset to none status.
					 ** This will not trigger if `onTransitionEnd` works.
					 */
					this.setState({
						animateStatus: ANIMATE_STATUS_NONE,
					});
				}, { delay: 3000 });
		}
	};

	render() {
		const { animateStatus, x, y, width, direct } = this.state;
		if (animateStatus === ANIMATE_STATUS_NONE) return null;

		const { children, className, ...props } = this.props;
		delete props.visible;
		delete props.rect;
		delete props.stretch;

		const style = {
			left: `${x}px`,
			top: `${y}px`,
		};

		if (width !== null) {
			style.width = `${width}px`;
		}

		return createPortal(
			<div
				{...props}

				style={style}
				className={classNames(
					'bmbo-pin-box', {
						'bmbo-init': animateStatus === ANIMATE_STATUS_INIT,
						'bmbo-showing': animateStatus === ANIMATE_STATUS_SHOWING,
						'bmbo-hiding': animateStatus === ANIMATE_STATUS_HIDING,
					},
					`bmbo-${direct}`,
					className,
				)}
				onTransitionEnd={this.onTransitionEnd}
				ref={this.setRef}
			>
				{children}
			</div>,
		);
	}
}

Box.propTypes = {
	visible: PropTypes.bool,
	rect: PropTypes.object,
	stretch: PropTypes.bool,

	children: PropTypes.node,
	className: PropTypes.string,
};

export default Box;
