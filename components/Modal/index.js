import React from 'react';
import { render } from 'react-dom';

import { canUseDOM } from '../utils/envUtil';

import ModalFlexHolder from './ModalFlexHolder';

import Modal from './Modal';

const BAMBOO_MODAL_FLEX_HOLDER = 'bmbo_modal_flex_holder';

let $modalFlexHolder;
if (canUseDOM) {
	// Clean up menu holder for hot module reload
	window.document.querySelectorAll(`#${BAMBOO_MODAL_FLEX_HOLDER}`).forEach((ele) => {
		ele.remove();
	});

	// Set up menu holder
	const $flexHolder = window.document.createElement('div');
	$flexHolder.id = BAMBOO_MODAL_FLEX_HOLDER;

	render(
		<ModalFlexHolder
			ref={(node) => {
				$modalFlexHolder = node;
			}}
		/>, $flexHolder);
}

Modal.showDialog = (config) => {
	if (!$modalFlexHolder) {
		console.error('[Modal] Flex holder not defined.(Isomorphic render?)');
		return;
	}

	$modalFlexHolder.showDialog(config);
};

export default Modal;
