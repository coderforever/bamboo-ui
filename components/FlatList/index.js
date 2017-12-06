import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { toArray } from '../utils/arrayUtil';
import { wrapperEventValue } from '../utils/eventUtil';

class FlatList extends React.Component {
	constructor() {
		super();
		this.state = {
			maxLevel: 1,
			levelLists: {},
		};
	}

	componentWillMount() {
		this.refreshList({}, this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.refreshList(this.props, nextProps);
	}

	onItemClick = (event, level, itemValue) => {
		const { value, onChange } = this.props;

		const myValue = toArray(value).slice(0, level);
		myValue[level] = itemValue;

		if (onChange) {
			onChange(wrapperEventValue(event, this.$ele, myValue));
		}
	};

	setRef = (ele) => {
		this.$ele = ele;
	};

	getMaxLevel = () => this.props.columns || this.state.maxLevel;

	getList = (level = 0) => {
		const { list = [] } = this.props;
		const { levelLists } = this.state;

		if (level === 0) return list;

		return levelLists[level] || [];
	};

	refreshList = (prevProps, nextProps) => {
		if (
			prevProps.value === nextProps.value &&
			prevProps.list === nextProps.list
		) return;

		const { list = [] } = nextProps;
		const levelLists = {};
		const valueList = toArray(nextProps.value);

		let current = list;
		for (let i = 0; i < valueList.length; i += 1) {
			const currentValue = valueList[i];
			current = current.find(({ value }) => value === currentValue);

			if (!current) {
				// Skip if path not match
				break;
			}

			current = current.list || [];
			levelLists[i + 1] = current;
		}

		this.setState({ levelLists });
	};

	render() {
		const { size, className, ...props } = this.props;

		delete props.value;
		delete props.list;
		delete props.multi;
		delete props.columns;
		delete props.onChange;

		const myValue = toArray(this.props.value);

		return (
			<div
				{...props}
				className={classNames(
					'bmbo-flat-list',
					`bmbo-${size || 'md'}`,
					className,
				)}
				ref={this.setRef}
			>
				{new Array(this.getMaxLevel()).fill(0).map((_, level) => {
					const list = this.getList(level);
					const levelValue = myValue[level];

					return (
						<ul
							key={level}
							className="bmbo-flat-list-column"
						>
							{list.map(({ title, value }) => (
								<li
									className={classNames('bmbo-flat-list-item', levelValue === value && 'bmbo-active')}
									key={value}
								>
									<span
										className="bmbo-padding"
										role="button"
										tabIndex={-1}
										onClick={(event) => {
											this.onItemClick(event, level, value);
										}}
									>
										{title || value}
									</span>
								</li>
							))}
						</ul>
					);
				})}
			</div>
		);
	}
}

FlatList.propTypes = {
	value: PropTypes.node,
	list: PropTypes.array,
	multi: PropTypes.array,
	columns: PropTypes.number,
	onChange: PropTypes.func,

	size: PropTypes.string,
	className: PropTypes.string,
};

export default FlatList;
