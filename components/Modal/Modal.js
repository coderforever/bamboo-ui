import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
	ANIMATE_STATUS_NONE, ANIMATE_STATUS_SHOWING, ANIMATE_STATUS_SHOWN, ANIMATE_STATUS_HIDING,
	getHolder, getScrollbarWidth, hasVerticalScroll, getTransitionEndName,
} from '../utils/uiUtil';
import { canUseDOM } from '../utils/envUtil';
import { mapChildrenByType, mapChildrenByNotType } from '../utils/componentUtil';
import Sequence from '../utils/Sequence';

import ModalTitle, { BAMBOO_MODAL_TITLE } from './ModalTitle';
import ModalBody, { BAMBOO_MODAL_BODY } from './ModalBody';
import ModalFooter, { BAMBOO_MODAL_FOOTER } from './ModalFooter';
import ModalPreface, { BAMBOO_MODAL_PREFACE } from './ModalPreface';
import ModalLoading, { BAMBOO_MODAL_LOADING } from './ModalLoading';

import Button from '../Button';

let modalList = [];
const $holder = getHolder();

// ========================================================
// =                          UI                          =
// ========================================================
function refreshWinScrollBar() {
	if (!canUseDOM) return;

	const hasActiveModal = modalList.some(({ state: { animateStatus } = {} }) => (
		animateStatus !== ANIMATE_STATUS_NONE
	));

	if (hasActiveModal && hasVerticalScroll()) {
		document.body.style.paddingRight = `${getScrollbarWidth()}px`;
		document.body.style.overflowY = 'hidden';
	} else {
		document.body.style.paddingRight = '';
		document.body.style.overflowY = '';
	}
}

// ========================================================
// =                         Modal                        =
// ========================================================
class Modal extends React.Component {
	constructor() {
		super();
		this.state = {
			animateStatus: ANIMATE_STATUS_NONE,
		};

		this.seq = new Sequence();
		this.closeSeq = new Sequence();
	}

