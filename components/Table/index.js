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

	getColumnList = () => {
		const { children } = this.props;
		return mapChildrenByType(children, BAMBOO_TABLE_COLUMN);
	};

	getList = () => {
		const { pageSize } = this.props;
		const { list, page } = this.state;
		return list.slice((page - 1) * pageSize, page * pageSize);
	};

	checkUpdate = (prevProps, nextProps) => {
		if (prevProps.data === nextProps.data) return;

		this.setState({
			list: (nextProps.data || []).concat(),
		});
	};

	gotoPage = (page) => {
		this.setState({ page });
	};

	render() {
		const { page } = this.state;
		const { className, pageSize, bordered, data, ...props } = this.props;

		const columnList = this.getColumnList().map(c => c.props);
		console.log('~~>', columnList);
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
					<thead>
						<tr>
							{columnList.map((column, colIndex) => (
								<td key={colIndex}>
									{column.title || column.name}
								</td>
							))}
						</tr>
					</thead>

					<tbody>
						{list.map((item, rowIndex) => (
							<tr key={rowIndex}>
								{columnList.map((column, colIndex) => (
									<td key={colIndex}>
										{getValue(item, column.name)}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>

				<div className="bmbo-table-pagination">
					<Pagination
						page={page}
						pageSize={pageSize}
						count={(data || []).length}
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
	children: PropTypes.node,

	data: PropTypes.array,
	pageSize: PropTypes.number,
};

Table.defaultProps = {
	pageSize: 10,
};

Table.Column = Column;

export default Table;
