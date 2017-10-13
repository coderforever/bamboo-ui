import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
	ANIMATE_STATUS_NONE, ANIMATE_STATUS_SHOWING, ANIMATE_STATUS_SHOWN, ANIMATE_STATUS_HIDING,
	getHolder, Waiter, getScrollbarWidth, hasVerticalScroll,
} from '../utils/uiUtil';
import { canUseDOM } from '../utils/envUtil';
import { mapChildrenByType, mapChildrenByNotType } from '../utils/componentUtil';

import ModalTitle, { BAMBOO_MODAL_TITLE } from './ModalTitle';
import ModalBody, { BAMBOO_MODAL_BODY } from './ModalBody';
import ModalFooter, { BAMBOO_MODAL_FOOTER } from './ModalFooter';
import ModalPreface, { BAMBOO_MODAL_PREFACE } from './ModalPreface';
import ModalLoading, { BAMBOO_MODAL_LOADING } from './ModalLoading';

import Button from '../Button';

const $holder = getHolder();
let modalList = [];

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

		this.waiter = new Waiter();
		this.closeWaiter = new Waiter();
	}

	componentWillMount() {
		modalList.push(this);
	}

	componentWillReceiveProps(nextProps) {
		// Process when visibility changed
		if (!this.props.visible !== !nextProps.visible) {
			if (nextProps.visible) {
				// Show modal
				this.waiter.immediate(() => {
					this.setState({
						animateStatus: ANIMATE_STATUS_SHOWING,
					}, () => {
						refreshWinScrollBar();
						this.waiter.next(() => {
							this.setState({ animateStatus: ANIMATE_STATUS_SHOWN });
						});
					});
				});
			} else {
				// Hide modal
				this.waiter.immediate(() => {
					this.setState({
						animateStatus: ANIMATE_STATUS_HIDING,
					}, () => {
						this.waiter.next(() => {
							this.setState({ animateStatus: ANIMATE_STATUS_NONE }, refreshWinScrollBar);
						}, { delay: 500 });
					});
				});
			}
		}
	}

	componentWillUnmount() {
		this.waiter.destroy();
		modalList = modalList.filter(mdl => mdl !== this);
		refreshWinScrollBar();
	}

	onBackgroundClick = () => {
		if (!this.canBackClose()) return;

		// Put close request in next frame
		this.closeWaiter.next(() => {
			const { onClose } = this.props;
			if (onClose) onClose();
		});
	};

	onHolderClick = () => {
		// Occupy the close request if is holder click
		this.closeWaiter.next(() => {}, 1);
	};

	getTitle = () => {
		const { children, title } = this.props;
		const $title = mapChildrenByType(children, BAMBOO_MODAL_TITLE);

		if ($title.length) return $title;

		return <ModalTitle>{title}</ModalTitle>;
	};

	getBody = () => {
		const { children } = this.props;
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
		const { children, onClose, onConfirm } = this.props;
		const $footer = mapChildrenByType(children, BAMBOO_MODAL_FOOTER);

		if ($footer.length) return $footer;

		return (
			<ModalFooter>
				<Button type="weak" onClick={onClose} transparent>Close</Button>
				{onConfirm && <Button onClick={onConfirm}>
					Confirm
				</Button>}
			</ModalFooter>
		);
	};

	getLoading = () => {
		const { children } = this.props;
		const $loading = mapChildrenByType(children, BAMBOO_MODAL_LOADING);

		if ($loading.length) return $loading;

		return (
			<ModalLoading>
				Loading!!!
			</ModalLoading>
		);
	};

	getPreface = () => {
		const { children, visible } = this.props;
		return mapChildrenByType(children, BAMBOO_MODAL_PREFACE, node => (
			React.cloneElement(node, { visible })
		));
	};

	canBackClose = () => {
		const { onConfirm } = this.props;
		return !onConfirm;
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

	onClose: PropTypes.func,
	onConfirm: PropTypes.func,
};

Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Preface = ModalPreface;
Modal.Loading = ModalLoading;

export default Modal;
