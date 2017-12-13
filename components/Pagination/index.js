import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '../Button';
import Group from '../Group';

class Pagination extends React.Component {
	gotoPage = (page) => {
		const { gotoPage } = this.props;
		if (gotoPage) gotoPage(page);
	};

	goPrevPage = () => {
		const { page } = this.props;
		if (page > 1) this.gotoPage(page - 1);
	};

	goNextPage = () => {
		const { page, count, pageSize } = this.props;
		const totalPages = Math.ceil(count / pageSize);
		if (page < totalPages) this.gotoPage(page + 1);
	};

	goFirstPage = () => {
		this.gotoPage(1);
	};

	goLastPage = () => {
		const { count, pageSize } = this.props;
		const totalPages = Math.ceil(count / pageSize);
		this.gotoPage(totalPages);
	};

	render() {
		const { count, pageSize, page = 1, range = 9, disabled, className, ...props } = this.props;
		delete props.gotoPage;

		const totalPages = Math.ceil(count / pageSize);

		const lRange = Math.floor((range - 1) / 2);
		const rRange = range - 1 - lRange;
		let minPage = page - lRange;
		let maxPage = page + rRange;

		if (minPage < 1) {
			maxPage += -minPage + 1;
			minPage = 1;
		}
		if (maxPage > totalPages) {
			minPage -= maxPage - totalPages;
			maxPage = totalPages;
		}
		if (minPage < 1) minPage = 1;

		const $navItems = [];
		for (let i = minPage; i <= maxPage; i += 1) {
			$navItems.push(
				<Button
					key={i}
					disabled={disabled}
					onClick={() => {
						this.gotoPage(i);
					}}
					type={page === i ? 'primary' : 'weak'}
					transparent
				>{i}</Button>,
			);
		}

		return (
			<Group className={classNames('bmbo-pagination', className)} {...props}>
				<Button type="weak" transparent onClick={this.goFirstPage} disabled={page <= 1 || disabled}>
					&laquo;
				</Button>
				<Button type="weak" transparent onClick={this.goPrevPage} disabled={page <= 1 || disabled}>
					&lsaquo;
				</Button>

				{$navItems}

				<Button type="weak" transparent onClick={this.goNextPage} disabled={page >= totalPages || disabled}>
					&rsaquo;
				</Button>
				<Button type="weak" transparent onClick={this.goLastPage} disabled={page >= totalPages || disabled}>
					&raquo;
				</Button>
			</Group>
		);
	}
}

Pagination.propTypes = {
	gotoPage: PropTypes.func,
	count: PropTypes.number.isRequired,
	page: PropTypes.number,
	pageSize: PropTypes.number,
	range: PropTypes.number,
	disabled: PropTypes.bool,
	className: PropTypes.string,
};

export default Pagination;
