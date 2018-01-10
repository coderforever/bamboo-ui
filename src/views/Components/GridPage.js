import React from 'react';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';

import {
	Navigation, Row, Col, Button,
	Form, Input, Radio, Checkbox, Slider,
} from '../../../components';

import { toString } from '../../utils/propsUtil';

import styles from './GridPage.scss';

const GRID_LIST = [3, 5, 10, 24];

const GRID_COUNT = [1, 2, 3, 4, 5, 6, 8, 10, 12, 24];
const GRID_COUNT_MARKS = {};

GRID_COUNT.forEach((count, index) => {
	GRID_COUNT_MARKS[index] = String(count);
});

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
				countIndex: 1,
				hasOffset: false,
				gutter: 15,
			},
		};
	}

	getSampleCode = () => {
		const { form } = this.state;
		let gutter = '';
		if (form.gutter !== 15) {
			gutter = ` gutter={${Math.max(0, form.gutter)}}`;
		}

		let offset = '';
		if (form.hasOffset) {
			offset = ' xsOffset="1/12"';
		}

		return `<Row${gutter}>
   <Col xs="1/${GRID_COUNT[form.countIndex]}"${offset}>Column</Col>
</Row>`;
	};

	render() {
		const { form } = this.state;
		const $cols = [];

		const sampleCount = GRID_COUNT[form.countIndex];
		for (let i = 0; i < (form.hasOffset ? 1 : sampleCount); i += 1) {
			$cols.push(<Col key={i} xs={[1, sampleCount]} xsOffset={form.hasOffset ? '1/12' : null}>
				<div styleName="col" />
			</Col>);
		}

		return (
			<div>
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
						<div styleName="grid-preview">
							<Row gutter={form.gutter}>
								{$cols}
							</Row>
						</div>
					</div>

					<div className="form">
						<Form instance={this} path="form">
							<Form.Field name="countIndex" title="Count">
								<Slider marks={GRID_COUNT_MARKS} min={0} max={GRID_COUNT.length - 1} />
							</Form.Field>
							<Form.Field name="hasOffset" title="With Offset">
								<Checkbox>Show with offset: 1/12</Checkbox>
							</Form.Field>
							<Form.Field name="gutter" title="Gutter ( >= 0)">
								<Input type="number" />
							</Form.Field>
						</Form>
					</div>

					<pre className="code">
						{this.getSampleCode()}
					</pre>
				</div>
			</div>
		);
	}
}

GridPage.propTypes = {
};

export default cssModules(GridPage, styles);
