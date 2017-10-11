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
		const { type, transparent, radio } = this.state;

		const typeStr = type !== BUTTON_TYPES[0] ? ` type="${type}"` : '';
		const transparentStr = transparent ? ' transparent' : '';

		return `
<Group>
   <Button${typeStr}${transparentStr}>Button 1</Button>
   <Button${typeStr}${transparentStr}>Button 2</Button>
   <Button${typeStr}${transparentStr}>Button 3</Button>
</Group>

<Group value={${radio}}>
   <Radio value={1}${typeStr}${transparentStr}>Radio 1</Radio>
   <Radio value={2}${typeStr}${transparentStr}>Radio 2</Radio>
   <Radio value={3}${typeStr}${transparentStr}>Radio 3</Radio>
</Group>

<Group>
   <Input />
   <Button${typeStr}${transparentStr}>Go</Button>
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
						如果您希望使用<code>Form.Field</code>进行数据绑定，
						您可以直接将<code>Group</code>作为<code>Form.Field</code>子组件。
					</p>
					<pre>
						{`
<Form instance={this}>
   <Form.Field name="radio">
      <Group>
         <Radio>Radio 1</Radio>
         <Radio>Radio 2</Radio>
      </Group>
   </Form.Field>
</Form>
`.trim()}
					</pre>

					<p>
						* 当您在<code>Group</code>中使用<code>Radio</code>时，
						<code>Radio</code>组件将自动替换成<code>Button</code>组件。
						因而你可以直接在<code>Radio</code>使用<code>Button</code>的属性。
					</p>

					<h2>试一试</h2>
					<Form instance={this}>
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
									<Button type={type} transparent={transparent}>Go</Button>
								</Group>
							</div>

							<div className="form">
								<Form.Field name="type" title="Type">
									{BUTTON_TYPES.map(t => (
										<Radio value={t} key={t}>{t}</Radio>
									))}
								</Form.Field>
								<Form.Field name="transparent" title="Transparent">
									<Checkbox>transparent</Checkbox>
								</Form.Field>
							</div>

							<pre className="code">
								{this.getInlineSample()}
							</pre>
						</div>
					</Form>

					<h2>拓展</h2>
					<p>
						有时候，您会希望<code>Group</code>能够占据一整行宽度。这当然是没有问题的！
					</p>
					<p>
						<code>Group</code>组件会自动将子组件用<code>Group.Item</code>包裹起来，
						因而您也可以显示的自己使用<code>Group.Item</code>来包裹子组件。
					</p>

					<div className="measurement">
						<div className="preview">
							<Group>
								<Group.Item width="100%">
									<Input />
								</Group.Item>
								<Button type="primary">Go</Button>
							</Group>
						</div>

						<pre className="code">
							{`<Group>
   <Group.Item width="100%">
      <Input />
   </Group.Item>
   <Button type="primary">Go</Button>
</Group>`}
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
