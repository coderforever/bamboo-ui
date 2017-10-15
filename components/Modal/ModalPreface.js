import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { BAMBOO_COMPONENT } from '../utils/componentUtil';
import { ANIMATE_STATUS_NONE, ANIMATE_STATUS_SHOWING, ANIMATE_STATUS_SHOWN } from '../utils/uiUtil';
import Sequence from '../utils/Sequence';

export const BAMBOO_MODAL_PREFACE = 'BAMBOO_MODAL_PREFACE';

class ModalPreface extends React.Component {
	constructor() {
		super();
		this.state = {
			animateStatus: ANIMATE_STATUS_NONE,
			contentWidth: 0,
		};
		this.seq = new Sequence();
	}

	componentWillMount() {
		this.checkUpdate({}, this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.checkUpdate(this.props, nextProps);
	}

	componentWillUnmount() {
		this.seq.destroy();
	}

	setContentRef = (ele) => {
		this.$content = ele;
	};

	checkUpdate = (preProps, nextProps) => {
		if (!preProps.visible !== !nextProps.visible) {
			if (nextProps.visible) {
				const { delay = 400 } = nextProps;

				// Show preface
				this.seq.next(() => {
					this.setState({
						animateStatus: ANIMATE_STATUS_SHOWING,
						contentWidth: 0,
					});
				}).next(() => {
					const newState = { animateStatus: ANIMATE_STATUS_SHOWN };

					if (this.$content) {
						newState.contentWidth = this.$content.scrollWidth;
					}

					this.setState(newState);
				}, { delay });
			} else {
				// Hide preface
				this.seq.next(() => {
					this.setState({
						animateStatus: ANIMATE_STATUS_NONE,
					});
				});
			}
		}
	};

	render() {
		const { children } = this.props;
		const { animateStatus, contentWidth } = this.state;

		return (
			<div
				className={classNames('bmbo-modal-preface', {
					'bmbo-showing': animateStatus === ANIMATE_STATUS_SHOWING,
				})}
				style={{ width: contentWidth ? `${contentWidth}px` : null }}
			>
				<div className="bmbo-modal-preface-content" ref={this.setContentRef}>
					{children}
				</div>
			</div>
		);
	}
}

ModalPreface.propTypes = {
	delay: PropTypes.number,
	children: PropTypes.node,
	visible: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
};

ModalPreface[BAMBOO_COMPONENT] = BAMBOO_MODAL_PREFACE;

export default ModalPreface;
