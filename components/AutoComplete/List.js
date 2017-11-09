import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
	ANIMATE_STATUS_NONE, ANIMATE_STATUS_SHOWING, ANIMATE_STATUS_SHOWN, ANIMATE_STATUS_HIDING,
	createPortal, getEnablePosition, ANIMATE_STATUS_INIT,
} from '../utils/uiUtil';
import { equals as arrEquals } from '../utils/arrayUtil';
import Sequence from '../utils/Sequence';

class List extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			x: 0,
			y: 0,
			animateStatus: ANIMATE_STATUS_NONE,

			height: 0,
			width: 0,
			currentList: null,
		};

		this.seq = new Sequence();
	}

	componentWillMount() {
		this.checkUpdate({}, this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.checkUpdate(this.props, nextProps);
	}

	onContainerTransitionEnd = (event) => {
		// Set state to NONE when hide animation done
		if (
			event.target !== this.$container ||
			this.state.animateStatus !== ANIMATE_STATUS_HIDING
		) return;
		this.seq.next(() => {
			this.setState({
				animateStatus: ANIMATE_STATUS_NONE,
			});
		});
	};

	setContainerRef = (ele) => {
		this.$container = ele;
	};

	setListRef = (ele) => {
		this.$list = ele;
	};

	checkUpdate = (prevProps, nextProps) => {
		const { list, rect } = nextProps;
		if (prevProps.list === list || (!prevProps.list && !list)) return;
		if (prevProps.list && list && arrEquals(prevProps.list, list, ['value'])) return;

		if (!list || list.length === 0) {
			// Hide list
			this.seq.next(() => {
				this.setState({
					height: 0,
					animateStatus: ANIMATE_STATUS_HIDING,
				});
			});
		} else {
			// Show list
			let height;

			this.seq.next((done) => {
				this.setState((preState) => {
					const myState = {
						currentList: list,
						width: rect.width,
					};

					if (preState.animateStatus === ANIMATE_STATUS_NONE) {
						myState.animateStatus = ANIMATE_STATUS_INIT;
					} else {
						myState.animateStatus = ANIMATE_STATUS_SHOWING;
					}

					return myState;
				}, done);
			}).next((done) => {
				const listRect = this.$list.getBoundingClientRect();
				height = listRect.height;

				this.setState({
					...getEnablePosition(rect, listRect, 'b'),
				}, done);
			}).next(() => {
				this.setState({
					height,
					animateStatus: ANIMATE_STATUS_SHOWN,
				});
			});
		}
	};

	render() {
		const { currentList, height, width, animateStatus, x, y } = this.state;

		if (animateStatus === ANIMATE_STATUS_NONE) return null;

		const { selectedIndex } = this.props;

		return createPortal(
			<div
				className={classNames(
					'bmbo-auto-container',
					{
						'bmbo-init': animateStatus === ANIMATE_STATUS_INIT,
						'bmbo-showing': animateStatus === ANIMATE_STATUS_SHOWING,
						'bmbo-hiding': animateStatus === ANIMATE_STATUS_HIDING,
					},
				)}
				style={{
					height: `${height}px`,
					width: `${width}px`,
					left: `${x}px`,
					top: `${y}px`,
				}}

				ref={this.setContainerRef}
				onTransitionEnd={this.onContainerTransitionEnd}
			>
				<ul className="bmbo-auto-list" ref={this.setListRef}>
					{(currentList || []).map(({ value }, index) => (
						<li key={index} className={classNames(selectedIndex === index && 'bmbo-active')}>
							{value}
						</li>
					))}
				</ul>
			</div>,
		);
	}
}

List.propTypes = {
	list: PropTypes.array,
	selectedIndex: PropTypes.number,
	rect: PropTypes.object,
};

export default List;
