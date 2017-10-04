import React from 'react';
import PropTypes from 'prop-types';

import {
	Navigation, Row, Col, Button,
	Form, Input, Radio, Checkbox, Slider,
} from '../../../components';

import { toString } from '../../utils/propsUtil';

class SliderPage extends React.Component {
	constructor() {
		super();
		this.state = {
			value: 0,

			form: {
				type: '',
				value: 50,
				min: 0,
				max: 100,
				disabled: false,
				transparent: false,
			},
		};
	}

	render() {
		const { form } = this.state;

		return (
			<Row>
				<Col xs="1/3">
					test
				</Col>
				<Col xs={[2, 3]}>
					<h1>滑动条</h1>
					<p>
						提供了单值以及范围选取的功能。
					</p>

					<Form instance={this}>
						<Form.Field name="value">
							<Slider type="primary" />
						</Form.Field>
					</Form>

					<h2>试一试</h2>
					<Form instance={this} path="form">
						<div className="measurement">
							<div className="preview">
								<Form.Field name="value">
									<Slider
										type={form.type}
										min={form.min}
										max={form.max}
										disabled={form.disabled}
										transparent={form.transparent}
									/>
								</Form.Field>
								Current Value: {form.value}
							</div>

							<div className="form">
								<Form.Field name="type" title="Type">
									<Radio value="">(default)</Radio>
									<Radio value="primary">primary</Radio>
									<Radio value="info">info</Radio>
									<Radio value="success">success</Radio>
									<Radio value="warning">warning</Radio>
									<Radio value="danger">danger</Radio>
									<Radio value="forbid">forbid</Radio>
								</Form.Field>
								<Form.Field name="value" title="Value">
									<Input type="number" />
								</Form.Field>
								<Form.Field name="min" title="Min">
									<Input type="number" />
								</Form.Field>
								<Form.Field name="max" title="Max">
									<Input type="number" />
								</Form.Field>
								<Form.Field name="disabled" title="Disabled">
									<Checkbox>disabled</Checkbox>
								</Form.Field>
								<Form.Field name="transparent" title="Transparent">
									<Checkbox>transparent</Checkbox>
								</Form.Field>
							</div>
						</div>
					</Form>
				</Col>
			</Row>
		);
	}
}

SliderPage.propTypes = {
};

export default SliderPage;
