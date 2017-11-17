import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
	ANIMATE_STATUS_NONE, ANIMATE_STATUS_INIT,
	ANIMATE_STATUS_SHOWING, ANIMATE_STATUS_SHOWN, ANIMATE_STATUS_HIDING,
	createPortal, getEnablePosition,
} from '../utils/uiUtil';
import Sequence from '../utils/Sequence';

class SelectList extends React.Component {
	constructor() {
		super();
		this.state = {
			animateStatus: ANIMATE_STATUS_NONE,
			width: 0,
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

		// Let window event handler ignore this element
		if (this.$list) this.$list._bmbo_ignore = true;
	};

	checkUpdate = (prevProps, nextProps) => {
		if (!prevProps.open === !nextProps.open) return;

		if (nextProps.open) {
			const { rect } = nextProps;

			this.seq.next((done) => {
				this.setState({
					animateStatus: ANIMATE_STATUS_INIT,
					width: rect.width,
				}, done);
			}, { frame: 1 }).next((done) => {
				const listRect = this.$list.getBoundingClientRect();

				this.setState({
					animateStatus: ANIMATE_STATUS_SHOWING,
					...getEnablePosition(rect, listRect, 'b'),
				}, done);
			}, { frame: 1 }).next(() => {
				this.setState({
					animateStatus: ANIMATE_STATUS_SHOWN,
				});
			}, { frame: 1 });
		} else {
			this.seq.next((done) => {
				this.setState({
					animateStatus: ANIMATE_STATUS_HIDING,
				}, done);
			}, { frame: 1 }).next(() => {
				this.setState({
					animateStatus: ANIMATE_STATUS_NONE,
				});
			}, { delay: 1000 });
		}
	};

	render() {
		const { animateStatus, width, x, y } = this.state;
		const { children } = this.props;
		if (animateStatus === ANIMATE_STATUS_NONE) return null;

		return createPortal(
			<ul
				className={classNames(
					'bmbo-select-list',
					{
						'bmbo-hidden': animateStatus === ANIMATE_STATUS_INIT,
						'bmbo-showing': animateStatus === ANIMATE_STATUS_SHOWING,
						'bmbo-hiding': animateStatus === ANIMATE_STATUS_HIDING,
					},
				)}
				ref={this.setListRef}
				style={{ width: `${width}px`, left: `${x}px`, top: `${y}px` }}
			>
				{children}
			</ul>,
		);
	}
}

SelectList.propTypes = {
	open: PropTypes.bool,
	rect: PropTypes.object,
	children: PropTypes.node,
};

export default SelectList;
