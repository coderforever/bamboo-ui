import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
	ANIMATE_STATUS_NONE,
	ANIMATE_STATUS_SHOWING, ANIMATE_STATUS_SHOWN, ANIMATE_STATUS_HIDING,
} from '../utils/uiUtil';
import Sequence from '../utils/Sequence';

class Curtain extends React.Component {
	constructor() {
		super();
		this.state = {
			animateStatus: ANIMATE_STATUS_NONE,
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
		if (this.state.animateStatus === ANIMATE_STATUS_HIDING && this.$curtain === event.target) {
			this.seq.next(() => {
				this.setState({ animateStatus: ANIMATE_STATUS_NONE });
			});
		}
	};

	setCurtainRef = (ele) => {
		this.$curtain = ele;
	};

	checkUpdate = (prevProps, nextProps) => {
		if (!prevProps.visible === !nextProps.visible) return;

		if (nextProps.visible) {
			this.seq.next(() => {
				this.setState({ animateStatus: ANIMATE_STATUS_SHOWING });
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
		const { children, className, ...props } = this.props;
		const { animateStatus } = this.state;

		if (animateStatus === ANIMATE_STATUS_NONE) return null;

		delete props.visible;

		return (
			<div
				className={classNames('bmbo-curtain', {
					'bmbo-showing': animateStatus === ANIMATE_STATUS_SHOWING,
					'bmbo-hiding': animateStatus === ANIMATE_STATUS_HIDING,
				}, className)}

				ref={this.setCurtainRef}
				onTransitionEnd={this.onTransitionEnd}
				{...props}
			>
				<div className="bmbo-curtain-content-holder">
					<div className="bmbo-curtain-content">
						{children}
					</div>
				</div>
			</div>
		);
	}
}

Curtain.propTypes = {
	visible: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
};

export default Curtain;
