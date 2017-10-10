import React from 'react';
import PropTypes from 'prop-types';

import {
	Navigation, Row, Col, Button, Group,
	Form, Input, Radio, Checkbox, Menu,
} from '../../../components';

import { toString } from '../../utils/objectUtil';

const BUTTON_TYPES = ['(default)', 'primary', 'info', 'success', 'warning', 'danger', 'forbid'];

class GroupPage extends React.Component {
	constructor() {
		super();
		this.state = {
			type: BUTTON_TYPES[1],
			radio: 1,
			transparent: false,
		};
	}

	getInlineSample = () => {
		const { type, radio } = this.state;

		const typeStr = type !== BUTTON_TYPES[0] ? ` type="${type}"` : '';

		return `
<Group>
   <Button${typeStr}>Button 1</Button>
   <Button${typeStr}>Button 2</Button>
   <Button${typeStr}>Button 3</Button>
</Group>

<Group value={${radio}}>
   <Radio${typeStr}>Radio 1</Radio>
   <Radio${typeStr}>Radio 2</Radio>
   <Radio${typeStr}>Radio 3</Radio>
</Group>

<Group value={${radio}}>
   <Radio${typeStr}>Radio 1</Radio>
   <Radio${typeStr}>Radio 2</Radio>
   <Radio${typeStr}>Radio 3</Radio>
</Group>
`.trim();
	};

	render() {
		const { type, transparent } = this.state;

		return (
			<Row>
				<Col xs="1/3">
				</Col>

				<Col xs="2/3">
					<h1>组</h1>
					<p>
						如果您对样式没有过多要求，该组件可以帮助您将组件进行自动组合。
						（支持<code>Button</code>，<code>Radio</code>，<code>Input</code>）
					</p>
					<p>
						* 当您在<code>Group</code>中使用<code>Radio</code>时，
						<code>Radio</code>组件将自动替换成<code>Button</code>组件。
						因而你可以直接在<code>Radio</code>使用<code>Button</code>的属性。
					</p>

					<div className="measurement">
						<div className="preview">
							<Group>
								<Button type={type} transparent={transparent}>Button 1</Button>
								<Button type={type} transparent={transparent}>Button 2</Button>
								<Button type={type} transparent={transparent}>Button 3</Button>
							</Group>

							<Form.Field name="radio">
								<Group>
									<Radio type={type} value={1} transparent={transparent}>Radio 1</Radio>
									<Radio type={type} value={2} transparent={transparent}>Radio 2</Radio>
									<Radio type={type} value={3} transparent={transparent}>Radio 3</Radio>
								</Group>
							</Form.Field>

							<Group>
								<Input />
								<Button>Go</Button>
							</Group>

							<Group>
								<Button>Go</Button>
								<Input />
							</Group>
						</div>

						<div className="form">
							<Form instance={this}>
								<Form.Field name="type" title="Type">
									{BUTTON_TYPES.map(t => (
										<Radio value={t} key={t}>{t}</Radio>
									))}
								</Form.Field>
								<Form.Field name="transparent" title="Transparent">
									<Checkbox>transparent</Checkbox>
								</Form.Field>
							</Form>
						</div>

						<pre className="code">
							{this.getInlineSample()}
						</pre>
					</div>
				</Col>
			</Row>
		);
	}
}

GroupPage.propTypes = {
	history: PropTypes.object,
};

export default GroupPage;
