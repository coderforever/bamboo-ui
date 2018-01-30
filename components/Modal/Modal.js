import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
	ANIMATE_STATUS_NONE, ANIMATE_STATUS_SHOWING, ANIMATE_STATUS_SHOWN, ANIMATE_STATUS_HIDING,
	createPortal, enableWinScrollBar, disableWinScrollBar,
} from '../utils/uiUtil';
import { canUseDOM } from '../utils/envUtil';
import { mapChildrenByType, mapChildrenByNotType } from '../utils/componentUtil';
import Sequence from '../utils/Sequence';

import ModalTitle, { BAMBOO_MODAL_TITLE } from './ModalTitle';
import ModalContent, { BAMBOO_MODAL_CONTENT } from './ModalContent';
import ModalFooter, { BAMBOO_MODAL_FOOTER } from './ModalFooter';
import ModalPreface, { BAMBOO_MODAL_PREFACE } from './ModalPreface';
import ModalLoading, { BAMBOO_MODAL_LOADING } from './ModalLoading';

import Button from '../Button';

let modalList = [];

// ========================================================
// =                          UI                          =
// ========================================================
function refreshWinScrollBar() {
	if (!canUseDOM) return;

	const hasActiveModal = modalList.some(({ state: { animateStatus } = {} }) => (
		animateStatus !== ANIMATE_STATUS_NONE
	));

	if (hasActiveModal) {
		disableWinScrollBar('Modal');
	} else {
		enableWinScrollBar('Modal');
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

	componentDidMount() {
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

	onTransitionEnd = (event) => {
		const { onClosed } = this.props;
		const { animateStatus } = this.state;

		if (event.target === this.$holder && animateStatus === ANIMATE_STATUS_HIDING) {
			if (onClosed) onClosed(event);

			this.seq.next(() => {
				this.setState({
					animateStatus: ANIMATE_STATUS_NONE,
				}, refreshWinScrollBar);
			});
		}
	};

	setHolderRef = (ele) => {
		this.$holder = ele;
	};

	getTitle = () => {
		const { children, title } = this.props;

		if (title) return <ModalTitle>{title}</ModalTitle>;
		return mapChildrenByType(children, BAMBOO_MODAL_TITLE);
	};

	getBody = () => {
		const { children, content } = this.props;

		if (content) return <ModalContent>{content}</ModalContent>;

		const $children = mapChildrenByType(children, BAMBOO_MODAL_CONTENT);
		if ($children.length) return $children;

		return (
			<ModalContent>
				{mapChildrenByNotType(children, [
					BAMBOO_MODAL_TITLE,
					BAMBOO_MODAL_FOOTER,
					BAMBOO_MODAL_PREFACE,
					BAMBOO_MODAL_LOADING,
				])}
			</ModalContent>
		);
	};

	getFooter = () => {
		const { children, footer, onClose, onConfirm, closeText = 'Close', confirmText = 'Confirm', lock } = this.props;

		if (footer) return <ModalFooter>{footer}</ModalFooter>;

		const $footer = mapChildrenByType(children, BAMBOO_MODAL_FOOTER);
		if ($footer.length) return $footer;

		return (
			<ModalFooter>
				<Button type="weak" onClick={onClose} disabled={lock} transparent>{closeText}</Button>
				{onConfirm && <Button onClick={onConfirm} disabled={lock}>
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
					// Clean up when browser not support transitionEnd event
					const { onClosed } = this.props;
					this.setState({ animateStatus: ANIMATE_STATUS_NONE }, refreshWinScrollBar);

					if (onClosed) onClosed();
				}, { delay: 750 });
			}
		}
	};

	render() {
		const { size, type, loading, className, ...props } = this.props;
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

		delete props.visible;
		delete props.lock;
		delete props.title;
		delete props.content;
		delete props.footer;
		delete props.onClose;
		delete props.onClosed;
		delete props.onConfirm;
		delete props.closeText;
		delete props.confirmText;
		delete props.noMaskClose;

		return createPortal(
			<div
				{...props}
				className={classNames(
					'bmbo-modal', {
						'bmbo-showing': animateStatus === ANIMATE_STATUS_SHOWING,
						'bmbo-hidding': animateStatus === ANIMATE_STATUS_HIDING,
						'bmbo-loading': loading,
						className,
					},
					`bmbo-modal-${size || 'md'}`,
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
					onTransitionEnd={this.onTransitionEnd}
				>
					{$preface}
					{$modal}
				</div>
			</div>,
		);
	}
}

Modal.propTypes = {
	visible: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
	size: PropTypes.string,
	type: PropTypes.string,
	loading: PropTypes.bool,
	lock: PropTypes.bool,

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
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;
Modal.Preface = ModalPreface;
Modal.Loading = ModalLoading;

export default Modal;
