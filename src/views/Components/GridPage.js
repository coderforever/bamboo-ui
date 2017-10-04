import React from 'react';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';

import {
	Navigation, Row, Col, Button,
	Form, Input, Radio, Checkbox,
} from '../../../components';

import { toString } from '../../utils/propsUtil';

import styles from './GridPage.scss';

const GRID_LIST = [3, 4, 5, 6, 10, 24];

const toNumArray = (num) => {
	const list = [];
	for (let i = 0; i < num; i += 1) {
		list.push(i);
	}
	return list;
};

class GridPage extends React.Component {
	constructor() {
		super();
		this.state = {
			form: {
				count: 1,
			},
		};
	}

	render() {
		return (
			<Row>
				<Col xs="1/3">
					test
				</Col>
				<Col xs={[2, 3]}>
					<h1>栅格</h1>
					<p>
						我们提供了<code>24</code>和<code>10</code>切分的2种栅格系统，您可以在页面中混合使用该系统。
					</p>
					<p>
						同于<code>Bootstrap</code>，栅格系统提供了响应式解决方案。您可以根据不同页面尺寸进行响应式设计。
					</p>

					{GRID_LIST.map((number, index) => (
						<div key={index} styleName="grid-preview">
							<Row gutter={0}>
								{toNumArray(number).map(n => (
									<Col key={n} xs={[1, number]}>
										<div styleName="col">1/{number}</div>
									</Col>
								))}
							</Row>
						</div>
					))}

					<h2>试一试</h2>
					<div className="measurement">
						<div className="preview">
						</div>

						<div className="form">
							<Form instance={this} path="form">
								<Form.Field name="count" title="Count">
									<Input />
								</Form.Field>
							</Form>
						</div>
					</div>
				</Col>
			</Row>
		);
	}
}

GridPage.propTypes = {
};

export default cssModules(GridPage, styles);
