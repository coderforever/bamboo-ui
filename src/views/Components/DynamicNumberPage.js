import React from 'react';
import PropTypes from 'prop-types';

import {
	Navigation, Row, Col, Button, DynamicNumber,
	Form, Input, Radio, Checkbox, Tooltip,
} from '../../../components';

import { TYPE_LIST, SIZE_LIST } from '../../utils/enum';
import { toString } from '../../utils/propsUtil';

class DynamicNumberPage extends React.Component {
	constructor() {
		super();
		this.state = {
			form: {
				value: 10,
				duration: 1000,
				decimal: 0,
				step: 1,
				animateType: 0,
			},
		};
	}

	getSampleCode = () => {
		const form = { ...this.state.form };

		form.value = Number(form.value);
		form.duration = Number(form.duration);
		form.decimal = Number(form.decimal);
		form.step = Number(form.step);

		if (form.animateType === 0) {
			delete form.step;
		} else {
			delete form.duration;
		}
		delete form.animateType;

		return `
当前值：
<DynamicNumber${toString(form, { duration: 1000, decimal: 0 })} />
`.replace(/\t/g, '   ').trim();
	};

	render() {
		const { form } = this.state;

		return (
			<Row>
				<Col xs="1/3">
				</Col>

				<Col xs="2/3">
					<h1>动态数字</h1>
					<p>
						动态数字可以使你通过动画形式展示数字内容。
					</p>

					<h2>试一试</h2>
					<div className="measurement">
						<div className="preview">
							当前值：
							<DynamicNumber
								value={Number(form.value)}
								decimal={Number(form.decimal)}
								duration={form.animateType === 0 ? Number(form.duration) : null}
								step={form.animateType === 1 ? Number(form.step) : null}
							/>
						</div>
						<div className="form">
							<Form instance={this} path="form">
								<Form.Field name="value" title="Value">
									<Input type="number" />
								</Form.Field>
								<Form.Field name="decimal" title="Decimal (>=0)">
									<Input type="number" />
								</Form.Field>
								<Form.Field name="animateType" title="Animation">
									<Radio value={0}>By Duration</Radio>
									<Radio value={1}>By Step</Radio>
								</Form.Field>
								{form.animateType === 0 && <Form.Field name="duration" title="Duration">
									<Input type="number" />
								</Form.Field>}
								{form.animateType === 1 && <Form.Field name="step" title="Step">
									<Input type="number" />
								</Form.Field>}
							</Form>
						</div>

						<pre className="code">
							{this.getSampleCode()}
						</pre>
					</div>
				</Col>
			</Row>
		);
	}
}

DynamicNumberPage.propTypes = {
	history: PropTypes.object,
};

export default DynamicNumberPage;
