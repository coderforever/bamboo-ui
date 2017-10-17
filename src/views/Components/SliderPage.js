import React from 'react';
import PropTypes from 'prop-types';

import {
	Navigation, Row, Col, Button,
	Form, Input, Radio, Checkbox, Slider,
} from '../../../components';

import { TYPE_LIST, SIZE_LIST } from '../../utils/enum';
import { toString } from '../../utils/propsUtil';

const MARKS_SAMPLE = {
	20: {
		title: '粘附',
		stick: 3,
	},
	60: '合格',
	75: '良好',
	90: '优秀',
};

class SliderPage extends React.Component {
	constructor() {
		super();
		this.state = {
			value: 0,

			form: {
				type: 'primary',
				size: 'md',
				value: 50,
				min: 0,
				max: 100,
				step: 1,
				hasStep: true,
				multi: 2,
				hasMulti: false,
				disabled: false,
				transparent: false,
				hasMarks: true,
			},
		};
	}

	onFormChanged = () => {
		const { form } = this.state;
		const { value, hasMulti, multi } = form;

		if (hasMulti && multi > 1 && !Array.isArray(value)) {
			this.setState({
				form: {
					...form,
					value: [value],
				},
			});
		} else if ((!hasMulti || multi <= 1) && Array.isArray(value)) {
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

					<Form instance={this}>
						<Form.Field name="value">
							<Slider type="primary" />
						</Form.Field>
					</Form>

					<h2>试一试</h2>
					<Form instance={this} path="form" onChanged={this.onFormChanged}>
						<div className="measurement">
							<div className="preview">
								<Form.Field name="value">
									<Slider
										type={form.type}
										size={form.size}
										step={form.hasStep ? form.step : null}
										min={form.min}
										max={form.max}
										multi={form.hasMulti ? form.multi : false}
										disabled={form.disabled}
										transparent={form.transparent}
										marks={form.hasMarks ? MARKS_SAMPLE : undefined}
									/>
								</Form.Field>
								Current Value: {JSON.stringify(form.value)}
							</div>

							<div className="form">
								<Form.Field name="type" title="Type">
									{TYPE_LIST.map(({ name, isDefault }) => (
										<Radio key={name} value={name}>
											{name}
											{isDefault && ' (default)'}
										</Radio>
									))}
								</Form.Field>
								<Form.Field name="size" title="Size">
									{SIZE_LIST.map(({ name, displayName, isDefault }) => (
										<Radio key={name} value={name}>
											{displayName}
											{isDefault && ' (default)'}
										</Radio>
									))}
								</Form.Field>
								<Form.Field name="value" title="Value">
									{(!form.hasMulti || form.multi <= 1) && <Input type="number" />}
									{(form.hasMulti && form.multi > 1) &&
										<Input disabled value={JSON.stringify(form.value)} />}
								</Form.Field>
								<Form.Field name="min" title="Min">
									<Input type="number" />
								</Form.Field>
								<Form.Field name="max" title="Max">
									<Input type="number" />
								</Form.Field>

								<Form.Field name="hasStep" title="Use Step">
									<Checkbox>Use Step</Checkbox>
								</Form.Field>
								{form.hasStep && <Form.Field name="step" title="Step ( > 0)">
									<Input type="number" />
								</Form.Field>}

								<Form.Field name="hasMulti" title="Use Multi">
									<Checkbox>Use Multi</Checkbox>
								</Form.Field>
								{form.hasMulti && <Form.Field name="multi" title="Multi ( >= 1)">
									<Input type="number" />
								</Form.Field>}

								<Form.Field name="disabled" title="Disabled">
									<Checkbox>disabled</Checkbox>
								</Form.Field>
								<Form.Field name="transparent" title="Transparent">
									<Checkbox>transparent</Checkbox>
								</Form.Field>
								<Form.Field name="hasMarks" title="Marks">
									<Checkbox>marks</Checkbox>
									{form.hasMarks && <pre>
										{'Marks Sample:\n'}
										{JSON.stringify(MARKS_SAMPLE, null, 3)}
									</pre>}
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