	componentWillMount() {
		modalList.push(this);
		this.checkUpdate({}, this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.checkUpdate(this.props, nextProps);
	}

	componentWillUnmount() {
		this.seq.destroy();
		modalList = modalList.filter(mdl => mdl !== this);
		refreshWinScrollBar();
	}

	onBackgroundClick = () => {
		const { noMaskClose } = this.props;
		if (noMaskClose) return;

		// Put close request in next frame
		this.closeSeq.next(() => {
			const { onClose } = this.props;
			if (onClose) onClose();
		});
	};

	onHolderClick = () => {
		// Occupy the close request if is holder click
		this.closeSeq.next(() => {}, { priority: 1 });
	};

	onAnimationEnd = (event) => {
		const { onClosed } = this.props;
		const { animateStatus } = this.state;

		if (event.target === this.$holder && animateStatus === ANIMATE_STATUS_HIDING) {
			if (onClosed) onClosed(event);
			Promise.resolve().then(refreshWinScrollBar);
		}
	};

	setHolderRef = (ele) => {
		this.$holder = ele;

		if (this.$holder) {
			const transitionEnd = getTransitionEndName();
			this.$holder.removeEventListener(transitionEnd, this.onAnimationEnd);
			this.$holder.addEventListener(transitionEnd, this.onAnimationEnd);
		}
	};

	getTitle = () => {
		const { children, title } = this.props;

		if (title) return <ModalTitle>{title}</ModalTitle>;
		return mapChildrenByType(children, BAMBOO_MODAL_TITLE);
	};

	getBody = () => {
		const { children, content } = this.props;

		if (content) return <ModalBody>{content}</ModalBody>;

		const $children = mapChildrenByType(children, BAMBOO_MODAL_BODY);
		if ($children.length) return $children;

		return (
			<ModalBody>
				{mapChildrenByNotType(children, [
					BAMBOO_MODAL_TITLE,
					BAMBOO_MODAL_FOOTER,
					BAMBOO_MODAL_PREFACE,
					BAMBOO_MODAL_LOADING,
				])}
			</ModalBody>
		);
	};

	getFooter = () => {
		const { children, footer, onClose, onConfirm, closeText = 'Close', confirmText = 'Confirm' } = this.props;

		if (footer) return <ModalFooter>{footer}</ModalFooter>;

		const $footer = mapChildrenByType(children, BAMBOO_MODAL_FOOTER);
		if ($footer.length) return $footer;

		return (
			<ModalFooter>
				<Button type="weak" onClick={onClose} transparent>{closeText}</Button>
				{onConfirm && <Button onClick={onConfirm}>
					{confirmText}
				</Button>}
			</ModalFooter>
		);
	};

	getLoading = () => {
		const { children } = this.props;
		const $loading = mapChildrenByType(children, BAMBOO_MODAL_LOADING);

		if ($loading.length) return $loading;

		return (
			<ModalLoading defaultView />
		);
	};

	getPreface = () => {
		const { children, visible } = this.props;
		return mapChildrenByType(children, BAMBOO_MODAL_PREFACE, node => (
			React.cloneElement(node, { visible })
		));
	};

	checkUpdate = (prevProps, nextProps) => {
		// Process when visibility changed
		if (!prevProps.visible !== !nextProps.visible) {
			if (nextProps.visible) {
				// Show modal
				this.seq.next(() => {
					this.setState({
						animateStatus: ANIMATE_STATUS_SHOWING,
					}, refreshWinScrollBar);
				}).next(() => {
					this.setState({ animateStatus: ANIMATE_STATUS_SHOWN });
				});
			} else {
				// Hide modal
				this.seq.next(() => {
					this.setState({
						animateStatus: ANIMATE_STATUS_HIDING,
					});
				}).next(() => {
					const { onClosed } = this.props;
					this.setState({ animateStatus: ANIMATE_STATUS_NONE }, refreshWinScrollBar);

					// Mock trigger onClick event when not support transition event
					if (onClosed && !getTransitionEndName()) {
						onClosed();
					}
				}, { delay: 500 });
			}
		}
	};

	render() {
		const { size, type, loading } = this.props;
		const { animateStatus } = this.state;

		if (animateStatus === ANIMATE_STATUS_NONE) return null;

		const $title = this.getTitle();
		const $body = this.getBody();
		const $footer = this.getFooter();
		const $preface = this.getPreface();
		const $loading = this.getLoading();

		const $modal = (
			<div className="bmbo-dialog">
				{$title}
				{$body}
				{$footer}

				{$loading}
			</div>
		);

		return createPortal(
			<div
				className={classNames(
					'bmbo-modal', {
						'bmbo-showing': animateStatus === ANIMATE_STATUS_SHOWING,
						'bmbo-hidding': animateStatus === ANIMATE_STATUS_HIDING,
						'bmbo-loading': loading,
					},
					size && `bmbo-${size}`,
					type && `bmbo-${type}`,
				)}
				role="presentation"
				onClick={this.onBackgroundClick}
			>
				<div
					className="bmbo-dialog-holder"
					role="presentation"
					onClick={this.onHolderClick}
					ref={this.setHolderRef}
				>
					{$preface}
					{$modal}
				</div>
			</div>
			, $holder);
	}
}

Modal.propTypes = {
	visible: PropTypes.bool,
	children: PropTypes.node,
	size: PropTypes.string,
	type: PropTypes.string,
	loading: PropTypes.bool,

	title: PropTypes.node,
	content: PropTypes.node,
	footer: PropTypes.node,

	onClose: PropTypes.func,
	onClosed: PropTypes.func,
	onConfirm: PropTypes.func,

	closeText: PropTypes.func,
	confirmText: PropTypes.func,

	noMaskClose: PropTypes.bool,
};

Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Preface = ModalPreface;
Modal.Loading = ModalLoading;

export default Modal;
