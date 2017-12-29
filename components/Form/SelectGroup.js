import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import { BAMBOO_COMPONENT, mapChildrenByType } from '../utils/componentUtil';
import { BAMBOO_FORM_SELECT_OPTION } from './SelectOption';

export const BAMBOO_FORM_SELECT_GROUP = 'BAMBOO_FORM_SELECT_GROUP';

export function getNodeList(children = [], parentProps = {}) {
	let valueList = [];

	mapChildrenByType(children, BAMBOO_FORM_SELECT_OPTION, (node) => {
		const { value: nodeVal, children: nodeChildren, disabled } = node.props;
		const myVal = nodeVal !== undefined ? nodeVal : nodeChildren;
		valueList.push({
			title: nodeChildren,
			value: myVal,
			disabled: disabled !== undefined ? disabled : parentProps.disabled,
		});
	});

	mapChildrenByType(children, BAMBOO_FORM_SELECT_GROUP, (node) => {
		valueList = valueList.concat(getNodeList(node.props.children, node.props || {}));
	});

	return valueList;
}

export function getValueList(children = []) {
	return getNodeList(children).map(({ value }) => value);
}

class SelectGroup extends React.Component {
	getChildContext() {
		const { bmboSelectDisabled } = this.context;

		return {
			bmboSelectDisabled: this.props.disabled !== undefined ?
				this.props.disabled : bmboSelectDisabled,
		};
	}

	selectAllValue = (event) => {
		const { children } = this.props;
		const { bmboOnSelectValues } = this.context;
		const valueList = getValueList(children);

		bmboOnSelectValues(event, valueList, !this.isAllSelected());
	};

	isAllSelected = () => {
		const { children } = this.props;
		const { bmboSelectIsChecked } = this.context;
		const valueList = getValueList(children);

		return valueList.every(bmboSelectIsChecked);
	};

	render() {
		const { title, children, noSelectAll, disabled, ...props } = this.props;
		const { bmboSelectMulti, bmboSelectSize, bmboSelectDisabled } = this.context;

		let myDisabled;
		if (disabled !== undefined) {
			myDisabled = disabled;
		} else if (bmboSelectDisabled !== undefined) {
			myDisabled = bmboSelectDisabled;
		}

		let $title = title;
		let selectAllProps = {};

		if (bmboSelectMulti && !noSelectAll) {
			$title = (
				<Checkbox size={bmboSelectSize} disabled={myDisabled} checked={this.isAllSelected()}>
					{title}
				</Checkbox>
			);

			selectAllProps = {
				role: 'button',
				tabIndex: -1,
				onClick: myDisabled ? null : this.selectAllValue,
			};
		} else {
			$title = <span>{title}</span>;
		}

		return (
			<li
				className={`bmbo-${bmboSelectSize || 'md'} bmbo-select-group`}
				{...props}
			>
				<div
					className="bmbo-select-group-title bmbo-padding"
					{...selectAllProps}
				>
					{$title}
				</div>
				<ul>
					{children}
				</ul>
			</li>
		);
	}
}

SelectGroup.propTypes = {
	children: PropTypes.node,
	title: PropTypes.node,
	disabled: PropTypes.bool,
	noSelectAll: PropTypes.bool,
};

SelectGroup.childContextTypes = {
	bmboSelectDisabled: PropTypes.bool,
};

SelectGroup.contextTypes = {
	bmboSelectSize: PropTypes.string,
	bmboSelectMulti: PropTypes.bool,
	bmboSelectDisabled: PropTypes.bool,
	bmboOnSelectValue: PropTypes.func,
	bmboOnSelectValues: PropTypes.func,
	bmboSelectIsChecked: PropTypes.func,
};

SelectGroup[BAMBOO_COMPONENT] = BAMBOO_FORM_SELECT_GROUP;

export default SelectGroup;
