import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { mapChildrenByType } from '../utils/componentUtil';
import { getValue } from '../utils/pathUtil';

import Column, { BAMBOO_TABLE_COLUMN } from './Column';
import Pagination from '../Pagination';

class Table extends React.Component {
	constructor() {
		super();
		this.state = {
			page: 1,
			list: [],
		};
	}

	componentWillMount() {
		this.checkUpdate({}, this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.checkUpdate(this.props, nextProps);
	}

	getPage = () => {
		const { page } = this.props;
		return page === undefined ? this.state.page : page;
	};

	getCount = () => {
		const { count, data } = this.props;
		return count === undefined ? (data || []).length : count;
	};

	getColumnList = () => {
		const { children } = this.props;
		return mapChildrenByType(children, BAMBOO_TABLE_COLUMN);
	};

	getList = () => {
		const { pageSize, page, count, data } = this.props;
		const { list } = this.state;

		if (page !== undefined && count !== undefined) {
			return data;
		}

		const myPage = this.getPage();
		return list.slice((myPage - 1) * pageSize, myPage * pageSize);
	};

	checkUpdate = (prevProps, nextProps) => {
		if (prevProps.data === nextProps.data) return;

		this.setState({
			list: (nextProps.data || []).concat(),
		}, () => {
			// TODO: Support sort function
		});
	};

	gotoPage = (page) => {
		const { onPageChange } = this.props;
		this.setState({ page });

		if (onPageChange) onPageChange(page);
	};

	render() {
		const { className, pageSize, bordered, hover, onRowClick, ...props } = this.props;
		delete props.page;
		delete props.count;
		delete props.data;
		delete props.onPageChange;

		const page = this.getPage();

		const columnList = this.getColumnList().map(c => c.props);
		const list = this.getList();

		return (
			<div className="bmbo-table-container">
				<table
					className={classNames(
						'bmbo-table',
						bordered && 'bmbo-bordered',
						className,
					)}

					{...props}
				>
					<colgroup>
						{columnList.map(({ width }, colIndex) => (
							<col key={colIndex} width={width} />
						))}
					</colgroup>

					<thead>
						<tr>
							{columnList.map(({ title, name }, colIndex) => (
								<td key={colIndex}>
									{title || name}
								</td>
							))}
						</tr>
					</thead>

					<tbody className={classNames(hover && 'bmbo-hover')}>
						{list.map((item, rowIndex) => {
							const trProps = {};

							if (onRowClick) {
								trProps.role = 'button';
								trProps.tabIndex = -1;
								trProps.onClick = () => {
									onRowClick(item, rowIndex);
								};
							}

							return (
								<tr key={rowIndex} {...trProps}>
									{columnList.map((column, colIndex) => {
										const { name, render, ...colProps } = column;
										delete colProps.width;

										return (
											<td key={colIndex} {...colProps}>
												{render ? render(item) : getValue(item, name)}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>

				<div className="bmbo-table-pagination">
					<Pagination
						page={page}
						pageSize={pageSize}
						count={this.getCount()}
						gotoPage={this.gotoPage}
					/>
				</div>
			</div>
		);
	}
}

Table.propTypes = {
	className: PropTypes.string,
	bordered: PropTypes.bool,
	hover: PropTypes.bool,
	children: PropTypes.node,

	data: PropTypes.array,
	page: PropTypes.number,
	count: PropTypes.number,
	pageSize: PropTypes.number,

	onPageChange: PropTypes.func,
	onRowClick: PropTypes.func,
};

Table.defaultProps = {
	pageSize: 10,
};

Table.Column = Column;

export default Table;
