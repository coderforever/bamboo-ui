import React from 'react';
import PropTypes from 'prop-types';

import {
	Navigation, Row, Col, Button, DynamicNumber,
	Form, Input, Radio, Checkbox, Tooltip,
} from '../../../components';

import { TYPE_LIST, SIZE_LIST } from '../../utils/enum';
import { toString } from '../../utils/propsUtil';

class ButtonPage extends React.Component {
	constructor() {
		super();
		this.state = {
			form: {
				value: 10,
			},
		};
	}

	getSampleCode = () => {
		const { form } = this.state;

		return `
<Tooltip${toString(form, { placement: 'top' })}>
	<Button>Hover Me!</Button>
</Tooltip>
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
							<DynamicNumber value={form.value} />
						</div>
						<div>
							<Form instance={this} path="form">
								<Form.Field name="value" title="Value">
									<Input />
								</Form.Field>
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

ButtonPage.propTypes = {
	history: PropTypes.object,
};

export default ButtonPage;
