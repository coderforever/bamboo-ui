import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import { BAMBOO_COMPONENT, mapChildrenByType } from '../utils/componentUtil';
import { BAMBOO_FORM_SELECT_OPTION } from './SelectOption';

export const BAMBOO_FORM_SELECT_GROUP = 'BAMBOO_FORM_SELECT_GROUP';

export function getValueList(children = []) {
	let valueList = [];

	mapChildrenByType(children, BAMBOO_FORM_SELECT_OPTION, (node) => {
		const { value: nodeVal, children: nodeChildren } = node.props;
		const myVal = nodeVal !== undefined ? nodeVal : nodeChildren;
		valueList.push(myVal);
	});

	mapChildrenByType(children, BAMBOO_FORM_SELECT_GROUP, (node) => {
		valueList = valueList.concat(getValueList(node.props.children));
	});

	return valueList;
}

class SelectGroup extends React.Component {
	constructor() {
		super();
		this.state = {};
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
		const { title, children, ...props } = this.props;
		const { bmboSelectMulti, bmboSelectSize } = this.context;

		let $title = title;
		let selectAllProps = {};

		if (bmboSelectMulti) {
			$title = (
				<Checkbox size={bmboSelectSize} checked={this.isAllSelected()}>
					{title}
				</Checkbox>
			);

			selectAllProps = {
				role: 'button',
				tabIndex: -1,
				onClick: this.selectAllValue,
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
};

SelectGroup.contextTypes = {
	bmboSelectSize: PropTypes.string,
	bmboSelectMulti: PropTypes.bool,
	bmboOnSelectValue: PropTypes.func,
	bmboOnSelectValues: PropTypes.func,
	bmboSelectIsChecked: PropTypes.func,
};

SelectGroup[BAMBOO_COMPONENT] = BAMBOO_FORM_SELECT_GROUP;

export default SelectGroup;
