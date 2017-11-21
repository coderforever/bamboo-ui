import React from 'react';
import PropTypes from 'prop-types';

import {
	Navigation, Row, Col, Button, DynamicNumber,
	Form, Input, Radio, Checkbox, Tooltip, AutoComplete,
} from '../../../components';

import { TYPE_LIST, SIZE_LIST } from '../../utils/enum';
import { toString } from '../../utils/propsUtil';

class TablePage extends React.Component {
	constructor() {
		super();
		this.state = {
			form: {},
		};
	}

	render() {
		return (
			<div>
				<h1>表格</h1>
				<p>
					你可以通过添加<code>bmbo-table</code>class来将表格变为Bamboo UI风格。
					同时添加<code>bmbo-border</code>class来添加边框线。
				</p>

				<table className="bmbo-table bmbo-border">
					<thead>
						<tr>
							<th>Head 1</th>
							<th>Head 2</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>TD 1</td>
							<td className="bmbo-primary">.primary</td>
						</tr>
						<tr>
							<td>TD 1</td>
							<td className="bmbo-info">.info</td>
						</tr>
						<tr>
							<td>TD 1</td>
							<td className="bmbo-success">.success</td>
						</tr>
						<tr>
							<td>TD 1</td>
							<td className="bmbo-danger">.danger</td>
						</tr>
						<tr>
							<td>TD 1</td>
							<td className="bmbo-warning">.warning</td>
						</tr>
						<tr>
							<td>TD 1</td>
							<td className="bmbo-forbid">.forbid</td>
						</tr>
					</tbody>
				</table>


				<h2>自适应</h2>
				<p>
					同<code>Bootstrap</code>一样，
					你可以通过在<code>table</code>外包裹一个<code>{'className="bmbo-table-responsive"'}</code>的div来进行自适应支持。
				</p>
				<strong>带内边框：</strong>
				<div className="bmbo-table-responsive">
					<table className="bmbo-table bmbo-border">
						<tbody>
							<tr>
								{Array(10).fill(0).map((_, index) => (
									<td key={index}>Column_{index + 1}</td>
								))}
							</tr>
							<tr>
								{Array(10).fill(0).map((_, index) => (
									<td key={index}>Column_{index + 1}</td>
								))}
							</tr>
							<tr>
								{Array(10).fill(0).map((_, index) => (
									<td key={index}>Column_{index + 1}</td>
								))}
							</tr>
						</tbody>
					</table>
				</div>

				<strong>无内边框：</strong>
				<div className="bmbo-table-responsive">
					<table className="bmbo-table">
						<tbody>
							<tr>
								{Array(10).fill(0).map((_, index) => (
									<td key={index}>Column_{index + 1}</td>
								))}
							</tr>
							<tr>
								{Array(10).fill(0).map((_, index) => (
									<td key={index}>Column_{index + 1}</td>
								))}
							</tr>
							<tr>
								{Array(10).fill(0).map((_, index) => (
									<td key={index}>Column_{index + 1}</td>
								))}
							</tr>
						</tbody>
					</table>
				</div>

				<h2>悬浮</h2>
				<p>
					通过添加<code>bmbo-hover</code>来使表格获得鼠标悬浮高亮效果。
					当然，您也可以将其添加到<code>thead</code>、<code>tbody</code>或者<code>tr</code>上来只让部分行支持悬浮高亮效果。
				</p>
				<table className="bmbo-table bmbo-hover">
					<tbody>
						{Array(5).fill(0).map((_, rowIndex) => (
							<tr key={rowIndex}>
								{Array(3).fill(0).map((__, index) => (
									<td key={index}>Column_{index + 1}</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

TablePage.propTypes = {
};

export default TablePage;
