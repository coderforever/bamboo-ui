import React from 'react';
import PropTypes from 'prop-types';

import {
	Navigation, Row, Col, Button,
	Form, Input, Radio, Checkbox, Slider,
} from '../../../components';

import { toString } from '../../utils/propsUtil';

const MARKS_SAMPLE = {
	60: '合格',
	80: '良好',
	100: '优秀',
};

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
				multi: 1,
				disabled: false,
				transparent: false,
				// hasMarks: false,
				hasMarks: true,
			},
		};
	}

	onFormChanged = () => {
		const { form } = this.state;
		const { value, multi } = form;

		if (multi > 1 && !Array.isArray(value)) {
			this.setState({
				form: {
					...form,
					value: [value],
				},
			});
		} else if (multi <= 1 && Array.isArray(value)) {
			this.setState({
				form: {
					...form,
					value: value[0],
				},
			});
		}
	};

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

					{/* <Form instance={this}>
						<Form.Field name="value">
							<Slider type="primary" />
						</Form.Field>
					</Form> */}

					<h2>试一试</h2>
					<Form instance={this} path="form" onChanged={this.onFormChanged}>
						<div className="measurement">
							<div className="preview">
								<Form.Field name="value">
									<Slider
										type={form.type}
										min={form.min}
										max={form.max}
										multi={form.multi}
										disabled={form.disabled}
										transparent={form.transparent}
										marks={form.hasMarks ? MARKS_SAMPLE : undefined}
									/>
								</Form.Field>
								Current Value: {JSON.stringify(form.value)}
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
									{form.multi <= 1 && <Input type="number" />}
									{form.multi > 1 && <Input disabled value={JSON.stringify(form.value)} />}
								</Form.Field>
								<Form.Field name="min" title="Min">
									<Input type="number" />
								</Form.Field>
								<Form.Field name="max" title="Max">
									<Input type="number" />
								</Form.Field>
								<Form.Field name="multi" title="Multi ( >= 1)">
									<Input type="number" />
								</Form.Field>
								<Form.Field name="disabled" title="Disabled">
									<Checkbox>disabled</Checkbox>
								</Form.Field>
								<Form.Field name="transparent" title="Transparent">
									<Checkbox>transparent</Checkbox>
								</Form.Field>
								<Form.Field name="hasMarks" title="Marks">
									<Checkbox>marks</Checkbox>
									<pre>{JSON.stringify(MARKS_SAMPLE, null, 3)}</pre>
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
