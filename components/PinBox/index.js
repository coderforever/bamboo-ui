import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

import { mapChildrenForNode } from '../utils/componentUtil';
import { addUniqueListener, removeUniqueListener, isSameSource } from '../utils/eventUtil';

import EmptyWrapper from '../EmptyWrapper';
import Box from './Box';

class PinBox extends React.Component {
	constructor() {
		super();
		this.state = {
			visible: false,
		};
	}

	onBackdrop = (event) => {
		if (isSameSource(event, findDOMNode(this.$ele))) return;

		this.setState({ visible: false }, this.onVisibilityChange);
		removeUniqueListener('mousedown', this.onBackdrop);
	};

	onClick = () => {
		const { backdrop } = this.props;

		this.setState(({ visible }) => {
			const newState = { visible: !visible };

			if (newState.visible && this.$ele) {
				/** Use `findDOMNode` to support customize component.
				 ** To avoid user need to support setRef for this component.
				 **/
				newState.rect = findDOMNode(this.$ele) // eslint-disable-line react/no-find-dom-node
					.getBoundingClientRect();

				if (backdrop) {
					addUniqueListener('mousedown', this.onBackdrop);
				}
			}

			return newState;
		}, this.onVisibilityChange);
	};

	onVisibilityChange = () => {
		const { onVisibilityChange } = this.props;
		const { visible } = this.state;

		if (onVisibilityChange) onVisibilityChange(visible);
	};

	setRef = (ele) => {
		this.$ele = ele;
	};

	setVisible = (visible) => {
		this.setState({ visible }, this.onVisibilityChange);
	};

	render() {
		const { trigger, children, pin, stretch, ...props } = this.props;
		const { visible, rect } = this.state;

		delete props.onVisibilityChange;
		delete props.backdrop;

		const $children = mapChildrenForNode(children, (node) => {
			const { props: { onClick }, ref } = node;
			const newProps = {
				ref: (...args) => {
					if (ref) ref(...args);
					this.setRef(...args);
				},
			};

			if (!trigger || trigger === 'click') {
				// Click Trigger
				newProps.onClick = (...args) => {
					if (onClick) onClick(...args);
					this.onClick(...args);
				};
			} else {
				console.warn('[PinBox] Trigger not realize:', trigger);
			}

			// Transform children to class component to avoid stateless function can't use ref
			return (
				<EmptyWrapper {...newProps}>
					{node}
				</EmptyWrapper>
			);
		});

		return [
			...$children,
			<Box key="__BMBO_PIN_BOX_BOX__" {...props} visible={visible} rect={rect} stretch={stretch}>
				{pin}
			</Box>,
		];
	}
}

PinBox.propTypes = {
	trigger: PropTypes.string,
	backdrop: PropTypes.bool,
	stretch: PropTypes.bool,
	children: PropTypes.node,
	pin: PropTypes.node,

	onVisibilityChange: PropTypes.func,
};

export default PinBox;
