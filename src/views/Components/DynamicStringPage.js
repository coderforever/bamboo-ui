import React from 'react';
import PropTypes from 'prop-types';

import {
	Navigation, Row, Col, Button, DynamicString,
	Form, Input, Radio, Checkbox, Tooltip,
} from '../../../components';

import { TYPE_LIST, SIZE_LIST } from '../../utils/enum';
import { toString } from '../../utils/propsUtil';

class DynamicStringPage extends React.Component {
	constructor() {
		super();
		this.state = {
			form: {
				value: 'Hello, Bamboo UI~',
				duration: 1000,
				step: 1,
				animateType: 0,
				cursor: false,
			},
		};
	}

	getSampleCode = () => {
		const form = { ...this.state.form };

		form.duration = Number(form.duration);
		form.step = Number(form.step);

		if (form.animateType === 0) {
			delete form.step;
		} else {
			delete form.duration;
		}
		delete form.animateType;

		return `
<DynamicString${toString(form, { duration: 1000 })} />
`.replace(/\t/g, '   ').trim();
	};

	render() {
		const { form } = this.state;

		return (
			<Row>
				<Col xs="1/3">
				</Col>

				<Col xs="2/3">
					<h1>动态文字</h1>
					<p>
						动态文字可以使你通过动画形式展示文字内容。
					</p>

					<h2>试一试</h2>
					<div className="measurement">
						<div className="preview">
							<DynamicString
								value={form.value}
								cursor={form.cursor}
								duration={form.animateType === 0 ? Number(form.duration) : null}
								step={form.animateType === 1 ? Number(form.step) : null}
							/>
						</div>
						<div className="form">
							<Form instance={this} path="form">
								<Form.Field name="value" title="Value">
									<Input />
								</Form.Field>
								<Form.Field name="cursor" title="Cursor">
									<Checkbox>cursor</Checkbox>
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

DynamicStringPage.propTypes = {
	history: PropTypes.object,
};

export default DynamicStringPage;
