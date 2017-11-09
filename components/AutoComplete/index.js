import React from 'react';
import PropTypes from 'prop-types';

import { getValue } from '../utils/pathUtil';
import Input from '../Form/Input';

import List from './List';

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_ENTER = 13;
const OP_KEY_LIST = [KEY_UP, KEY_DOWN, KEY_ENTER];
let id = 0;

class AutoComplete extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			list: null,
			selectedIndex: 0,
		};

		this.id = id;
		id += 1;
	}

	onKeyDown = (nodeOnChange, ...args) => {
		const event = args[0];

		// Ignore if list is empty
		const { selectedIndex, list } = this.state;
		if (!list || !list.length) return;

		// Check if is direct key
		const { which } = event;
		if (!OP_KEY_LIST.includes(which)) return;
		event.preventDefault();

		if (which === KEY_UP || which === KEY_DOWN) {
			// Move operation
			let myIndex = selectedIndex;
			if (which === 38) {
				myIndex -= 1;
			} else if (which === 40) {
				myIndex += 1;
			}
			myIndex = (myIndex + list.length) % list.length;

			this.setState({
				selectedIndex: myIndex,
			});
		} else if (which === KEY_ENTER) {
			// Select item
			event.target.value = list[selectedIndex].value;
			nodeOnChange(...args);

			this.setState({
				selectedIndex: 0,
				list: null,
			});
		}
	};

	onKeyUp = (event) => {
		const { which, target } = event;

		if (OP_KEY_LIST.includes(which)) return;

		const list = this.getMatchList(target.value);

		this.setState({
			list,
			rect: target.getBoundingClientRect(),
		});
	};

	onBlur = () => {
		this.setState({
			selectedIndex: 0,
			list: null,
		});
	};

	getMatchList = (str) => {
		const { matcher } = this.props;
		if (!matcher || !str) return null;

		const myStr = str.toUpperCase();

		if (Array.isArray(matcher)) {
			const len = matcher.length;
			const list = [];
			for (let i = 0; i < len; i += 1) {
				const cur = matcher[i];

				// String match
				if (typeof cur === 'string' && cur.toUpperCase().includes(myStr)) {
					list.push({ value: cur });
				} else {
					const { value } = cur;
					if (String(value).toUpperCase().includes(myStr)) {
						list.push(cur);
					}
				}

				if (list.length >= 10) break;
			}

			return list;
		}

		return [];
	};

	render() {
		const { children, ...props } = this.props;
		const { list, rect, selectedIndex } = this.state;

		delete props.matcher;

		const myChildren = children || <Input />;

		const $children = React.Children.map(myChildren, (node) => {
			const nodeOnKeyDown = getValue(node, ['props', 'onKeyDown']);
			const nodeOnKeyUp = getValue(node, ['props', 'onKeyUp']);
			const nodeOnBlur = getValue(node, ['props', 'onBlur']);
			const nodeOnChange = getValue(node, ['props', 'onChange']) || this.props.onChange;

			return React.cloneElement(node, {
				...props,
				onKeyDown: (...args) => {
					if (nodeOnKeyDown) nodeOnKeyDown(...args);
					this.onKeyDown(nodeOnChange, ...args);
				},
				onKeyUp: (...args) => {
					if (nodeOnKeyUp) nodeOnKeyUp(...args);
					this.onKeyUp(...args);
				},
				onBlur: (...args) => {
					if (nodeOnBlur) nodeOnBlur(...args);
					this.onBlur(...args);
				},
			});
		});

		return [
			...$children,
			<List key={`list_${this.id}`} list={list} rect={rect} selectedIndex={selectedIndex} />,
		];
	}
}

AutoComplete.propTypes = {
	children: PropTypes.node,
	matcher: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
	onChange: PropTypes.func,
};

export default AutoComplete;
