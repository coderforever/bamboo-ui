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
			</div>
		);
	}
}

TablePage.propTypes = {
};

export default TablePage;
